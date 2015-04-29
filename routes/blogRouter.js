var blogRouter = require('express').Router();
var Blog = require('../db/schemas.js').Blog;

blogRouter.route('/')
  .get(function(req, res) {
    Blog.find(function(err, blogs) {
      if(err) console.log(err);
      res.json(blogs);
    })
  })

blogRouter.route('/:id')
  .get(function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
      if(err) console.log(err);
      res.json(blog);
    })
  })


module.exports = blogRouter;