/** auth routes **/

var config = require('../config'),
    dataBaseServices = require('../services/database'),
    errorRoutes = require('./errors'),
    jwt = require('jwt-simple'),
    moment = require('moment');

module.exports = {

    /** login **/
    login: function (req, res, next) {
        let credential = {
            username: req.body.username,
            password: req.body.password
        };

        if (credential.username && credential.password) {
            authenticateCredential(credential).then((user) => {
                if (user) {
                    return res.json(generateToken(user));
                } else {
                    return errorRoutes.error401_invalid(req, res, next);
                }
            });
        } else {
            return errorRoutes.error401_empty(req, res, next);
        }
    }

};

let authenticateCredential = function (credential) {
    return dataBaseServices.findOne(config.database.collections.users, credential).then(findResult => {
        if(findResult){
            return findResult;
        }
    })
};

let generateToken = function (user) {
    // 7 days token
    return {
        user: user,
        expires: moment.utc().add(7, 'days'),
        token: jwt.encode({exp: this.expires}, config.secret.token)
    };
};