var Blog = require('../db/blog');

var findFeaturedBlogs = function(lim, callback) {
  Blog
    .find({})
    .limit(lim)
    .sort({dateAdded: -1})
    .exec(function(err, fps) {
      callback(null, fps);
    })
}

module.exports = {
  findFeaturedBlogs: findFeaturedBlogs
};