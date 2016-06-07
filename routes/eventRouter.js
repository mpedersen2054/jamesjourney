// var _             = require('underscore');
var eventRouter      = require('express').Router();
var EEvent           = require('../db/event');
var mailchimpWrapper = require('../lib/mailchimpWrapper');
var stripeWrapper    = require('../lib/stripeWrapper');
var Subscriber       = require('../db/subscribers');
var Donation         = require('../db/donation');
var markdown         = require('markdown').markdown;
var toMarkdown       = require('to-markdown');

eventRouter.route('/')
  .get(function(req, res) {
    EEvent.find(function(err, events) {
      res.render('events', { events: events })
    })
  })

// GET NEW EVENT TMPL
eventRouter.route('/new')
  .get(function(req, res) {
    if (req.user) { res.render('new_event'); }
    else { res.redirect('/login') }
  })
  // ADD NEW EVENT
  .post(function(req, res) {
    // if (!req.user) { res.redirect('/login') }
    var data  = req.body;

    // iterate over each k/v and trim the value
    Object.keys(data).map(function(value, index) {
      return data[value].trim();
    });

    // take the description & time textarea'a and
    // treat them as markdown, turn the md into html string
    var description  = markdown.toHTML(data.description);
    var time         = markdown.toHTML(data.time);
    data.description = description;
    data.time        = time;

    // format the date
    var date  = new Date(data.date);
    data.date = date;

    var ev = new EEvent(data);
    ev.save(function(err) {
      if (err) return console.log(err);
      return res.redirect('/admin');
    });
  })

// SHOW EVENT
eventRouter.route('/:slug')
  .get(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      if (err || !ev) { return res.status(404).render('404', { message: `Can\'t find the event ${req.params.slug}` }) };

      res.render('show_event', { event: ev });
    });
  })
  // UPDATE EVENT // should be put into an admin route
  .put(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      var rb = req.body;

      // take each input, if the req.body.xxx === event.xxx
      // just return the event.xxx
      ev.name          = (rb.name !== ev.name) ? rb.name : ev.name;
      ev.date          = ev.date
      var timez        = (rb.time !== ev.time) ? rb.time : ev.time; // need to turn it into html before attacting to obj
      ev.locationName  = (rb.locationName !== ev.locationName) ? rb.locationName : ev.locationName;
      ev.streetAddress = (rb.streetAddress !== ev.streetAddress) ? rb.streetAddress : ev.streetAddress;
      ev.cityState     = (rb.cityState !== ev.cityState) ? rb.cityState : ev.cityState;
      ev.zipCode       = (rb.zipCode !== ev.zipCode) ? rb.zipCode : ev.zipCode;
      var descriptionz = (rb.description !== ev.description) ? rb.description : ev.description; // need to turn it into html before attacting to obj

      // turn them into html string, attach back onto obj
      ev.time = markdown.toHTML(timez);
      ev.description = markdown.toHTML(descriptionz);

      ev.save(function(err) {
        if (err) console.log(err);
        res.redirect('/admin');
      });
    });
  })
  // register subscriber to event, create donation
  .post(function(req, res) {
    // console.log(req.body)
    var rb = req.body;
    if (!rb.f_name || !rb.l_name || !rb.email) {
      res.send({
        success: false,
        message: 'There was an error related to your Personal Infomation.'
      });
    }
    if (!rb.stripeToken || !rb.cardNumber || !rb.expMonth || !rb.expYear || !rb.cvcCode) {
      res.send({
        success: false,
        message: 'There was an error related to your Credit Card Information.'
      });
    }

    // find the event by hidden input passed in by form
    EEvent.findById(rb.event_id, function(err, event) {
      // find out if the email is already in the array
      var alreadyAttending = event.attendees.map(function(e) { return e.email }).indexOf(rb.email);

      // the email is already in event.attendees
      if (alreadyAttending >= 0) {
        res.send({
          success: false,
          message: 'You are already subscribed for this event!'
        });
      }
      // the email is NOT in event.attendees
      else {
        mailchimpWrapper.addUser({ f_name: rb.f_name, l_name: rb.l_name, email: rb.email }, function(err2, mcid) {
          console.log('mcid', mcid);
          console.log('mcWrapper error', err2);

          // NEED TO HANDLE CASE IF THE USER IS ALREADY ON MAILING LIST, BUT NOT SUBSCRIBER DOCUMENT
          if (err2) { console.log('mc errorrrr') } // handle error

          Subscriber.findOne({ email: rb.email }, function(err, sub) {
            var subscriber;
            var newSubEvent = { event_id: event._id, stripeToken: rb.stripeToken, amount: rb.registerOptions }

            if (sub) {
              subscriber = sub;
              subscriber.tshirt = rb.tShirtSize;
              subscriber.events_attending.push(newSubEvent);
            }

            else {
              subscriber = new Subscriber({
                mcid:             mcid,
                f_name:           rb.f_name,
                l_name:           rb.l_name,
                full_name:        rb.f_name + ' ' + rb.l_name,
                email:            rb.email,
                tshirt:           rb.tShirtSize,
                events_attending: [
                  newSubEvent
                ]
              })
            }

            // console.log('from eventRouter, found&modified new sub obj, or create new one',subscriber);

            console.log('rb.email ', rb.email);
            console.log('sub.email', subscriber.email)

            event.attendees.push({
              _id:         subscriber._id,
              email:       rb.email,
              message:     rb.message,
              full_name:   rb.f_name+' '+rb.l_name,
              tshirt:      rb.tShirtSize,
              stripeToken: rb.stripeToken
            })

            event.save(function(err3) {
              console.log('event saved with new .attendees entry');
              subscriber.save(function(err4) {
                if (err3 || err4) {
                  res.send({
                    success: false,
                    message: 'There was a problem saving either the event or subscriber'
                  });
                }

                var chargeInfo = {
                  amount: +rb.registerOptions,
                  currency: 'USD',
                  card: rb.stripeToken,
                  description: 'Event Registration Fee',
                  metadata: {
                    eventId: event.id,
                    subscriberId: subscriber.id
                  }
                }

                stripeWrapper.charges.create(chargeInfo, function(err, charge) {
                  if (err || !charge) {
                    res.send({
                      success: false,
                      message: 'There was an error submitting the Credit Card'
                    });
                  }

                  // console.log('charge success! evR', err, charge)
                  var dbChargeInfo = {
                    chid:      charge.id,
                    uid:       subscriber._id,
                    email:     rb.email,
                    full_name: rb.nameOnCard,
                    type:      charge.object,
                    category:  'eventSubscription',
                    refundUrl: charge.refunds.url,
                    status:    charge.status,
                    amount:    +charge.amount
                  }
                  var newDonation = new Donation(dbChargeInfo);
                  newDonation.save(function(err) {
                    if (err) {
                      // res.send({
                      //   success: false,
                      //   message: 'There was an error submitting the Credit Card'
                      // })
                      res.render('event_subscribed', {
                        success: false,
                        message: 'There was an error submitting the Credit Card',
                        full_name: dbChargeInfo.full_name
                      });
                    }
                    else {
                      // add the new donation obj to subscriber and save it
                      subscriber.donations.push({ donate_id: newDonation._id, amount: +charge.amount, type: 'eventSubscription' });
                      subscriber.save();
                      // res.send({
                      //   success: true,
                      //   message: 'successfully added new sub if doesnt exist, added it to event, charged card w/ stripe, create donation doc.'
                      // })
                      res.render('event_subscribed', {
                        success: true,
                        message: 'successfully added new sub if doesnt exist, added it to event, charged card w/ stripe, create donation doc.',
                        full_name: dbChargeInfo.full_name
                      });
                    }
                  });
                });
              });
            });
          });
        });
      }
    });
  })


// GET SINGLE EVENT
eventRouter.route('/:slug/edit')
  .get(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      if (err) console.log(err);
      console.log(ev)
      // take the html string and turn it into markdown
      var descriptionz = toMarkdown(ev.description);
      var timez        = toMarkdown(ev.time);
      ev.description   = descriptionz;
      ev.time          = timez;

      console.log(ev)
      res.render('edit_event', { event: ev });
    });
  });

// DELETE SINGLE EVENT
eventRouter.route('/:slug/delete')
  .get(function(req, res) {
    if (req.user) {
      EEvent.remove({ 'slug': req.params.slug }, function(err) {
        if (err) console.log(err);
        res.redirect('/admin')
      });
    } else {
      res.redirect('/login');
    }
  });

// REGISTER AN ATTENDEE
eventRouter.route('/:slug/register')
  .post(function(req, res) {
    var data = req.body;
    console.log(data)
  });


module.exports = eventRouter;