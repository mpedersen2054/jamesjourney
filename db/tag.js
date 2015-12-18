var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  name: { type: String }
});

module.exports = mongoose.model('Tag', TagSchema);