var express = require('express'),
    mongoClient = require('mongodb').MongoClient,
    jwt = require('jwt-simple'),
    moment = require('moment');

let validate = function (username, password) {
        // spoofing

        return {
            name: 'tocausan',
            role: 'admin',
            username: 'tocausan@gmail.com'
        };
    },

    genToken = function (user) {
        //
        var expires = moment.utc().add(7, 'days'),
            token = jwt.encode({
                exp: expires
            }, require('../config/secret')());

        return {
            token: token,
            expires: expires,
            user: user
        };
    };


module.exports = {

    /** login **/
    login: function (req, res) {
        let username = req.body.username,
            password = req.body.password;

        // check credentials
        if (username && password) {
            // credentials DB validation
            let dbUser = validate(username, password);
            if (dbUser) {
                // success
                return res.json(genToken(dbUser));
            } else {
                // invalid credentials
                return res.status(401)
                    .json({
                        "status": 401,
                        "message": "Invalid credentials"
                    });
            }
        } else {
            // empty credential
            return res.status(401)
                .json({
                    "status": 401,
                    "message": "Empty credentials"
                });
        }
    }
};

