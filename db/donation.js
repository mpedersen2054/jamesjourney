var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  f_name: String,
  l_name: String,
  full_name: String,
  email: String,
  added_on: { type: Date, default: Date.now },
  updated_on: { type: Date },
  // events_attending: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Donation', DonationSchema);