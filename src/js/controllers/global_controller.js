
import $ from 'jquery';

global.jQuery = $;
window.jQuery = $;

const $navbar     = $('header');
const $window     = $(window);
const $logo       = $('#header-logo-link');
const $menu       = $('#header-menu-link');
const $navbarBtn  = $('a#header-menu-link');
const $mainCont   = $('.main-cont');
const $siteHeader = $('header.site-header');
const $navMenu    = $('#nav-menu');

/*
makes navbar transparent when at top of page,
opaque when not at top of page
 */
export function navbar() {
  $window.on('scroll change', function() {
    // console.log($(this).scrollTop())
    if ($(this).scrollTop() > 20) {
      $navbar.addClass('with-bg');
      $menu.css({ color: '#ddd' })
      $logo.css({ opacity: '0.8', height: '40px' });
    } else {
      $navbar.removeClass('with-bg');
      $menu.css({ color: '#999' })
      $logo.css({ opacity: '0', height: '60px' })
    }
  });
}


/*
handles the animation for pushing all content
-300px left and the navMenu +300px width
 */
export function pushMenu() {
  // menu link clicked
  $navbarBtn.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);

    // if main-cont has class .push-right then remove it
    if ($mainCont.hasClass('push-right')) {
      $this.css({ color: '#999' });
      $navMenu
        .animate({ width: '0px' }, 200)
      $mainCont
        .removeClass('push-right')
        .animate({ left: '0px' }, 200)
    }
    // add it if there isnt .push-right
    else {
      if (!$siteHeader.hasClass('with-bg')) {
        console.log('no bg')
        $this.css({ color: '#4dafcf' })
      }
      else {
        $this.css({ 'color': '#fff' })
      }

      $navMenu
        .show()
        .animate({ width: '300px' }, 200)
      $mainCont
        .addClass('push-right')
        .animate({ left: '-300px' }, 200)
    }
  });
}