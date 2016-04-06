var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  mcid:             String,
  tshirt_size:      String,
  f_name:           String,
  l_name:           String,
  full_name:        String,
  email:            String,
  tshirt:           { type: String, default: 'L' },
  added_on:         { type: Date, default: Date.now },
  updated_on:       { type: Date },
  events_attending: [mongoose.Schema.Types.ObjectId],
  donations:        [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);