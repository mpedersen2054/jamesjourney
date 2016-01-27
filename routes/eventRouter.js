var eventRouter = require('express').Router();
var EEvent      = require('../db/event');

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
      res.render('show_event', { event: ev });
    });
  })
  // UPDATE EVENT
  .put(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      var body = req.body;
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
      if (err) throw err;
      if (ev) {
        // delete slug, not needded
        delete data.slug;
        // push the new attendee into the
        // array of attendees subdocs
        data.created_at = new Date();
        ev.attendees.push(data);
        ev.save(function(err) {
          if (err) return console.log(err);
          return res.send(true);
        });
      }
    });
  });


module.exports = eventRouter;