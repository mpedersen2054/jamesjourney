var User = require('../db/user');
var userRouter = require('express').Router();

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    next();
  }
}

userRouter.route('/')
  .get(requireAuth, function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    })
  })


userRouter.route('/new')
  .get(requireAuth, function(req, res) {
    res.render('new_user');
  })

  .post(requireAuth, function(req, res) {
    var user = new User(req.body);
    user.save(function(err, user) {
      res.redirect('/users');
    })
  })

userRouter.route('/logout')
  .get(function(req, res, next) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) { return next(err); }
      return res.render('login', { authenticated: req.isAuthenticated() })
    });
  })


// userRouter.route('/:username')

module.exports = userRouter;