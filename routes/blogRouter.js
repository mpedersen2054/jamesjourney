var blogRouter = require('express').Router();
var Blog = require('../db/blog');
var markdown = require('markdown').markdown;


blogRouter.route('/')
  .get(function(req, res) {
    Blog.find(function(err, blogs) {
      if(err) console.log(err);
      res.render('blogs', { blogs: blogs });
    })
  })


blogRouter.route('/new')
  .get(function(req, res) {
    if (req.user) {
      res.render('new_blog');
    } else {
      res.redirect('/login');
    }
  })
  .post(function(req, res) {
    if (req.user) {
      var data = req.body;
      var mdcontent = markdown.toHTML(data.content);
      data.content = mdcontent;
      console.log(data)
      var blog = new Blog(req.body);
      blog.save(function(err, blog) {
        res.redirect('/admin-page');
      })
    } else {
      res.redirect('/login');
    }
  })


blogRouter.route('/:slug')
  .get(function(req, res) {
    Blog.findOne({ 'slug': req.params.slug }, function(err, blog) {
      // error
      if(err) console.log(err);
      // if no blog
      if(!blog) {
        res.status(404).render('404', {
          message: 'Could not found that Blog.'
        });
      }
      // if blog found
      res.render('show_blog', { blog: blog });
    })
  })
  .put(function(req, res) {
    if (req.user) {
      Blog.findOne({ 'slug': req.params.slug }, function(err, blog) {
        if(err) console.log(err);
        if(!blog) {
          res.status(404).render('404', {
            message: 'Could not find that Blog.'
          });
        }

        blog.coverImage = req.body.coverImage;
        blog.title      = req.body.title;
        blog.subTitle   = req.body.subTitle;
        blog.author     = req.body.author;
        blog.content    = req.body.content;

        blog.save(function(err) {
          if(err) console.log(err);
          res.redirect('/admin-page');
        });
      })

    } else {
      res.redirect('/login')
    }
  })
blogRouter.route('/:slug/edit')
  .get(function(req, res) {
    if (req.user) {
      Blog.findOne({ 'slug': req.params.slug }, function(err, blog) {
        if(err) console.log(err);
        if(!blog) {
          res.status(404).render('404', {
            message: 'Could not found that Blog.'
          });
        }
        res.render('edit_blog', { blog: blog });
      })
    } else {
      res.redirect('/login')
    }
  })
blogRouter.route('/:slug/delete')
  .get(function(req, res) {
    if (req.user) {
      Blog.remove({ 'slug': req.params.slug }, function(err) {
        if(err) console.log(err);
        res.redirect('/admin-page')
      })
    } else {
      res.redirect('/login')
    }
  })

module.exports = blogRouter;