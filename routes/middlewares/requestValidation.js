/** request validation middleware **/

let jwt = require('jwt-simple'),
    authRoutes = require('../auth');

module.exports = function (req, res, next) {

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    let token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            req.headers['x-access-token'],
        key = (req.body && req.body.x_key) ||
            (req.query && req.query.x_key) ||
            req.headers['x-key'];

    if (token || key) {
        try {
            let decoded = jwt.decode(token, require('../config/secret.js')());

            if (decoded.exp <= Date.now()) {
                return res.status(400)
                    .json({
                        "status": 400,
                        "message": "Token Expired"
                    });
            }

            // request authentication
            let dbUser = authRoutes.validateUser(key);
            if (dbUser) {
                if ((req.url.indexOf('admin') > -1 && dbUser.role == 'admin') ||
                    (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                    // next middleware
                    next();
                } else {
                    // not authorized
                    return res.status(403)
                        .json({
                            "status": 403,
                            "message": "Not Authorized"
                        });
                }
            } else {
                // no user found
                return res.status(401)
                    .json({
                        "status": 401,
                        "message": "Invalid User"
                    });
            }

        } catch (err) {
            return res.status(500)
                .json({
                    "status": 500,
                    "message": "Oops something went wrong",
                    "error": err
                });
        }
    } else {
        return res.status(401)
            .json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
    }
};