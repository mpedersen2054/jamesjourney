var Blog = require('../db/blog');

var findFeaturedBlogs = function(callback) {
  Blog
    .find({ isFeatured: true })
    .limit(4)
    .exec(function(err, fps) {
      callback(null, fps);
    })
}

module.exports = {
  findFeatured: findFeaturedBlogs
};