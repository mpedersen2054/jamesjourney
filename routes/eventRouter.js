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
      if (err || !ev) { return res.status(404).render('404') };
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
  });


// GET SINGLE EVENT
eventRouter.route('/:slug/edit')
  .get(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      if (err) console.log(err);
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

    // find the event by slug
    EEvent.findOne({ 'slug': data.slug }, function(err, ev) {
      if (err) { console.log(err); };
      if (ev) {
        // maps ev.attendees to return the email, then uses indexOf to see if the email
        // is in the ev.attendees array
        var pos = ev.attendees.map(function(e) { return e.email }).indexOf(data.email);

        if (pos >= 0) {
          // return and do nothing
          console.log('this is already in the array!');
          res.send({ success: false, message: 'You are already registered for this event.' });
        }
        else {
          console.log('not in array yet!');
          mailchimpWrapper.addUser(data, function(err2, resp) {
            if (err2 || resp.status === 400 || resp.title === 'Member Exists') {
              // user is on list, not subscribed
              console.log('already on list, not subscribed to event');

              Subscriber.findOne({ email: data.email }, function(err, sub) {
                if (err || !sub) { console.log('error!', err) }

                else {
                  // see if events id is already in sub.events_attending array
                  var pos2 = sub.events_attending.map(function(e) { return e._id }).indexOf(ev._id);

                  // if event in sub.events_attending not already in array
                  if (pos2 < 0) {
                    sub.events_attending.push(ev._id);
                    sub.save(function(err) {
                      if (err) { console.log(err) }
                      console.log('successfully added event to sub.events.attending');
                    })
                  }
                  ev.attendees.push({
                    _id: sub._id,
                    email: sub.email,
                    message: data.message,
                    f_name: data.f_name,
                    l_name: data.l_name,
                    full_name: data.f_name+' '+data.l_name
                  });
                  ev.save(function(err) {
                    if (err) { console.log(err) };
                    console.log('successfully saved ev.attendees');
                  });
                  res.send({ success: true, message: 'Successfully registered for event.' })
                }
              })
            }
            else {
              // sub not in list or subscribed to event
              console.log('hasnt subscribed, not on the list');
              // in the mailchimpWrapper it will create a new sub, so here
              // we just find it instead of creating a new one
              Subscriber.findOne({ email: resp.email }, function(err, sub) {
                if (err) { console.log('error!', err) }

                ev.attendees.push({
                  _id: sub._id,
                  email: sub.email,
                  message: data.message,
                  f_name: data.f_name,
                  l_name: data.l_name,
                  full_name: data.f_name+' '+data.l_name
                });

                sub.events_attending.push(ev._id);

                ev.save(function(err) {
                  if (err) { console.log(err) };
                  console.log('successfully saved ev.attendees');
                });
                sub.save(function(err) {
                  if (err) { console.log(err) }
                  console.log('successfully added event to sub.events.attending');
                });

                res.send({ success: true, message: 'Successfully registered for event.' });
              });
            }
          });
        }
      }
    });
  });


module.exports = eventRouter;