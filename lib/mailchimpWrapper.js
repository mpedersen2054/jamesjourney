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
        // PROBABLY SHOULD RETURN THE MCID(body.id) INSTEAD OF RETURNING AN ERROR
        console.log('mcWrapper err1!!!', body.title, err1);
      }
      var id = body.id, email = prms.email, fName = prms.f_name,
        lName = prms.l_name

      // find subscriber by email given
      console.log('mcWrapper cb the mcid')
      callback(null, body.id)
    });
}