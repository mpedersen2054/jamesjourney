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

  $('#navbar-wrapper').affix({})


  windowFix();
  overlayMenu();
});