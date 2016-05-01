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
        console.log('mcWrapper err1!!!', err1, body.status, body.title);
        callback(err1, null);
      }
      var id = body.id, email = prms.email, fName = prms.f_name,
        lName = prms.l_name

      // find subscriber by email given
      Subscriber.findOne({ email: params.email }, function(err2, user) {
        if (err2) { callback(err2, null); }

        console.log('mcWrapper checking if sub exists on Subscribers.')

        // if the user already exists in the DB, add MCID and save
        if (user) {
          console.log('the user already exists in DB!')
          user.mcid = id;
          user.save(function(err) {
            callback(null, user)
          });
        }

        // create new subscriber if none found
        if (!user) {
          var obj = {
            mcid: id,
            f_name: fName,
            l_name: lName,
            full_name: fName + ' ' + lName,
            email: email
          }
          callback(null, id)
          // var sub = new Subscriber(obj);

          // sub.save(function(err4) {
          //   if (err4) { callback(err4, null) }
          //   if (!err4){
          //     // final callback
          //     console.log('just created a new subscriber from mailchimpWrapper');
          //     callback(null, sub);
          //   }
          // });
        }
      });
    });
}