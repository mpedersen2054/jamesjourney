
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

jQueryBridget( 'masonry', Masonry, $ );
imagesLoaded.makeJQueryPlugin( $ );

export function imageGallery() {

  $('#chocolat-parent').Chocolat({
    imageSize: 'cover',
    loop: true
  });

  const $grid = $('#galleries .grid');
  $grid.imagesLoaded(function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });
}
