var blogRouter = require('express').Router();
var Blog       = require('../db/blog');
var Featured   = require('../lib/queries');
var markdown   = require('markdown').markdown;


blogRouter.route('/')

  .get(function(req, res) {

    // distinct returns list of all unique tags
    Blog.distinct('tags', function(err, dist) {
      // http://localhost:3000/blog?tags=star%20wars
      if ('tags' in req.query) {
        Blog.find({ $query: {'tags': req.query.tags}, $orderBy: { 'dateAdded': -1 } }, function(err, blogs) {
          if(err) console.log(err);
          res.render('blogs', { blogs: blogs, dist_tags: dist });
        })
      }

      // if no tags query
      else {
        Blog
          .find()
          .sort({dateAdded: -1})
          .exec(function(err, blogs) {
          if(err) console.log(err);
          res.render('blogs', { blogs: blogs, dist_tags: dist });
        })
      }

    });

  });


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
      // returns array of tags
      data.tags = data.tags.split(',').map(function(tag) {
        return tag.trim();
      });

      data.author = req.user;

      // uses markdown module to turn the MD into html
      var content = markdown.toHTML(data.content);
      var contentPreview = markdown.toHTML(data.contentPreview);
      data.content = content;
      data.contentPreview = contentPreview;

      var blog = new Blog(data);

      blog.save(function(err) {
        if(err) return console.log(err);
        return res.redirect('/admin-page');
      })

    } else {
      res.redirect('/login');
    }
  })


blogRouter.route('/:slug')
  .get(function(req, res) {
    Blog.findOne({ 'slug': req.params.slug }, function(err, blog) {
      if(err) console.log(err);
      Featured.findFeatured(function(err, featured) {
        if(err) console.log(err);
        if (!featured || !blog) {
          res.render('404', { message: 'There was an error loading featured posts' });
        }
        res.render('show_blog', {
          blog: blog,
          featured: featured,
          disqus: {
            url: 'http://localhost:3000'+'/blog/'+req.params.slug,
            identifier: '/blog/'+req.params.slug
          }
        })
      })
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
        blog.tags       = req.body.tags.split(',').map(function(tag) {
          return tag.trim();
        });
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