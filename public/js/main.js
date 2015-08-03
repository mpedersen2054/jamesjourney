$(function() {

  function windowFix() {
    var titles = $('.title, .subtitle');
    titles.widowFix();
  }


  function overlayMenu() {
    var openRight = $('.open-right');
    var closeAny  = $('.close-any');
    var menuBtn   = $('.menu-btn');

    var controller = new slidebars();
    controller.init()

    openRight.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menuBtn.addClass('right-margin');
      controller.open( 'sb-1' );
    });

    $( '.close-any' ).on( 'click', function (e) {
      if ( controller.active( 'slidebar' ) ) {
        e.preventDefault();
        e.stopPropagation();
        menuBtn.removeClass('right-margin')
        controller.close();
      }
    });
  }

  function subscriptionFormSubmit() {
    $('#mc-embedded-subscribe-form').on('submit', function(e) {
      e.preventDefault();
      $('.email-success').append('<div class="alert alert-success" role="alert"><b>Success!</b> Now check your email for a confirmation.</div>')
    })
  }

  function blogPreviewBG() {
    var blogs = $('.preview .blog');
    $.each(blogs, function(i, blog) {
      var b = $(this);
      var bgImage = b.find('.image').data('image');
      var styles = {
        backgroundImage: 'url(' + bgImage + ')',
        opacity: '0.75'
      }
      console.log(styles)
      b.css(styles)
    })
  }

  windowFix();
  overlayMenu();
  subscriptionFormSubmit();
  blogPreviewBG();
});