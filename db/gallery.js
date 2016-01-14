var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var GallerySchema = new mongoose.Schema({
  name:      { type: String, default: 'No Title Specified.' },
  dateAdded: { type: Date, default: Date.now },
  image_url: { type: String },
  file_type: { type: String },
  size:      { type: Number },
  tags:      [String]
});

module.exports = mongoose.model('Gallery', GallerySchema);