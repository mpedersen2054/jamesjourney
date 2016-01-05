var eventRouter = require('express').Router();
var EEvent = require('../db/event');

eventRouter.route('/')
  .get(function(req, res) {
    EEvent.find(function(err, events) {
      res.render('events', { events: events })
    })
  })

eventRouter.route('/new')
  .get(function(req, res) {
    res.render('new_event');
  })
  .post(function(req, res) {
    var data = req.body;
    var ev = new EEvent(data);
    ev.save(function(err) {
      if (err) return console.log(err);
      return res.send('saved!');
    })
  })




eventRouter.route('/:slug')
  .get(function(req, res) {
    EEvent.findOne({ 'slug': req.params.slug }, function(err, ev) {
      res.render('show_event', { event: ev });
    })
  })


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
        ev.attendees.push(data);
        ev.save(function(err) {
          if (err) return console.log(err);
          return res.send(true)
        })
      }
    })
  })


module.exports = eventRouter;