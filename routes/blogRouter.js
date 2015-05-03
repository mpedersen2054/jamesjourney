var blogRouter = require('express').Router();
var Blog = require('../db/schemas.js').Blog;

blogRouter.route('/')
  .get(function(req, res) {
    Blog.find(function(err, blogs) {
      if(err) console.log(err);
      res.render('blogs', { blogs: blogs });
    })
  })

  .post(function(req, res) {
    var blog = new Blog(req.body);
    blog.save(function(err, blog) {
      res.redirect('/blog')
    })
  })

blogRouter.route('/:id')
  .get(function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
      if(err) console.log(err);
      res.render('show_blog', { blog: blog });
    })
  })


module.exports = blogRouter;