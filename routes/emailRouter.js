var emailRouter = require('express').Router();
var mgWrapper = require('../lib/sendgridWrapper');

emailRouter.route('/')
  .get(function(req, res) {
    res.send('hello there email route')
  })

emailRouter.route('/sent')
  .get(function(req, res) {
    res.render('email_sent', { success: req.query.success, recepsLen: req.query.recepsLen })
  })

emailRouter.route('/newMass')
  .get(function(req, res) {
    res.render('new_mass_email')
  })
  .post(function(req, res) {
    var rb = req.body, subject = rb.subject, content = rb.content;
    var emails = ['matthewnpedersen@gmail.com', 'patmedersen@yahoo.com'];

    mgWrapper.sendEmail({ receps: emails, subject: subject, content: content }, function(err, data) {
      if (err || !data)
        { console.log('there was an error!', err, data)
      } else {
        res.redirect(`/emails/sent?success=true&recepsLen=${emails.length}`)
      }
    });
  })

emailRouter.route('/newEventOnly')
  .get(function(req, res) {
    var events = [{id: '1', name: 'first'}, {id: '2', name: 'hello second'}, {id: '3', name: 'hello this is 3rd!'}]
    res.render('new_event_email', { events: events })
  })
  .post(function(req, res) {
    var rb = req.body;
    var eventId = req.query.evid;
  })

emailRouter.route('/newOnSub')

emailRouter.route('/newOnDonate')

module.exports = emailRouter;