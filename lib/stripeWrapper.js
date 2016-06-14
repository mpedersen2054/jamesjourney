var config = require('../config');

// test card number: 4242 4242 4242 4242 (visa)

// var testSecretKey      = config.stripeSkTest;
// var testPublishableKey = config.stripePkTest;
// var stripe             = require('stripe')(testSecretKey);

var liveSecretKey      = config.stripeSkLive;
var livePublishableKey = config.stripePkLive;
var stripe             = require('stripe')(liveSecretKey);

module.exports = stripe;