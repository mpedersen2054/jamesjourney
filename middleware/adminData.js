var Blog        = require('../db/blog');
var EEvent      = require('../db/event');
var Gallery     = require('../db/gallery');
var mcapi       = require('mailchimp-api');
var mc          = new mcapi.Mailchimp('a6eec20e3398ba1010f1243598ee34cb-us11');

function queryAll(callback) {
  Blog.find({}, function(err, blogs) {
    if (err) return callback(err, null);

    EEvent.find({}, function(err, events) {
      if (err) return callback(err, null);

      Gallery.find({}, function(err, galleries) {
        if (err) return callback(err, null);
        // get mailchimp subscribers
        mc.lists.members({id: 'cb90ef9f1e'}, function(data) {
          var adminData = {
            blogs: blogs,
            events: events,
            images: galleries,
            mcd: data.data,
            isAdminPage: true
          }

          callback(null, adminData);
        });
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