var express = require('express'),
    jwt = require('jwt-simple'),
    moment = require('moment');


module.exports = {
    login: function (req, res) {
        let username = req.body.username;
        let password = req.body.password;

        // check credentials
        if (username && password) {
            // credentials DB validation
            var dbUser = auth.validate(username, password);
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
    },

    validate: function (username, password) {
        // spoofing
        return {
            name: 'tocausan',
            role: 'admin',
            username: 'tocausan@gmail.com'
        };
    },

    validateUser: function (username) {
        // spoofing
        return {
            name: 'tocausan',
            role: 'admin',
            username: 'tocausan@gmail.com'
        };
    }
};

// private method
function genToken(user) {
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

}
