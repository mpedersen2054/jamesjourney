var eventRouter = require('express').Router();
var EEvent = require('../db/event');

eventRouter.route('/')
  .get(function(req, res) {
    EEvent.find(function(err, events) {
      res.render('events', { events: events })
    })
  })

eventRouter.route('/new')
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


module.exports = eventRouter;