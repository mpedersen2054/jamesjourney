var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var GallerySchema = new mongoose.Schema({
  title: { type: String },
  image_url: { type: String },
  blog_post: [ mongoose.Schema.Types.ObjectId ],
  category: [ mongoose.Schema.Types.ObjectId ]
});

module.exports = mongoose.model('Gallery', GallerySchema);