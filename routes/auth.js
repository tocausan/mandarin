/** auth routes **/

let config = require('../config'),
    dataBaseServices = require('../services/database'),
    Token = require('../models/token'),
    errorRoutes = require('./errors');


module.exports = {

    /** login **/
    login: function (req, res, next) {
        let credential = {
            username: req.body.username,
            password: req.body.password
        };

        if (credential.username && credential.password) {
            authenticateCredential(credential).then((result) => {
                if (result) {
                    return res.json(result);
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
            return new Token(findResult);
        }
    })
};

