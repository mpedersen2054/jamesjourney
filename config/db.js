
module.exports = function(mongoose) {
  mongoose.connect('mongodb://localhost/james');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() { console.log('~~ connected to mongodb ~~') });
}