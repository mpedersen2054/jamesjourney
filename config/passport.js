var passportLocal  = require('passport-local');

module.exports = function(app, passport) {
  var User = require('../db/user');
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new passportLocal.Strategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if(err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
      done(err, user);
    });
  });
}