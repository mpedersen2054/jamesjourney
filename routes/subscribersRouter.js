var subscribersRouter = require('express').Router();
var mailchimpWrapper = require('../lib/mailchimpWrapper');

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
    request('https://us11.api.mailchimp.com/3.0/lists/cb90ef9f1e/members', {
      'headers': {
        'Authorization': 'apikey a6eec20e3398ba1010f1243598ee34cb-us11'
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