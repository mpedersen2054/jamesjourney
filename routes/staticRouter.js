var staticRouter = require('express').Router();
var async = require('async');
var schema = require('../db/schemas.js');
var Blog = schema.Blog, Gallery = schema.Gallery, Message = schema.Message;


staticRouter.route('/')
  .get(function(req, res) {
    // make queries async, returning the callbck when all are complete
    async.parallel([

      function(cb) {
        Blog.find(function(err, blogs) { cb(null, blogs) });
      },

      function(cb) {
        Gallery.find(function(err, gals) { cb(null, gals) });
      }

    ], function(err, results) {
      if (err) console.log(err);
      var blogs = results[0], gals = results[1];
      res.render('index', { blogs: blogs, gals: gals });
    })
  })

staticRouter.route('/login')
  .get(function(req, res) {
    res.render('login')
  })

module.exports = staticRouter;