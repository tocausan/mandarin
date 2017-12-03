var express = require('express'),
    mongoDb = require('mongodb'),
    databaseConfig = require('../config/database'),
    secretConfig = require('../config/secret'),
    errorRoutes = require('./errors'),
    jwt = require('jwt-simple'),
    moment = require('moment');

let authenticateCredential = function (credential) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databaseConfig.path, (err, db) => {
                // find user with credentials
                db.collection(databaseConfig.collections.users).findOne(credential, (err, result) => {
                    if (err) {
                        // error
                        console.log(err);
                        reject(err);
                    } else {
                        Object.keys(result).map(key => {

                        })
                        let filteredResult = result
                        console.log(Object.keys(result))
                        // success return only username & role
                        resolve(result);
                    }
                });
                // close
                db.close();
            });
        });
    },

    generateToken = function (user) {
        // 7 days token
        return {
            user: user,
            expires: moment.utc().add(7, 'days'),
            token: jwt.encode({exp: this.expires}, secretConfig.token)
        };
    };


module.exports = {

    /** login **/
    login: function (req, res, next) {
        // get credetials
        let credential = {
            username: req.body.username,
            password: req.body.password
        };

        // check credentials
        if (credential.username && credential.password) {
            // credentials authentication
            authenticateCredential(credential).then((user) => {
                if (user) {
                    // get token
                    return res.json(generateToken(user));
                } else {
                    // invalid credentials
                    return errorRoutes.error401_invalid(req, res, next);
                }
            });
        } else {
            // empty credential
            return errorRoutes.error401_empty(req, res, next);
        }
    }
};

