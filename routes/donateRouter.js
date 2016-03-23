var donateRouter = require('express').Router();
var stripeWrapper = require('../lib/stripeWrapper');

donateRouter.route('/')
  .get(function(req, res) {
    res.render('donate');
  })

  .post(function(req, res) {
    console.log('hello post donate')
    console.log(req.body)
    var charge = {
      // change to be dynamic
      amount: 2000,
      currency: 'USD',
      card: req.body.stripeToken
    }
    stripeWrapper.charges.create(charge, function(err, charge) {
      if (err) { console.log(err) }
      console.log('successfully charged!', charge);
    })
    // stripeWrapper.customers.create({
    //   email: req.body.emailAddress
    // }).then(function(customer) {
    //   return stripeWrapper.charges.create({
    //     amount: 1600,
    //     currency: 'usd',
    //     customer: customer.id
    //   });
    // }).then(function(charge) {
    //   console.log('charge successful', charge);
    // }).catch(function(err) {
    //   console.log('there was an error', err);
    // });
  })

module.exports = donateRouter;