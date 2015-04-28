var app = app || {};

app.Blog = Backbone.Model.extend({

  defaults: {
    title: 'no title provided.',
    content: 'no content provided.'
  }

})