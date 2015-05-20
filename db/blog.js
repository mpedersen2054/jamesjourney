var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var BlogSchema = new mongoose.Schema({
  coverImage: { type: String },
  title:      { type: String, unique: true },
  subTitle:   { type: String },
  dateAdded:  { type: Date, default: Date.now },
  slug:       { type: String },
  author:     { type: String },
  content:    { type: String },
  social:     [ String ]
});

BlogSchema.pre('save', function(next) {
  var blog = this;
  blog.slug = slugify(blog.title);
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);