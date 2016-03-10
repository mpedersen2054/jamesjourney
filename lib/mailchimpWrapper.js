var request = require('request');
var Subscriber = require('../db/subscribers');

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
  request
    .post('https://us11.api.mailchimp.com/3.0/lists/cb90ef9f1e/members', {
      'headers': {
        'Authorization': 'apikey a6eec20e3398ba1010f1243598ee34cb-us11',
        'content-type' : 'application/json'
      },
      'json': data
    }, function(err1, resp, body) {
      if (body.status === 400 && body.title === 'Member Exists' || err1) {
        callback('error', null);
      }
      var id = body.id, email = prms.email, fName = prms.f_name,
        lName = prms.l_name

      Subscriber.findOne({ email: params.email }, function(err2, user) {
        if (err2) { callback(err2, null) }
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
              callback(null, sub)
            }
          });
        }
      });

    })
}