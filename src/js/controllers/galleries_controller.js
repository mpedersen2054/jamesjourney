
import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

jQueryBridget( 'masonry', Masonry, $ );
imagesLoaded.makeJQueryPlugin( $ );

export function imageGallery() {
  const $grid = $('#galleries .grid');
  $grid.imagesLoaded(function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    })
  })



}

// // once all the images are all loaded init masonry with options
// var $grid = $('#galleries .grid').imagesLoaded(function() {
//   $grid.masonry({
//     itemSelector:    '.grid-item',
//     percentPosition: true,
//     columnWidth:     '.grid-sizer',
//     gutter:          5
//   });
// });

// $('.fancybox').fancybox({
//   fitToView: true,
//   closeBtn:  true,
//   padding:   '60px 0px 30px 0px',
//   // width:  '60%',
//   // height: '60%',
//   maxWidth:  1200,
//   maxHeight: 560
// });