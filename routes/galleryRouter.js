var fs            = require('fs')
var galleryRouter = require('express').Router();
var Gallery       = require('../db/gallery.js');
var s3fs          = require('s3fs');


var s3fsImpl = new s3fs('jamestestbucket123', {
  accessKeyId: 'AKIAI5RTSCA4OXAPD6RA',
  secretAccessKey: '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'
});

// creates the bucket
s3fsImpl.create();

var multiparty = require('connect-multiparty');
var mutlipartyMiddleware = multiparty();

galleryRouter.use(mutlipartyMiddleware);


galleryRouter.route('/')
  .get(function(req, res) {
    // var bb = s3fsImpl.getPath('blog photos.jpg')

    s3fsImpl.listContents('/', '/').then(function(data) {
      console.log(data)
    })

  })

galleryRouter.route('/:id')

galleryRouter.route('/new')

  .get(function(req, res) {
    res.render('new_image');
  })


  .post(function(req, res) {

    var data = req.body;
    var file = req.files.fileUpload;

    var stream = fs.createReadStream(file.path);

    return s3fsImpl.writeFile(file.originalFilename, stream).then(function(a) {
      fs.unlink(file.path, function(err) {
        if (err) console.error(err);
      });
      res.redirect('/gallery');
    })
  })


module.exports = galleryRouter;