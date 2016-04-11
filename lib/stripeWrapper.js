var config = require('../config');

// test card number: 4242 4242 4242 4242 (visa)
var testSecretKey = config.stripeSkTest;
var testPublishableKey = config.stripePkTest;

var stripe = require('stripe')(testSecretKey);

module.exports = stripe;