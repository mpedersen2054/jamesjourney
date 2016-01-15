var fs            = require('fs');
var slugify       = require('../lib/slugify');
var galleryRouter = require('express').Router();
var Gallery       = require('../db/gallery');
var s3fs          = require('s3fs');

var s3fsImpl = new s3fs('jamesbucket123', {
  accessKeyId: 'AKIAI5RTSCA4OXAPD6RA',
  secretAccessKey: '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'
});

// creates the bucket
s3fsImpl.create();

var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

// pass the multiparty middleware into every request
galleryRouter.use(multipartyMiddleware);

// pass in the file(s)
// if it is single file do it once
// if it is an array of files iterate over each one
function uploadFile(files, finished) {
  // true if array, false if !array
  var isMultiUpload = (files instanceof Array) ? true : false;

  // if single file
  if (!isMultiUpload) {
    var stream = fs.createReadStream(files.path);

    return s3fsImpl.writeFile(files.originalFilename, stream).then(function(a) {
      fs.unlink(files.path, function(err) {
        if (err) finished(err, null);
      });
      finished(null, a);
    })
  }
  // if multiple files
  else if (isMultiUpload) {
    // iterate over each array of each file object
    // upload each one to s3
    var results = [];
    files.forEach(function(file) {
      var stream = fs.createReadStream(file.path);

      return s3fsImpl.writeFile(file.originalFilename, stream).then(function(a) {
        fs.unlink(file.path, function(err) {
          if (err) finished(err, null);
        });
        results.push(a);
      });
    });
    // this will be empty array due to async
    finished(null, results);
  }
}


galleryRouter.route('/')
  .get(function(req, res) {
    Gallery
      .find()
      .sort({ dateAdded: -1 })
      .exec(function(err, images) {
        res.render('galleries', { images: images });
      });
  })


galleryRouter.route('/single-upload')

  .get(function(req, res) {
    res.render('gallery_single_upload');
  })

  .post(function(req, res) {
    var data = req.body;
    var file = req.files.fileUpload;

    uploadFile(file, function(err, resp) {
      console.log('upload successful!', resp);
    });

  })

galleryRouter.route('/multi-upload')
  .get(function(req, res) {
    res.render('gallery_multi_upload')
  })

  .post(function(req, res) {
    var files = req.files.fileUpload;

    uploadFile(files, function(err, resp) {
      if (!err) {
        var bucketUrl = 'https://s3.amazonaws.com/jamesbucket123/';
        var itemsProcessed = 0;
        var done = false;

        files.forEach(function(file, index, array) {
          var galleryObj = {
            image_url: bucketUrl + file.originalFilename.replace(' ', '+'),
            size: file.size,
            file_type: file.type
          }

          var newGal = new Gallery(galleryObj);

          newGal.save(function(err) {

            if (err) console.log(err);
            itemsProcessed++;

            // if the loop is over
            if (itemsProcessed === array.length) {
              res.redirect('/gallery/multi-upload');
            }

          });


        });
      } else {
        // if there was an error
        res.send('there was an error!');
      }
    });
  });

galleryRouter.route('/:slug')
  .get(function(req, res) {
    res.send('hello slug!')
  })


module.exports = galleryRouter;