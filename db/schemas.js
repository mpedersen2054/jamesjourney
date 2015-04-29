var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String }
});

var GallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String }
});

var MessageSchema = new mongoose.Schema({
  content: { type: String }
});


exports.Blog = mongoose.model('Blog', BlogSchema);
exports.Gallery = mongoose.model('Gallery', GallerySchema);
exports.Message = mongoose.model('Message', MessageSchema);

