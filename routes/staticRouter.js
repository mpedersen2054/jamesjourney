var passport     = require('passport');
var staticRouter = require('express').Router();
var async        = require('async');
var flash        = require('connect-flash');
var Blog         = require('../db/blog')
var Gallery      = require('../db/gallery');
var mcapi        = require('mailchimp-api');
var mc           = new mcapi.Mailchimp('a6eec20e3398ba1010f1243598ee34cb-us11');


var authPassport = passport.authenticate('local', {
  successRedirect: '/admin-page',
  failureRedirect: '/login',
  failureFlash: true
});

// make async query to Blog.all and Gallery.all, render the page
var getDbs = function(page, req, res, admin) {
  var mcData;

  async.parallel([
    function(cb) {
      Blog.find(function(err, blogs) { cb(null, blogs) });
    },
    function(cb) {
      Gallery.find(function(err, gals) { cb(null, gals) });
    },
    function(cb) {
      // if this is being called for use /admin-page
      // return list of mailchimp subscribers
      if (admin) {
        mc.lists.members({id: 'cb90ef9f1e'}, function(data) {
          var mcd = data.data;
          cb(null, mcd)
        })
      }
      else {
        cb(null, null);
      }
    }
  ], function(err, results) {
    if (err) console.log(err);
    var blogs = results[0], gals = results[1], mcd = results[2];

    res.render(page, {
      blogs: blogs,
      gals: gals,
      mcd: mcd,
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
    });
  })
}

staticRouter.route('/')
  .get(function(req, res) {
    getDbs('index', req, res, false);
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
      getDbs('admin_page', req, res, true);
    }
  })

module.exports = staticRouter;