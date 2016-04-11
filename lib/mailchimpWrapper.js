var request    = require('request');
var Subscriber = require('../db/subscribers');
var config     = require('../config');

module.exports.addUser = function(params, callback) {
  var prms = params;
  var data = {
    status: "subscribed",
    merge_fields: {
      FNAME: prms.f_name,
      LNAME: prms.l_name
    },
    email_address: prms.email
  };

  // request members list
  request
    .post(config.mailchimpListUrl, {
      'headers': {
        // eventually process.env mask
        'Authorization': config.mailchimpAuthHeader,
        'content-type' : 'application/json'
      },
      'json': data
    }, function(err1, resp, body) {
      if (body.status === 400 && body.title === 'Member Exists' || err1) {
        callback('error', null);
      }
      var id = body.id, email = prms.email, fName = prms.f_name,
        lName = prms.l_name

      // find subscriber by email given
      Subscriber.findOne({ email: params.email }, function(err2, user) {
        if (err2) { callback(err2, null); }

        // create new subscriber if none found
        if (!err2 && !user) {
          var obj = {
            mcid: id,
            f_name: fName,
            l_name: lName,
            full_name: fName + ' ' + lName,
            email: email
          }
          var sub = new Subscriber(obj);

          sub.save(function(err3) {
            if (err3) { callback(err3, null) }
            if (!err3){
              // final callback
              callback(null, sub)
            }
          });
        }
      });
    });
}