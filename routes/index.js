var express = require('express'),
    errors = require('./errors'),
    auth = require('./auth'),
    //user = require('./users'),
    dictionaryRoutes = require('./dictionary'),
    hskRoutes = require('./hsk'),
    translation = require('./translation');


module.exports = express.Router()
    /**
    .all('/*', function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    })
     **/
    // auth middleware, token validation
    //.all('/api/v1/*', [require('./middlewares/validateRequest')])

    // log routes
    //.use('/login', auth)

    // dictionary routes
    .get('/dictionary', dictionaryRoutes.getAll)
    .get('/dictionary/traditional', dictionaryRoutes.getTraditional)
    .get('/dictionary/simplified', dictionaryRoutes.getSimplified)
    .get('/dictionary/pinyin-number', dictionaryRoutes.getPinyinNumber)
    .get('/dictionary/pinyin-tone', dictionaryRoutes.getPinyinTone)
    .get('/dictionary/pinyin-atone', dictionaryRoutes.getPinyinAtone)
    .get('/dictionary/translation', dictionaryRoutes.getTranslation)

    // hsk routes
    .get('/hsk/:level', hskRoutes.getAll)
    .get('/hsk/:level/traditional', hskRoutes.getTraditional)
    .get('/hsk/:level/simplified', hskRoutes.getSimplified)
    .get('/hsk/:level/pinyin-number', hskRoutes.getPinyinNumber)
    .get('/hsk/:level/pinyin-tone', hskRoutes.getPinyinTone)
    .get('/hsk/:level/pinyin-atone', hskRoutes.getPinyinAtone)
    .get('/hsk/:level/translation', hskRoutes.getTranslation)

    // translation routes
    //.use('/translation', translation)

    .use(errors.error404)
    .use(errors.errorHandler);