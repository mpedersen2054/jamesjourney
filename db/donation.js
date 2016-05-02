var mongoose = require('mongoose');

var DonationSchema = new mongoose.Schema({
  uid:        { type: mongoose.Schema.Types.ObjectId},
  chid:       String,
  type:       String,
  full_name:  String,
  amount:     Number,
  email:      String,
  refundUrl:  String,
  status:     String,
  added_on:   { type: Date, default: Date.now },
  updated_on: { type: Date },
});

module.exports = mongoose.model('Donation', DonationSchema);