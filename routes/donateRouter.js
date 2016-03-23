var donateRouter  = require('express').Router();
var stripeWrapper = require('../lib/stripeWrapper');
var Subscriber    = require('../db/subscribers');
var Donation      = require('../db/donation');

donateRouter.route('/')
  .get(function(req, res) {
    res.render('donate');
  })

  .post(function(req, res) {

    Subscriber.find({ email: req.body.emailAddress }, function(err, sub) {
      if (err) { console.log(err); }

      var subscriber;

      if (!sub.length) {
        // no sub found
        var splitName = req.body.nameOnCard.split(' ');
        var fName = splitName[0], lName = splitName[1];
        var subObj = {
          f_name: fName,
          l_name: lName,
          email: req.body.emailAddress
        }
        var newSub = new Subscriber(subObj);
        newSub.save(function(err) {
          if (err) { console.log('error!', err); }
          console.log('new zzubbb')
        })
      }

      var zub = sub || newSub;

      console.log(zub)
    })


    // var charge = {
    //   amount: 2000, // make dynamic
    //   currency: 'USD',
    //   card: req.body.stripeToken
    // }
    // stripeWrapper.charges.create(charge, function(err, charge) {
    //   if (err) { console.log(err) }
    //   console.log('successfully charged!', charge);
    // })
  })

module.exports = donateRouter;