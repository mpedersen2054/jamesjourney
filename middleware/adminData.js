var Blog     = require('../db/blog');
var EEvent   = require('../db/event');
var Gallery  = require('../db/gallery');
var Donation = require('../db/donation');
var mcapi    = require('mailchimp-api');
var config   = require('../config');
var mc       = new mcapi.Mailchimp(config.mailchimpApiKey);

function queryAll(callback) {
  Blog.find({}, function(err, blogs) {
    if (err) return callback(err, null);

    EEvent.find({}, function(err, events) {
      if (err) return callback(err, null);

      Gallery.find({}, function(err, galleries) {
        if (err) return callback(err, null);

        Donation.find({}, function(err, donations) {
          if (err) return callback(err, null);

          // get mailchimp subscribers
          mc.lists.members({id: 'cb90ef9f1e'}, function(data) {
            var adminData = {
              blogs:       blogs,
              events:      events,
              images:      galleries,
              mcd:         data.data,
              donations:   donations,
              isAdminPage: true
            }

            callback(null, adminData);
          });
        })
      });
    });
  });
}

module.exports = function(adminRouter) {

  return adminRouter.use(function(req, res, next) {

    if (req.isAuthenticated() && !req.adminData) {
      queryAll(function(err, data) {
        if (err) console.log(err);
        req.adminData = data;
        return next();
      })
    }
    else {
      return next();
    }

  })

}