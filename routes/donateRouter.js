var donateRouter = require('express').Router();

donateRouter.route('/')
  .get(function(req, res) {
    res.render('donate');
  })

  .post(function(req, res) {
    console.log('hello post donate')
  })

module.exports = donateRouter;