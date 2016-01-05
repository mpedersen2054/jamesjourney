var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var EventSchema = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  date: { type: Date, default: Date.now },
  formattedDate: { type: String },
  location: { type: String },
  category: { type: String },
  description: { type: String },
  atendees: [{
    f_name: String,
    l_name: String,
    email: String,
    message: String
  }]
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