var passport     = require('passport');
var staticRouter = require('express').Router();
var flash        = require('connect-flash');
var Blog         = require('../db/blog')
var EEvent       = require('../db/event');
var Featured     = require('../lib/queries');
var Gallery      = require('../db/gallery');

// passport middleware to authenticate credentials
var authPassport = passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
});

staticRouter.route('/')
  .get(function(req, res) {
    Featured.findFeaturedBlogs(6, function(err, blogs) {
      if (err) return next(err);

      console.log(blogs)

      for (var blog in blogs) {
        console.log(blogs[blog])
        console.log(' ')
        console.log(' ')
        console.log(' ')
      }

      EEvent.find({}, function(err, events) {
        if (err) return next(err);
        var evsLen = events.length;
        var placeholders = 4 - evsLen;

        // if there are < 4 events, add blank data so there are 4 events
        if (evsLen < 4) {
          for (var i=0; i < placeholders; i++) {
            var fakeData = {
              month: '',
              day: '',
              formattedDate: '',
              name: ''
            }
            events.push(fakeData);
          }
        }

        Gallery.find({}, function(err, galleries) {

          res.render('index', {
            blogs: blogs,
            events: events,
            galleries: galleries
          });
        });
      });
    });
  })

staticRouter.route('/login')
  .get(function(req, res) {
    res.render('login', { message: req.flash('error') });
  })
  .post(authPassport, function(req, res) {
    res.redirect('/admin')
  })

staticRouter.route('/get-involved')
  .get(function(req, res) {
    res.render('get_involved');
  })

staticRouter.route('/our-work')
  .get(function(req, res) {
    res.render('our_work');
  })

staticRouter.route('/our-work2')
  .get(function(req, res) {
    res.render('our_work2');
  })

staticRouter.route('/contact-us')
  .get(function(req, res) {
    res.render('contact_us');
  })

staticRouter.route('/our-team')
  .get(function(req, res) {
    res.render('our_team');
  })

staticRouter.route('/instructions')
  .get(function(req, res) {
    res.render('instructions');
  })

module.exports = staticRouter;