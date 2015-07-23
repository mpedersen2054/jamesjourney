var passport     = require('passport');
var staticRouter = require('express').Router();
var async        = require('async');
var flash        = require('connect-flash');
var Blog         = require('../db/blog')
var Gallery      = require('../db/gallery');


var authPassport = passport.authenticate('local', {
  successRedirect: '/admin-page',
  failureRedirect: '/login',
  failureFlash: true
});

// make async query to Blog.all and Gallery.all, render the page
var getDbs = function(page, req, res) {
  async.parallel([
    function(cb) {
      Blog.find(function(err, blogs) { cb(null, blogs) });
    },
    function(cb) {
      Gallery.find(function(err, gals) { cb(null, gals) });
    }
  ], function(err, results) {
    if (err) console.log(err);
    var blogs = results[0], gals = results[1];
    res.render(page, {
      blogs: blogs,
      gals: gals,
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  })
}

staticRouter.route('/')
  .get(function(req, res) {
    getDbs('index', req, res)
  })

staticRouter.route('/login')
  .get(function(req, res) {
    res.render('login', { message: req.flash('error') });
  })
  .post(authPassport, function(req, res) {
    res.redirect('/admin-page')
  })

staticRouter.route('/admin-page')
  .get(function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    }
    else {
      getDbs('admin_page', req, res);
    }
  })

module.exports = staticRouter;