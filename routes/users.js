/** users routes **/

let config = require('../config'),
    databaseServices = require('../services/database');

module.exports = {

    getAll: function(req, res) {
        databaseServices.findAll(config.database.collections.users).then(result => {
            res.json(result);
        });
    },

    getOneByUsername: function(req, res) {
        databaseServices.findOne(config.database.collections.users, {username: req.params.username}).then(result => {
            res.json(result);
        });
    },

    create: function(req, res) {
        databaseServices.insertOneIfNotExist(config.database.collections.users, req.body).then(result => {
            res.json(result);
        });
    },

    update: function(req, res) {
        res.json('not handled yet');
    },

    delete: function(req, res) {
        res.json('not handled yet');
    }
};

