var express = require('express'),
    corsHeaderMiddleware = require('./middlewares/corsHeader'),
    requestValidationMiddleware = require('./middlewares/requestValidation'),
    errorsRoutes = require('./errors'),
    authRoutes = require('./auth'),
    usersRoutes = require('./users'),
    dictionaryRoutes = require('./dictionary'),
    hskRoutes = require('./hsk'),
    translation = require('./translation'),
    apiVersionPath = '/api/v1';


module.exports = express.Router()
    .all('/*', [corsHeaderMiddleware])

    // log routes
    .use('/login', authRoutes.login)

    // auth middleware, token validation
    .all(apiVersionPath + '/*', [requestValidationMiddleware])

    // users
    //.get('/api/v1/admin/users', usersRoutes.getAll)
    //.get('/api/v1/admin/user/:id', usersRoutes.getOne)
    //.post('/api/v1/admin/user/', usersRoutes.create)
    //.put('/api/v1/admin/user/:id', usersRoutes.update)
    //.delete('/api/v1/admin/user/:id', usersRoutes.delete)

    // dictionary routes
    .get(apiVersionPath + '/dictionary', dictionaryRoutes.getAll)
    .get(apiVersionPath + '/dictionary/traditional', dictionaryRoutes.getTraditional)
    .get(apiVersionPath + '/dictionary/simplified', dictionaryRoutes.getSimplified)
    .get(apiVersionPath + '/dictionary/pinyin-number', dictionaryRoutes.getPinyinNumber)
    .get(apiVersionPath + '/dictionary/pinyin-tone', dictionaryRoutes.getPinyinTone)
    .get(apiVersionPath + '/dictionary/pinyin-atone', dictionaryRoutes.getPinyinAtone)
    .get(apiVersionPath + '/dictionary/translation', dictionaryRoutes.getTranslation)

    // hsk routes
    .get(apiVersionPath + '/hsk/:level', hskRoutes.getAll)
    .get(apiVersionPath + '/hsk/:level/traditional', hskRoutes.getTraditional)
    .get(apiVersionPath + '/hsk/:level/simplified', hskRoutes.getSimplified)
    .get(apiVersionPath + '/hsk/:level/pinyin-number', hskRoutes.getPinyinNumber)
    .get(apiVersionPath + '/hsk/:level/pinyin-tone', hskRoutes.getPinyinTone)
    .get(apiVersionPath + '/hsk/:level/pinyin-atone', hskRoutes.getPinyinAtone)
    .get(apiVersionPath + '/hsk/:level/translation', hskRoutes.getTranslation)

    // translation routes
    //.use('/translation', translation)

    .use(errorsRoutes.error404)
    .use(errorsRoutes.errorHandler);