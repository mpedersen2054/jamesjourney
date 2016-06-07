var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var AttendeeSchema = new mongoose.Schema({
  f_name:        String,
  l_name:        String,
  full_name:     String,
  email:         String,
  message:       String,
  mcid:          String,
  tshirt:        { type: String, default: 'L' },
  added_on:      { type: Date, default: Date.now },
  stripeToken:   String
});

var EventSchema = new mongoose.Schema({
  name:          { type: String },
  slug:          { type: String },
  date:          { type: Date, default: Date.now },
  time:          { type: String }, // Markdown
  updated_at:    { type: Date },
  formattedDate: { type: String },
  month:         { type: String },
  day:           { type: String },
  locationName:  { type: String },
  streetAddress: { type: String },
  cityState:     { type: String },
  zipCode:       { type: String },
  category:      { type: String, default: 'event' },
  description:   { type: String }, // Markdown
  attendees:     [AttendeeSchema],
  tshirtMap:     {
    none: Number,
    s: Number,
    m: Number,
    l: Number,
    xl: Number,
    totalShirts: Number
  }
});

EventSchema.pre('save', function(next) {
  var ev  = this;
  ev.slug = slugify(ev.name);
  next();
});

// adds formatted date
EventSchema.pre('save', function(next) {

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  var ev       = this;
  var fd       = ev.date.toDateString();
  var day      = ev.date.getDate();
  var monthNum = ev.date.getUTCMonth();
  var monthStr = months[monthNum];

  ev.formattedDate = fd;
  ev.day           = day;
  ev.month         = monthStr;

  next();
});

module.exports = mongoose.model('EEvent', EventSchema);