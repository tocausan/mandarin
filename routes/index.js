var express = require('express'),
    errors = require('./errors'),
    dictionary = require('./dictionary'),
    hsk = require('./hsk'),
    translation = require('./translation');


module.exports = express.Router()
    .use('/dictionary', dictionary)
    .use('/hsk', hsk)
    .use('/translation', translation)

    .use(errors.error_404)
    .use(errors.error_handler);