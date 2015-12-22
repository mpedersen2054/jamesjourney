var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var BlogSchema = new mongoose.Schema({
  coverImage:     { type: String },
  title:          { type: String, unique: true },
  isFeatured:     { type: Boolean, default: false },
  dateAdded:      { type: Date, default: Date.now },
  formattedDate:  { type: String },
  slug:           { type: String },
  author:         { type: String },
  tags:           [ String ],
  contentPreview: { type: String }, // 360 chars
  content:        { type: String },
  social:         [ String ]
});

// adds formatted date
BlogSchema.pre('save', function(next) {
  var blog = this;
  var fd = blog.dateAdded.toDateString();
  blog.formattedDate = fd;
  next();
});

// adds slug
BlogSchema.pre('save', function(next) {
  var blog = this;
  blog.slug = slugify(blog.title);
  next();
});

// adds caption preview
BlogSchema.pre('save', function(next) {
  var blog = this;
  var contPrev = blog.content.slice(0, 360);
  blog.contentPreview = contPrev + '[...]';
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);