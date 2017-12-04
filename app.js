var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    helmet = require('helmet'),
    services = require('./services'),
    routes = require('./routes');

// export module
module.exports = express()

    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(services.security.enableCORS)
    /**
     .use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }))
     .use(express.static(path.join(__dirname, 'public')))
     .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
     .set('views', path.join(__dirname, 'views'))
     .set('view engine', 'ejs')
     **/

    .use('/', routes)

    // TLS security
    .use(helmet())
    .disable('x-powered-by');

