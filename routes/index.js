var express = require('express'),
    errors = require('./errors'),
    dictionary = require('./dictionary'),
    hsk = require('./hsk');


module.exports = express.Router()
    .get('/dictionary', dictionary)
    .get('/hsk', dictionary)

    .use(errors.error_404)
    .use(errors.error_handler);

