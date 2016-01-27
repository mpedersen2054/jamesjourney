var adminRouter = require('express').Router();
var Blog        = require('../db/blog');
var EEvent      = require('../db/event');
var Gallery     = require('../db/gallery');
var mcapi       = require('mailchimp-api');
var mc          = new mcapi.Mailchimp('a6eec20e3398ba1010f1243598ee34cb-us11');


adminRouter.route('/')
  .get(function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    }
    else {
      console.log(req.adminData)
      res.render('admin_page', req.adminData);
    }
  })


module.exports = adminRouter;