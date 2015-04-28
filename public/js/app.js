var app = app || {};

$(function() {
  console.log('initializing frontend!');
  var blogs = [
    { title: 'the first title!', content: 'the first content!' },
    { title: 'the second title!', content: 'the second content!' },
    { title: 'the third title!', content: 'the third content!' }
  ];
  new app.BlogCollectionView(blogs);
})

