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
      Blog.find({}, function(err, blogs) {
        if (err) return next(err);

        EEvent.find({}, function(err, events) {
          if (err) return next(err);

          Gallery.find({}, function(err, galleries) {

            // get mailchimp subscribers
            mc.lists.members({id: 'cb90ef9f1e'}, function(data) {

              res.render('admin_page', {
                blogs: blogs,
                events: events,
                images: galleries,
                mcd: data.data
              });

            });

          });
        });
      });
    }
  })


module.exports = adminRouter;