var messageRouter = require('express').Router();
var Message = require('../db/schemas.js').Message;

messageRouter.route('/')
  .get(function(req, res) {
    Message.find(function(err, msgs) {
      if(err) console.log(err);
      res.json(msgs);
    })
  })


module.exports = messageRouter;