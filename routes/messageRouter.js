var messageRouter = require('express').Router();

messageRouter.route('/')
  .get(function(req, res) {
    res.json('messages')
  })


module.exports = messageRouter;