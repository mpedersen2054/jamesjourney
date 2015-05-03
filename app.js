var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');


// DATABASE

mongoose.connect('mongodb://localhost/james');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('~~ connected to mongodb ~~') });


// CONFIG

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES

var staticRouter  = require('./routes/staticRouter.js');
var blogRouter    = require('./routes/blogRouter.js');
var galleryRouter = require('./routes/galleryRouter.js');
var messageRouter = require('./routes/messageRouter.js');



app.use('/', staticRouter);

app.use('/blog',     blogRouter);
app.use('/gallery',  galleryRouter);
app.use('/messages', messageRouter);


// ERROR HANDLING

app.use(function(req, res, next) { // catch 404
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// will print stacktrace in dev
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// no stacktraces leaked to user in prod
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
