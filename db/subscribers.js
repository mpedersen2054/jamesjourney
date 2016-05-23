var mongoose = require('mongoose');

var SubscriberSchema = new mongoose.Schema({
  mcid:             String,
  f_name:           String,
  l_name:           String,
  full_name:        String,
  email:            String,
  tshirt:           { type: String, default: 'L' },
  added_on:         { type: Date, default: Date.now },
  updated_on:       { type: Date },
  events_attending: [
    {
      event_id:    mongoose.Schema.Types.ObjectId,
      stripeToken: String,
      amount:      String
    }
  ],
  donations: [
    {
      donate_id: mongoose.Schema.Types.ObjectId,
      category:  String,
      amount:    String
    }
  ]
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);