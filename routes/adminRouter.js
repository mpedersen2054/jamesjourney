var config      = require('../config');
var adminRouter = require('express').Router();
var Blog        = require('../db/blog');
var EEvent      = require('../db/event');
var Gallery     = require('../db/gallery');
var mcapi       = require('mailchimp-api');
var mc          = new mcapi.Mailchimp(config.mailchimpApiKey);


adminRouter.route('/')
  .get(function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    }
    else {
      req.adminData.username = req.user.username;
      res.render('admin_page', req.adminData);
    }
  })


module.exports = adminRouter;