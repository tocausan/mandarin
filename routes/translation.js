var express = require('express');

module.exports = express.Router()

    // get chinese character definition
    .get('chinese/:character', function (req, res, next) {
        res.send(req.params.character)
    })