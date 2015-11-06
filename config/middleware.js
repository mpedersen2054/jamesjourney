// CONFIG
////////////////////

var logger         = require('morgan');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var path           = require('path');
var hbs            = require('hbs');
var favicon        = require('serve-favicon');
var flash          = require('connect-flash');

module.exports = function(app) {

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    hbs.registerPartials(__dirname + '/views/partials');
    app.use(logger('dev'));
    app.use(methodOverride('_method'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false
    }));
    app.use(flash());

}


