var Blog     = require('../db/blog');
var EEvent   = require('../db/event');
var Gallery  = require('../db/gallery');
var Donation = require('../db/donation');
var Subscriber = require('../db/subscribers');
var mcapi    = require('mailchimp-api');
var config   = require('../config');
// var mc       = new mcapi.Mailchimp(config.mailchimpApiKey);

function queryAll(callback) {
  Blog.find({}, function(err, blogs) {
    if (err) return callback(err, null);

    EEvent.find({}, function(err, events) {
      if (err) return callback(err, null);

      // return an event with a new tshirtMap
      // object property attached to it
      var eventsWithTshirtMap = events.map(function(event) {
        var tshirtCounter = { s: 0, m: 0, l: 0, xl: 0 };
        // iterate over each attendee in event
        // and increment tshirtCounter accordingly
        event.attendees.forEach(function(attendee) {
          var tshirtSize = attendee.tshirt.toLowerCase();
          if (tshirtSize === 's') {
            tshirtCounter.s++;
          } else if (tshirtSize === 'm') {
            tshirtCounter.m++;
          } else if (tshirtSize === 'l') {
            tshirtCounter.l++;
          } else if (tshirtSize === 'xl') {
            tshirtCounter.xl++;
          } else { return }
        });

        event.tshirtMap = tshirtCounter;
        return event;
      });

      Gallery.find({}, function(err, galleries) {
        if (err) return callback(err, null);

        Donation.find({}, function(err, donations) {
          if (err) return callback(err, null);

          // get mailchimp subscribers
          // mc.lists.members({id: 'cb90ef9f1e'}, function(data) {

          Subscriber.find({}, 'full_name email added_on', function(err, subs) {
            console.log('subs', subs)
          })

          var adminData = {
            blogs:       blogs,
            events:      eventsWithTshirtMap,
            images:      galleries,
            // mcd:         data.data,
            donations:   donations,
            isAdminPage: true
          }

          callback(null, adminData);
          // });
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