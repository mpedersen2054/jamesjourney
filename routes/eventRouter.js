var eventRouter      = require('express').Router();
var EEvent           = require('../db/event');
var mailchimpWrapper = require('../lib/mailchimpWrapper');
var Subscriber       = require('../db/subscribers');

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
    var data = req.body;
    var date = new Date(data.date);
    data.date = date;
    var ev = new EEvent(data);
    ev.save(function(err) {
      if (err) return console.log(err);
      return res.redirect('/admin')
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
      var body = req.body;
      console.log(body)
      ev.name = body.name;
      ev.date = new Date(body.date);
      ev.location = body.location;
      ev.description = body.description;

      ev.save(function(err) {
        if (err) console.log(err);
        res.redirect('/admin');
      });
    });
  })
  // register subscriber to event, create donation
  .post(function(req, res) {
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

          console.log('mcid', mcid)
          console.log('mcWrapper error', err2);

          // NEED TO HANDLE CASE IF THE USER IS ALREADY ON MAILING LIST, BUT NOT SUBSCRIBER DOCUMENT
          if (err2) { console.log('mc errorrrr') } // handle error

          Subscriber.findOne({ email: rb.email }, function(err, sub) {
            var subscriber;
            var newSubEvent = { event_id: event._id, stripeToken: rb.stripeToken }

            if (subscriber) {
              subscriber = sub;
              subscriber.mcid = mcid;
              subscriber.events_attending.push(newSubEvent);
            }

            else {
              subscriber = new Subscriber({
                mcid: mcid,
                f_name: rb.f_name,
                l_name: rb.l_name,
                full_name: rb.f_name + ' ' + rb.l_name,
                email: rb.email,
                events_attending: [
                  newSubEvent
                ]
              })
            }

            console.log('from eventRouter, found&modified new sub obj, or create new one',subscriber);

            event.attendees.push({
              _id:         subscriber._id,
              email:       subscriber.email,
              message:     rb.message,
              f_name:      rb.f_name,
              l_name:      rb.l_name,
              full_name:   rb.f_name+' '+rb.l_name,
              tShirtSize:  rb.tshirt,
              stripeToken: rb.stripeToken
            })

            event.save(function(err3) {
              if (err3) { console.log('err3', err3); }
              console.log('event saved with new .attendees entry');

              subscriber.save(function(err4) {
                if (err4) { console.log('err4', err4); }
                console.log('subscriber saved with new .events_attending')

                res.send({
                  success: true,
                  message: 'Successfully added registered for event'
                })
              })
            });
          })

          // var alreadyInSubAttendingArr = subscriber.events_attending.map(function(e) { return e._id }).indexOf(event._id);

          // if the event is NOT in sub.events_attending
          // if (alreadyInSubAttendingArr < 0) {
          //   sub.events_attending.push({ event_id: event._id, stripeToken: rb.stripeToken });
          // }
          // add the email to events.attendees

        })
      }
    })
  })


// GET SINGLE EVENT
eventRouter.route('/:slug/edit')
  .get(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      if (err) console.log(err);
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

    // if (!req.body.f_name || !req.body.l_name || ! req.body.email) {
    //   return res.send({ success: false, message: 'Please enter infomation into all of the fields.' })
    // }

    // find the event by slug
  //   EEvent.findOne({ 'slug': data.slug }, function(err, ev) {
  //     if (err) { console.log(err); };
  //     if (ev) {
  //       // maps ev.attendees to return the email, then uses indexOf to see if the email
  //       // is in the ev.attendees array
  //       var pos = ev.attendees.map(function(e) { return e.email }).indexOf(data.email);

  //       if (pos >= 0) {
  //         // return and do nothing
  //         console.log('this is already in the array!');
  //         return res.send({ success: false, message: 'You are already registered for this event.' });
  //       }
  //       else {
  //         console.log('not in array yet!');
  //         mailchimpWrapper.addUser(data, function(err2, resp) {
  //           if (err2 || resp.status === 400 || resp.title === 'Member Exists') {
  //             // user is on list, not subscribed
  //             console.log('already on list, not subscribed to event');

  //             Subscriber.findOne({ email: data.email }, function(err, sub) {
  //               if (err || !sub) { console.log('error!', err) }

  //               else {
  //                 // see if events id is already in sub.events_attending array
  //                 var pos2 = sub.events_attending.map(function(e) { return e._id }).indexOf(ev._id);

  //                 // if event in sub.events_attending not already in array
  //                 if (pos2 < 0) {
  //                   sub.events_attending.push(ev._id);
  //                   sub.save(function(err) {
  //                     if (err) { console.log(err) }
  //                     console.log('successfully added event to sub.events.attending');
  //                   })
  //                 }
  //                 ev.attendees.push({
  //                   _id:        sub._id,
  //                   email:      sub.email,
  //                   message:    data.message,
  //                   f_name:     data.f_name,
  //                   l_name:     data.l_name,
  //                   full_name:  data.f_name+' '+data.l_name,
  //                   tShirtSize: data.tshirt
  //                 });
  //                 ev.save(function(err) {
  //                   if (err) { console.log(err) };
  //                   console.log('successfully saved ev.attendees');
  //                 });
  //                 res.send({ success: true, message: 'Successfully registered for event.' })
  //               }
  //             })
  //           }
  //           else {
  //             // sub not in list or subscribed to event
  //             console.log('hasnt subscribed, not on the list');
  //             // in the mailchimpWrapper it will create a new sub, so here
  //             // we just find it instead of creating a new one
  //             Subscriber.findOne({ email: resp.email }, function(err, sub) {
  //               if (err) { console.log('error!', err) }

  //               ev.attendees.push({
  //                 _id:       sub._id,
  //                 email:     sub.email,
  //                 message:   data.message,
  //                 f_name:    data.f_name,
  //                 l_name:    data.l_name,
  //                 full_name: data.f_name+' '+data.l_name,
  //                 tshirt: data.tshirt
  //               });

  //               sub.events_attending.push(ev._id);

  //               ev.save(function(err) {
  //                 if (err) { console.log(err) };
  //                 console.log('successfully saved ev.attendees');
  //               });
  //               sub.save(function(err) {
  //                 if (err) { console.log(err) }
  //                 console.log('successfully added event to sub.events.attending');
  //               });

  //               res.send({ success: true, message: 'Successfully registered for event.' });
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  });


module.exports = eventRouter;