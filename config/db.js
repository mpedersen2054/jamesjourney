var config = require('../config');

module.exports = function(mongoose) {
  mongoose.connect(config.dbUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() { console.log('~~ connected to mongodb ~~') });
}