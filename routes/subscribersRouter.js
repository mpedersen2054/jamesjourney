var config            = require('../config');
var subscribersRouter = require('express').Router();
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
    var body = req.body;
    // use the mailchimpWrapper and pass in the body containing
    // the email, firstname and lastname, then render subscribed template
    mailchimpWrapper.addUser(req.body, function(err, resp) {
      if (err) {
        res.render('subscribed', {
          success: false,
          name: body.f_name+' '+body.l_name,
          email: body.email
        })
      }
      else {
        res.render('subscribed', {
          success: true,
          name: body.f_name+' '+body.l_name,
          email: body.email
        });
      }
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
        var member = members[i];
        var obj = {};
        obj.id = member.id;
        obj.emailAddress = member.email_address;
        obj.fName = decodeURI(member.merge_fields['FNAME']);
        obj.lName = decodeURI(member.merge_fields['LNAME']);
        obj.fullName = obj.fName + ' ' + obj.lName;

        formattedMembers.push(obj);
      }
      res.json(formattedMembers);
    })
  })


module.exports = subscribersRouter;