var galleryRouter = require('express').Router();
var Gallery = require('../db/gallery.js');

galleryRouter.route('/')
  .get(function(req, res) {
    Gallery.find(function(err, gals) {
      if(err) console.log(err);
      res.render('galleries', { gals: gals });
    })
  })

galleryRouter.route('/:id')
  .get(function(req, res) {
    Gallery.findById(req.params.id, function(err, gal) {
      if(err) console.log(err);
      res.render('show_gallery', { gal: gal });
    })
  })


module.exports = galleryRouter;