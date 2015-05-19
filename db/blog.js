var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var BlogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  slug: { type: String }
});

BlogSchema.pre('save', function(next) {
  var blog = this;
  blog.slug = slugify(blog.title);
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);