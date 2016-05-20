var config            = require('../config');
var subscribersRouter = require('express').Router();
var Subscriber        = require('../db/subscribers');
var mailchimpWrapper  = require('../lib/mailchimpWrapper');

subscribersRouter.route('/')
  .get(function(req, res) {
    res.send('hello /subscribers root!');
  })

subscribersRouter.route('/new')

  .get(function(req, res) {
    res.render('subscribe');
  })

  .post(function(req, res) {
    var rb = req.body;

    // if (!rb.email) { return res.send({ success: false, message: 'Email required.' }) }

    // use the mailchimpWrapper and pass in the body containing
    // the email, firstname and lastname, then render subscribed template
    mailchimpWrapper.addUser(rb, function(err, resp) {

      console.log('mcw err', err)
      console.log('mcWrap response', resp)

      Subscriber.findOne({ email: rb.email }, function(err, sub) {
        if (!sub) {
          rb.mcid = resp;
          console.log('hasnt subscribed yet')
          var newSub = new Subscriber(rb);
          newSub.save();
          res.render('subscribed', {
            success: true,
            name:    `${rb.f_name} ${rb.l_name}`,
            email:   rb.email
          });
        }
        else {
          if (!sub.mcid) {
            sub.mcid = resp;
            sub.save();
          }
          console.log('already subscribed.')
          res.render('subscribed', {
            success: false,
            name:    `${rb.f_name} ${rb.l_name}`,
            email:   rb.email
          })
        }
      })

    });
  });


subscribersRouter.route('/members')
  .get(function(req, res) {
    request(config.mailchimpListUrl, {
      'headers': {
        'Authorization': config.mailchimpAuthHeader
      }
    }, function(err, resp, body) {
      var theResp = JSON.parse(body);
      var members = theResp.members;
      var formattedMembers = [];

      for (var i in members) {
        var member       = members[i];
        var obj          = {};
        obj.id           = member.id;
        obj.emailAddress = member.email_address;
        obj.fName        = decodeURI(member.merge_fields['FNAME']);
        obj.lName        = decodeURI(member.merge_fields['LNAME']);
        obj.fullName     = obj.fName + ' ' + obj.lName;

        formattedMembers.push(obj);
      }
      res.json(formattedMembers);
    })
  })


module.exports = subscribersRouter;