var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  f_name: String,
  l_name: String,
  email: String,
  added_on: { type: Date, default: Date.now },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);