var galleryRouter = require('express').Router();
var Gallery = require('../db/schemas.js').Gallery;

galleryRouter.route('/')
  .get(function(req, res) {
    Gallery.find(function(err, gals) {
      if(err) console.log(err);
      res.json(gals);
    })
  })

galleryRouter.route('/:id')
  .get(function(req, res) {
    Gallery.findById(req.params.id, function(err, gal) {
      if(err) console.log(err);
      res.json(gal)
    })
  })


module.exports = galleryRouter;