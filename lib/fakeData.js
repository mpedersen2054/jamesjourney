// var faker   = require('faker');
// var Blog    = require('../db/blog');
// var request = require('request');

// var fakeData = function() {
//   Blog.find({}, function(err, blogs) {
//     if (err) throw err;
//     if (blogs.length == 0) createMockData();
//   })
// }

// var createMockData = function() {
//   for (var i = 0; i < 10; i++) {
//     var data = {
//       coverImage: '',
//       title: '',
//       subTitle: '',
//       isFeatured: false,
//       dateAdded: '',

//     }
//     // console.log(faker.lorem.paragraphs())
//     console.log(faker.lorem.sentence())


//     request.post('http://localhost:3000/blog/new', {form:{key:'value'}})
//   }
// }


// module.exports = fakeData;
