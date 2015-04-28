var app = app || {};

app.BlogView = Backbone.View.extend({
  tagName: 'div',
  className: 'blogContainer',
  tmpl: _.template( $('#blog-template').html() ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.tmpl(this.model.attributes));
    return this;
  }
})



app.BlogCollectionView = Backbone.View.extend({
  el: '#blogs',

  initialize: function(initialBlogs) {
    this.collection = new app.BlogCollection(initialBlogs);
    this.render();
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderBlog(item);
    }, this);
    return this;
  },

  renderBlog: function(item) {
    var blogView = new app.BlogView({ model: item });
    this.$el.append(blogView.render.el);
  }
})