var Blog = require('../db/blog');

var findFeaturedBlogs = function(lim, callback) {
  var limit = lim ? lim : {}
  Blog
    .find({})
    .limit(limit)
    .sort({dateAdded: -1})
    .exec(function(err, fps) {
      callback(null, fps);
    })
}

module.exports = {
  findFeaturedBlogs: findFeaturedBlogs
};