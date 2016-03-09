var subscribersRouter = require('express').Router();
var mcapi             = require('mailchimp-api');
var request           = require('request');
var mc                = new mcapi.Mailchimp('a6eec20e3398ba1010f1243598ee34cb-us11');

subscribersRouter.route('/')
  .get(function(req, res) {
    request('https://us11.api.mailchimp.com/3.0/', {
      'headers': {
        'Authorization': 'apikey a6eec20e3398ba1010f1243598ee34cb-us11'
      }
    }, function(err, resp, body) {
      res.send(body)
    })
  })


module.exports = subscribersRouter;