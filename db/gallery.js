var mongoose = require('mongoose');
var slugify  = require('../lib/slugify.js');

var GallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Gallery', GallerySchema);