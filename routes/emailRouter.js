var emailRouter = require('express').Router();
var EEvent      = require('../db/event');
var sgWrapper   = require('../lib/sendgridWrapper');

emailRouter.route('/')
  .get(function(req, res) {
    res.send('hello there email route')
  })

// /emails/sent?success=true&recepsLen=X
// endpoint to be redirected to after a email form is submitted
emailRouter.route('/sent')
  .get(function(req, res) {
    res.render('email_sent', {
      success: req.query.success,
      recepsLen: req.query.recepsLen,
      eventSlug: req.query.eventSlug || ''
    })
  })

emailRouter.route('/newMass')
  .get(function(req, res) {
    res.render('new_mass_email')
  })
  .post(function(req, res) {
    var rb = req.body, subject = rb.subject, content = rb.content;
    var emails = ['matthewnpedersen@gmail.com', 'patmedersen@yahoo.com'];

    sgWrapper.sendEmail({ receps: emails, subject: subject, content: content }, function(err, data) {
      if (err || !data)
        { console.log('there was an error!', err, data)
      } else {
        res.redirect(`/emails/sent?success=true&recepsLen=${emails.length}`)
      }
    });
  })

emailRouter.route('/newEventOnly')
  .get(function(req, res) {
    EEvent
      .find({})
      .sort({ date: 1 })
      .select({ name: 1, _id: 1 })
      .exec(function(err, events) {
        if (!err && events.length) {
          res.render('new_event_email', { events: events })
        }
    })

  })
  .post(function(req, res) {
    var rb = req.body;

    EEvent
      .findOne({ _id: rb.eventId })
      // .select({ 'attendees.full_name': 1, 'attendees.email': 1 }) // dont need name idt
      .select({ 'attendees.email': 1, 'name': 1, 'slug': 1 })
      .exec(function(err, event) {
        console.log('err? ', err)
        if (!err) {
          var opts = {
            receps:  event.attendees.map((val, i) => { return val.email }),
            subject: rb.subject,
            content: rb.content,
            topic:   event.name,
            slug:    event.slug
          }

          console.log('opts obj: ', opts)

          sgWrapper.sendEmail(opts, function(err2, data) {
            if (err2) {
              console.log('there was an error!', err2, data)
            } else {
              res.redirect(`/emails/sent?success=true&recepsLen=${opts.receps.length}&eventSlug=${opts.slug}`)
            }
          });

        } else {
          console.log('errrororororororo', err)
        }
      });
  })

emailRouter.route('/newOnSub')

emailRouter.route('/newOnDonate')

module.exports = emailRouter;