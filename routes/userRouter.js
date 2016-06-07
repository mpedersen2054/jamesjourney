var User = require('../db/user');
var userRouter = require('express').Router();

userRouter.route('/')
  .get(function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    })
  })


userRouter.route('/new')
  .get(function(req, res) {
    res.render('new_user');
  })

  .post(function(req, res) {
    var user = new User(req.body);
    user.save(function(err, user) {
      res.redirect('/users');
    })
  })


// userRouter.route('/:username')

module.exports = userRouter;