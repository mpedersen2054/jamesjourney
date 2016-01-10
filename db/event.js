var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var AttendeeSchema = new mongoose.Schema({
  f_name:    String,
  l_name:    String,
  full_name: String,
  email:     String,
  message:   String,
  created_at: { type: Date, default: Date.now }
});

var EventSchema = new mongoose.Schema({
  name:          { type: String },
  slug:          { type: String },
  date:          { type: Date, default: Date.now },
  formattedDate: { type: String },
  location:      { type: String },
  category:      { type: String, default: 'event' },
  description:   { type: String },
  attendees:     [AttendeeSchema]
});

EventSchema.pre('save', function(next) {
  var ev = this;
  ev.slug = slugify(ev.name);
  next();
});

// adds formatted date
EventSchema.pre('save', function(next) {
  var ev = this;
  var fd = ev.date.toDateString();
  ev.formattedDate = fd;
  next();
});

module.exports = mongoose.model('EEvent', EventSchema);