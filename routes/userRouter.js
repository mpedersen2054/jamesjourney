var User = require('./db/user');
app.get('/users', function(req, res) {
  if (req.user) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  } else {
    res.redirect('/login')
  }
});

app.get('/users/new', function(req, res) {
  // if (req.user) {
    res.render('new_user');
  // } else {
    // res.redirect('/login');
  }
})

// REMOVE ONCE ALL USERS ADDED
app.post('/users/new', function(req, res) {
  console.log(req.body)
  // if (req.user) {
  var user = new User(req.body);
  user.save(function(err, user) {
    res.redirect('/users')
  })
  // } else {
    // res.redirect('/login')
  }
})