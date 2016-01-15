var express        = require('express');
var mongoose       = require('mongoose');
var hbs            = require('hbs');
var passport       = require('passport');
var logger         = require('morgan');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var path           = require('path');
var favicon        = require('serve-favicon');
var flash          = require('connect-flash');

require('./config/db')(mongoose);

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
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

// PASSPORT CONFIG
require('./config/passport')(app, passport)

// ROUTES
var staticRouter  = require('./routes/staticRouter.js');
var blogRouter    = require('./routes/blogRouter.js');
var galleryRouter = require('./routes/galleryRouter.js');
var messageRouter = require('./routes/messageRouter.js');
var eventRouter   = require('./routes/eventRouter.js');
var galleryRouter = require('./routes/galleryRouter.js');


app.use('/',         staticRouter);
app.use('/blog',     blogRouter);
app.use('/gallery',  galleryRouter);
app.use('/messages', messageRouter);
app.use('/events',   eventRouter);
app.use('/gallery',  galleryRouter);

// var fakeData = require('./lib/fakeData.js');
// fakeData();

// app.get('/flash', function(req, res) {
//   req.flash('wrong-password', 'The password you entered for that username is incorrect.')
// })

var User = require('./db/user');
app.get('/users', function(req, res) {
  // if (req.user) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  // } else {
    // res.redirect('/login')
  // }
});

app.get('/users/new', function(req, res) {
  // if (req.user) {
    res.render('new_user');
  // } else {
    // res.redirect('/login');
  // }
})

// REMOVE ONCE ALL USERS ADDED
app.post('/users/new', function(req, res) {
  console.log(req.body)
  // if (req.user) {
  var user = new User(req.body);
  user.save(function(err, user) {
    res.redirect('/users')
  })
  // } else {
    // res.redirect('/login')
  // }
})

var port = process.env.PORT || 3000;
app.listen(port);
