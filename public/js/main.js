$(function() {

  var controller = new slidebars();
  controller.init()

  $( '.open-right' ).on( 'click', function ( event ) {
    event.preventDefault();
    event.stopPropagation();
    controller.open( 'sb-1' );
  });

  $( '.close-right' ).on( 'click', function ( event ) {
    event.preventDefault();
    event.stopPropagation();
    controller.close( 'sb-1' );
  });

  $( '.close-any' ).on( 'click', function ( event ) {
    if ( controller.active( 'slidebar' ) ) {
      event.preventDefault();
      event.stopPropagation();
      controller.close();
    }
  });





  function windowFix() {
    var titles = $('.title, .subtitle');
    titles.widowFix();
  }

  windowFix();

})