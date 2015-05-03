var mongoose = require('mongoose');
var slugify = require('../lib/slugify.js');

var BlogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  slug: { type: String }
});

var GallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String }
});

var MessageSchema = new mongoose.Schema({
  content: { type: String }
});

BlogSchema.pre('save', function(next) {
  var blog = this;
  blog.slug = slugify(blog.title);
  next();
});


exports.Blog = mongoose.model('Blog', BlogSchema);
exports.Gallery = mongoose.model('Gallery', GallerySchema);
exports.Message = mongoose.model('Message', MessageSchema);
