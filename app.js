var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var mongoose       = require('mongoose');
var passport       = require('passport');
var passportLocal  = require('passport-local');
var flash          = require('connect-flash');


// DATABASE
////////////////////
mongoose.connect('mongodb://localhost/james');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('~~ connected to mongodb ~~') });


// CONFIG
////////////////////
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash())


var User = require('./db/user');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal.Strategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if(err) return done(err);
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    if (!user.comparePassword(password)) {
      return done(null, false, { message: 'Incorrect password' })
    }
    return done(null, user)
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});


// ROUTES
////////////////////
var staticRouter  = require('./routes/staticRouter.js');
var blogRouter    = require('./routes/blogRouter.js');
var galleryRouter = require('./routes/galleryRouter.js');
var messageRouter = require('./routes/messageRouter.js');


app.use('/',         staticRouter);
app.use('/blog',     blogRouter);
app.use('/gallery',  galleryRouter);
app.use('/messages', messageRouter);

// app.get('/flash', function(req, res) {
//   req.flash('wrong-password', 'The password you entered for that username is incorrect.')
// })

app.get('/users', function(req, res) {
  if (req.user) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  } else {
    res.redirect('/login')
  }
});

app.get('/users/new', function(req, res) {
  if (req.user) {
    res.render('new_user');
  } else {
    res.redirect('/login');
  }
})

app.post('/users/new', function(req, res) {
  console.log(req.body)
  if (req.user) {
    var user = new User(req.body);
    user.save(function(err, user) {
      res.redirect('/users')
    })
  } else {
    res.redirect('/login')
  }
})


// ERROR HANDLING
////////////////////
app.use(function(req, res, next) { // catch 404
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404')
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
