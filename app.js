var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),

    routes = require('./routes'),
    dictionaryRoutes = require('./routes/dictionary'),
    hskRoutes = require('./routes/hsk');

// export module
module.exports = express()

    // view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }))

    // routes
    .use(express.static(path.join(__dirname, 'public')))
    //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(routes);


