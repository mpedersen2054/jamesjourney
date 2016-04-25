(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _indexPage = require('./pages/indexPage');

var _indexPage2 = _interopRequireDefault(_indexPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _indexPage2.default)('matt');

var App = App || {};

Stripe.setPublishableKey('pk_test_vdduCMCVf723Y1E0HpG43j32');

// PAGE >>> not specified
App.typer = function (elem) {
  $(elem).typed({
    strings: ['support our cause.', 'recieve regular updates on events.', 'help make the world a better place.'],
    typeSpeed: 0,
    loop: true,
    backDelay: 3000,
    backSpeed: -5,
    showCursor: false
  });
};

// PAGE >>> new_blog, edit_blog
App.tokenField = function (elem) {
  $(elem).tokenfield({
    // autocomplete: {
    //   source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
    //   delay: 100
    // },
    showAutocompleteOnFocus: true
  });
};

// PAGE >>> new_blog, edit_blog
App.contentPreviewCount = function () {
  var currentNum;
  var maxNum = 600;
  var $contentPreview = $('.content-preview-input');
  var $currentCount = $('.current-count');
  var $maxNum = $('.current-count__max');
  var $currentNum = $('.current-count__current');

  $contentPreview.on('keyup', function () {
    currentNum = $contentPreview.val().length;
    $currentNum.text(currentNum);
  });
};

// PAGE >>> blogs, show_blog
App.scrollFollow = function (elem) {
  $(elem).simpleScrollFollow({
    limit_elem: '.on-left'
  });
};

// PAGE >>> all pages
App.navbar = function () {
  var $navbar = $('header');
  var $window = $(window);
  var $logo = $('#header-logo-link');
  var $menu = $('#header-menu-link');

  $window.on('scroll change', function () {
    // console.log($(this).scrollTop())
    if ($(this).scrollTop() > 20) {
      $navbar.addClass('with-bg');
      $menu.css({ color: '#ddd' });
      $logo.css({ opacity: '0.8', height: '40px' });
    } else {
      $navbar.removeClass('with-bg');
      $menu.css({ color: '#999' });
      $logo.css({ opacity: '0', height: '60px' });
    }
  });
};

// PAGE >>> all pages
App.pushMenu = function () {
  var $navbarBtn = $('a#header-menu-link');
  var $mainCont = $('.main-cont');
  var $siteHeader = $('header.site-header');
  var $navMenu = $('#nav-menu');

  // menu link clicked
  $navbarBtn.on('click', function (e) {
    e.preventDefault();
    var $this = $(this);

    // if main-cont has class .push-right then remove it
    if ($mainCont.hasClass('push-right')) {
      $this.css({ color: '#999' });
      $navMenu.animate({ width: '0px' }, 200);
      $mainCont.removeClass('push-right').animate({ left: '0px' }, 200);
    }
    // add it if there isnt .push-right
    else {
        if (!$siteHeader.hasClass('with-bg')) {
          console.log('no bg');
          $this.css({ color: '#4dafcf' });
        } else {
          $this.css({ 'color': '#fff' });
        }

        $navMenu.show().animate({ width: '300px' }, 200);
        $mainCont.addClass('push-right').animate({ left: '-300px' }, 200);
        // $siteHeader
        //   .addClass('push-right')
        //   .animate({ left: '-300px' }, 200)
      }
  });
};

// PAGE >>> show_event
App.submitRegisterEvent = function () {
  var $registerForm = $('#event-register-form');
  var $fName = $registerForm.find('.first-name');
  var $lName = $registerForm.find('.last-name');
  var $email = $registerForm.find('.email');
  var $message = $registerForm.find('.message');
  var $slug = $registerForm.find('.hidden-slug');
  var $tshirtSize = $registerForm.find("select[name='tShirtSize']");
  var $regSuccess = $('.register-success');
  var $regError = $('.register-error');

  function resetForm(result) {
    if (result.success) {
      $regSuccess.append('<div>' + result.message + '</div>');
      $regSuccess.show();
    } else {
      $regError.append('<div>' + result.message + '</div>');
      $regError.show();
    }
    $fName.val('');
    $lName.val('');
    $email.val('');
    $message.val('');
    $slug.val('');
  }

  $registerForm.on('submit', function (e) {
    e.preventDefault();

    var data = {
      f_name: $fName.val(),
      l_name: $lName.val(),
      full_name: $.trim($fName.val()) + ' ' + $.trim($lName.val()),
      email: $email.val(),
      message: $message.val(),
      slug: $slug.val(),
      tshirt: $tshirtSize.val()
    };

    console.log(data);

    $.post('/events/' + data.slug + '/register', data, function (result) {
      // call func based on weather or not res.send(true)
      result ? resetForm(result) : resetForm(result);
    });
  });
};

// PAGE >>> admin_page
App.handleAdminEventAttendees = function () {
  var $createdAt = $('.attendee__created-at');
  var $attendeeMessage = $('.attendee__message');
  var $viewAttendeesBtn = $('.btn-attendees');
  var $attendeeRow = $('.attendee-row, .attendee-meta-row');
  var attRowShowing = false;

  // iterate over each attendee
  // take each data-createdat, call toDateString
  // then append back onto __created-at
  $createdAt.each(function (caElem) {
    var $this = $(this);
    var dateData = $this.data('createdat');
    console.log(dateData);
    var dateString = new Date(dateData);
    $this.append(dateString.toDateString());
  });

  // click event for view attendees
  $viewAttendeesBtn.on('click', function (e) {
    e.preventDefault();

    if (!attRowShowing) {
      // show attRow
      attRowShowing = true;
      $attendeeRow.show();
    } else {
      // hide attRow
      attRowShowing = false;
      $attendeeRow.hide();
    }
  });
};

App.handleAdminEventAttendeesMessage = function () {
  var $popovers = $('[data-toggle="popover"]');
  $popovers.on('click', function (e) {
    $popovers.popover('hide');
    var $this = $(this);
    e.preventDefault();
    $this.popover('show');
  });
};

// PAGE >>> index
App.programSlider = function () {
  var $pSlider = $('#programs-slider');
  var $progAll = $pSlider.find('a.program');
  var $prog1 = $pSlider.find('.program1');
  var $prog2 = $pSlider.find('.program2');
  var $prog3 = $pSlider.find('.program3');
  var $prog4 = $pSlider.find('.program4');
  var $prog5 = $pSlider.find('.program5');
  var $satImg = $pSlider.find('.saturated-img');
  var $desatImg = $pSlider.find('.desaturated-img');

  $progAll.on('mouseenter', function (e) {
    e.preventDefault();
    var $this = $(this);

    // same accross all programs
    // hide desat img, show sat img
    $this.find('.desaturated-img').css({ display: 'none' }).end().find('.saturated-img').css({ display: 'block' });

    // if scenario programX
    // make content width 100%
    if ($this.hasClass('program1')) {
      $this.find('.content').css({ width: '100%' });

      // push all over 4%
      $prog2.css({ left: '24%' });
      $prog3.css({ left: '44%' });
      $prog4.css({ left: '64%' });
      $prog5.css({ left: '84%' });
    } else if ($this.hasClass('program2')) {
      $this.css({ left: '18%' }).find('.content').css({ width: '100%' });

      // left -2% push all to the right 2%
      $prog1.css({ left: '-2%' });
      $prog3.css({ left: '42%' });
      $prog4.css({ left: '62%' });
      $prog5.css({ left: '82%' });
    } else if ($this.hasClass('program3')) {
      $this.css({ left: '38%' }).find('.content').css({ width: '100%' });

      $prog1.css({ left: '-2%' });
      $prog2.css({ left: '18%' });
      $prog4.css({ left: '62%' });
      $prog5.css({ left: '82%' });
    } else if ($this.hasClass('program4')) {
      $this.css({ left: '58%' }).find('.content').css({ width: '100%' });

      $prog1.css({ left: '-2%' });
      $prog2.css({ left: '18%' });
      $prog3.css({ left: '38%' });
      $prog5.css({ left: '82%' });
    } else if ($this.hasClass('program5')) {
      $this.css({ left: '76%' }).find('.content').css({ width: '100%' });

      // push all to the left -4%
      $prog1.css({ left: '-4%' });
      $prog2.css({ left: '16%' });
      $prog3.css({ left: '36%' });
      $prog4.css({ left: '56%' });
    }
  });

  $progAll.on('mouseleave', function (e) {
    e.preventDefault();

    // hide all sat-img, show all desat-img
    $progAll.find('.saturated-img').css({ display: 'none' }).end().find('.desaturated-img').css({ display: 'block' }).end().find('.content').css({ width: '80%' });

    // return all progams to their
    // normal state
    $prog1.css({ left: '0%' });
    $prog2.css({ left: '20%' });
    $prog3.css({ left: '40%' });
    $prog4.css({ left: '60%' });
    $prog5.css({ left: '80%' });
  });
};

// PAGE >>> index
App.imageGallery = function () {
  // once all the images are all loaded init masonry with options
  var $grid = $('#galleries .grid').imagesLoaded(function () {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer',
      gutter: 5
    });
  });

  $('.fancybox').fancybox({
    fitToView: true,
    closeBtn: true,
    padding: '60px 0px 30px 0px',
    // width:  '60%',
    // height: '60%',
    maxWidth: 1200,
    maxHeight: 560
  });
};

// accepts array of img links and creates
// slider elements and animates between them
// PAGE >>> index
App.imageSlider = function () {
  var $slider = $('ul#slider');

  var imgLinks = ['http://i.imgur.com/9aMTBwU.jpg', 'http://i.imgur.com/U4JfOrb.jpg', 'http://i.imgur.com/W30xBsL.jpg', 'http://i.imgur.com/x69A8GD.jpg'];

  // build Eslider DOM, pass animateSlider as
  // callback to do when animateSlider is done
  buildSliderDom(imgLinks, animateSlider);

  function animateSlider(err) {
    var $slideItems = $('.slider__item');
    var sliderLen = $slideItems.length,
        count = 0,
        item;

    setInterval(function () {
      // if at end of array, return count to 0
      count === sliderLen - 1 ? count = 0 : count++;
      // remove .show from all slide__item's
      $slideItems.removeClass('show');
      // find element based on its data-testing
      // attr then add .show, repeat sI
      item = $("li.slider__item[data-position='" + count + "']");
      item.addClass('show');
    }, 4000);
  }

  function buildSliderDom(imgLinks, callback) {
    var sliderArr = [];

    // return error if no imgLinks or imgLinks !== Array
    if (!imgLinks || !(imgLinks instanceof Array)) {
      var err = 'there was an error!';
      callback(err);
    }

    // iterate over list and create <img>
    // image and thumbnail have different w/h & class
    for (var i = 0; i < imgLinks.length; i++) {
      var link = imgLinks[i];
      var image = newImage(link, false);
      var thumbnail = newImage(link, true);

      // { image: $(...), thumbnail: $(...) }
      sliderArr.push({
        image: image,
        thumbnail: thumbnail
      });
    }

    // once sliderArr done, create a li.slide__item,
    // append the image into the li, then append li onto #slider
    for (var i = 0; i < sliderArr.length; i++) {
      var img = sliderArr[i].image;
      var item = $('<li/>', {
        'class': 'slider__item',
        'data-position': i
      });

      item.append(img);
      $slider.append(item);
    }

    // all went well
    callback(null);
  }

  // returns new img element with src=imgLink
  function newImage(imgLink, isThumbnail) {
    return $('<img/>', {
      'src': imgLink,
      'class': 's-img'
    });
  }
};

// PAGE >>> not specified
App.twitterSlider = function () {
  var $indicatorsUl = $('.carousel-indicators');
  var $innerCarousel = $('.carousel-inner');

  var tweets = [{
    title: '1 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
    url: 'http://t.co/7FoVSP0vIf'
  }, {
    title: '2 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
    url: 'http://t.co/7FoVSP0vIf'
  }, {
    title: '3 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
    url: 'http://t.co/7FoVSP0vIf'
  }];

  for (var i = 0; i < tweets.length; i++) {
    var tdata = tweets[i];
    var $indicator = createIndicator(i);
    var $item = createItem(tdata.title, tdata.url, i);

    $indicatorsUl.append($indicator);
    $innerCarousel.append($item);
  }

  $('.carousel').carousel({
    interval: 3000
  });

  function createIndicator(count) {
    var indi = $('<li/>', {
      'data-target': '#twitter-slider',
      'data-slide-to': count
    });

    if (count === 0) {
      indi.addClass('active');
    }

    return indi;
  }

  function createItem(tweetText, tweetUrl, count) {
    var item = $('<div/>', {
      'class': 'item'
    });
    var para = $('<p/>').text(tweetText);
    var anch = $('<a/>', {
      'href': tweetUrl
    }).text(tweetUrl);

    if (count === 0) {
      item.addClass('active');
    }

    return item.append(para).append(anch);
  }
};

// PAGE >>> about_us
App.countTo = function (elem) {
  elem.countTo('toggle');
};

// PAGE >>> admin_page
App.adminPageRenderer = function () {
  var $adminSections = $('.admin-section');
  var $adminAll = $('.admin-section__all');
  var $adminBlogs = $('.admin-section__blogs');
  var $adminEvents = $('.admin-section__events');
  var $adminSubs = $('.admin-section__subscribers');
  var $adminImages = $('.admin-section__gallery');
  var $adminDonations = $('.admin-section__donations');

  var $adminLinks = $('.admin-link');
  var $adminLinkAll = $('.admin-link__all');
  var $adminLinkBlogs = $('.admin-link__blogs');
  var $adminLinkEvents = $('.admin-link__events');
  var $adminLinkSubs = $('.admin-link__subscribers');
  var $adminLinkImages = $('.admin-link__gallery');
  var $adminLinkDonations = $('.admin-link__donations');

  // have the `all` be the initial state
  $adminLinkAll.addClass('active');
  $adminAll.addClass('show');

  $adminLinks.on('click', function (e) {
    e.preventDefault();

    // .admin-link__XXX
    var $clicked = $(this);

    // remove all showed and add `active`
    // to the clicked link
    $adminSections.removeClass('show');
    $adminLinks.removeClass('active');
    $adminSections.removeClass('show');
    $clicked.addClass('active');

    if ($clicked[0] == $adminLinkAll[0]) {
      $adminAll.addClass('show');
    } else if ($clicked[0] == $adminLinkBlogs[0]) {
      $adminBlogs.addClass('show');
    } else if ($clicked[0] == $adminLinkEvents[0]) {
      $adminEvents.addClass('show');
    } else if ($clicked[0] == $adminLinkSubs[0]) {
      $adminSubs.addClass('show');
    } else if ($clicked[0] == $adminLinkImages[0]) {
      $adminImages.addClass('show');
    } else if ($clicked[0] == $adminLinkDonations[0]) {
      $adminDonations.addClass('show');
    }
  });
};

// PAGE >>> contact_us
App.googleMap = function () {
  // required so error doesnt show, should eventually
  // put all calls to App inside .load
  $(window).load(function () {

    // set your google maps parameters
    var $latitude = 42.090297,
        $longitude = -88.07598200000001,
        $map_zoom = 12; /* ZOOM SETTING */

    // custom marker
    var $marker_url = '../img/google-map-marker.png';

    // pasted the styled maps definition
    var style = [{ "featureType": "all", "elementType": "all", "stylers": [{ "saturation": "39" }, { "lightness": "11" }, { "color": "#99dee9" }] }, { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "hue": "#7d00ff" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "lightness": 20 }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels.text.fill", "stylers": [{ "color": "#cd3c3c" }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "labels.text.stroke", "stylers": [{ "color": "#613737" }] }, { "featureType": "landscape", "elementType": "labels.icon", "stylers": [{ "color": "#f7c770" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "color": "#8ed8e1" }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "color": "#8ed8e1" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#8ed8e1" }, { "lightness": 21 }] }, { "featureType": "poi.medical", "elementType": "geometry", "stylers": [{ "color": "#08b7be" }] }, { "featureType": "poi.medical", "elementType": "labels.text.fill", "stylers": [{ "color": "#59b1b5" }] }, { "featureType": "poi.medical", "elementType": "labels.icon", "stylers": [{ "color": "#f2be3b" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "lightness": 21 }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#723f83" }, { "weight": "2" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }, { "weight": "1" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "lightness": 17 }, { "color": "#f2be3b" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "lightness": 17 }, { "color": "#f5f5f5" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#641c7c" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }];

    // set google map options
    var map_options = {
      center: new google.maps.LatLng($latitude, $longitude),
      zoom: $map_zoom,
      panControl: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: style
    };

    // inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);

    //add a custom marker to the map
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng($latitude, $longitude),
      map: map,
      visible: true,
      icon: $marker_url
    });
  });
};

// PAGE >>> donate
App.submitDonation = function () {
  var $donateForm = $('#donate-form');

  $donateForm.on('submit', function (e) {
    e.preventDefault();
    var $form = $(this);
    var $spinnerContainer = $('.spinner-container');
    var $spinner = $('<i/>', {
      class: 'fa fa-circle-o-notch fa-spin fa-2x fa-fw'
    });
    var $srOnly = $('<span/>', {
      class: 'sr-only'
    });
    $spinnerContainer.append($spinner).append($srOnly);
    $form.find('.btn').prop('disabled', true);

    // create the stripeToken
    Stripe.card.createToken($form, stripeResponseHandler);
  });

  // callback handler that either inserts errors or attaches
  // stripeToken to hidden input, then submits form
  function stripeResponseHandler(status, response) {
    var $form = $donateForm;

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };
};

App.typer('.nl-typer');
App.tokenField('#new-blog-tokenfield');
App.tokenField('#edit-blog-tokenfield');
App.contentPreviewCount();
App.scrollFollow('#show-blog .on-right, #blogs .on-right');
App.navbar();
App.pushMenu();
App.submitRegisterEvent();
App.handleAdminEventAttendees();
App.handleAdminEventAttendeesMessage();
App.programSlider();
App.imageGallery();
App.imageSlider(); // for james index
App.twitterSlider();
App.countTo($('.achivements .timer'));
App.adminPageRenderer();
App.googleMap();
App.submitDonation();

},{"./pages/indexPage":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (hi) {
  console.log('ello from indexPage!!! ', hi);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYWdlcy9pbmRleFBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7QUFFQSx5QkFBTSxNQUFOOztBQUVBLElBQUksTUFBTSxPQUFPLEVBQVA7O0FBRVYsT0FBTyxpQkFBUCxDQUF5QixrQ0FBekI7OztBQUlBLElBQUksS0FBSixHQUFZLFVBQVMsSUFBVCxFQUFlO0FBQ3pCLElBQUUsSUFBRixFQUFRLEtBQVIsQ0FBYztBQUNaLGFBQVMsQ0FDUCxvQkFETyxFQUVQLG9DQUZPLEVBR1AscUNBSE8sQ0FBVDtBQUtBLGVBQVcsQ0FBWDtBQUNBLFVBQU0sSUFBTjtBQUNBLGVBQVcsSUFBWDtBQUNBLGVBQVcsQ0FBQyxDQUFEO0FBQ1gsZ0JBQVksS0FBWjtHQVZGLEVBRHlCO0NBQWY7OztBQWdCWixJQUFJLFVBQUosR0FBaUIsVUFBUyxJQUFULEVBQWU7QUFDOUIsSUFBRSxJQUFGLEVBQVEsVUFBUixDQUFtQjs7Ozs7QUFLakIsNkJBQXlCLElBQXpCO0dBTEYsRUFEOEI7Q0FBZjs7O0FBV2pCLElBQUksbUJBQUosR0FBMEIsWUFBVztBQUNuQyxNQUFJLFVBQUosQ0FEbUM7QUFFbkMsTUFBSSxTQUFrQixHQUFsQixDQUYrQjtBQUduQyxNQUFJLGtCQUFrQixFQUFFLHdCQUFGLENBQWxCLENBSCtCO0FBSW5DLE1BQUksZ0JBQWtCLEVBQUUsZ0JBQUYsQ0FBbEIsQ0FKK0I7QUFLbkMsTUFBSSxVQUFrQixFQUFFLHFCQUFGLENBQWxCLENBTCtCO0FBTW5DLE1BQUksY0FBa0IsRUFBRSx5QkFBRixDQUFsQixDQU4rQjs7QUFRbkMsa0JBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVc7QUFDckMsaUJBQWEsZ0JBQWdCLEdBQWhCLEdBQXNCLE1BQXRCLENBRHdCO0FBRXJDLGdCQUFZLElBQVosQ0FBaUIsVUFB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Q0EsSUFBSSxVQUFKLENBQWUsc0JBQWY7QUFDQSxJQUFJLFVBQUosQ0FBZSx1QkFBZjtBQUNBLElBQUksbUJBQUo7QUFDQSxJQUFJLFlBQUosQ0FBaUIsd0NBQWpCO0FBQ0EsSUFBSSxNQUFKO0FBQ0EsSUFBSSxRQUFKO0FBQ0EsSUFBSSxtQkFBSjtBQUNBLElBQUkseUJBQUo7QUFDQSxJQUFJLGdDQUFKO0FBQ0EsSUFBSSxhQUFKO0FBQ0EsSUFBSSxZQUFKO0FBQ0EsSUFBSSxXQUFKO0FBQ0EsSUFBSSxhQUFKO0FBQ0EsSUFBSSxPQUFKLENBQVksRUFBRSxxQkFBRixDQUFaO0FBQ0EsSUFBSSxpQkFBSjtBQUNBLElBQUksU0FBSjtBQUNBLElBQUksY0FBSjs7Ozs7Ozs7O2tCQ3BxQmUsVUFBQyxFQUFELEVBQVE7QUFDckIsVUFBUSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkMsRUFEcUI7Q0FBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmltcG9ydCBoZWxsbyBmcm9tICcuL3BhZ2VzL2luZGV4UGFnZSdcblxuaGVsbG8oJ21hdHQnKVxuXG52YXIgQXBwID0gQXBwIHx8IHt9O1xuXG5TdHJpcGUuc2V0UHVibGlzaGFibGVLZXkoJ3BrX3Rlc3RfdmRkdUNNQ1ZmNzIzWTFFMEhwRzQzajMyJyk7XG5cblxuLy8gUEFHRSA+Pj4gbm90IHNwZWNpZmllZFxuQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAkKGVsZW0pLnR5cGVkKHtcbiAgICBzdHJpbmdzOiBbXG4gICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICdyZWNpZXZlIHJlZ3VsYXIgdXBkYXRlcyBvbiBldmVudHMuJyxcbiAgICAgICdoZWxwIG1ha2UgdGhlIHdvcmxkIGEgYmV0dGVyIHBsYWNlLidcbiAgICBdLFxuICAgIHR5cGVTcGVlZDogMCxcbiAgICBsb29wOiB0cnVlLFxuICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICBiYWNrU3BlZWQ6IC01LFxuICAgIHNob3dDdXJzb3I6IGZhbHNlXG4gIH0pO1xufVxuXG4vLyBQQUdFID4+PiBuZXdfYmxvZywgZWRpdF9ibG9nXG5BcHAudG9rZW5GaWVsZCA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgJChlbGVtKS50b2tlbmZpZWxkKHtcbiAgICAvLyBhdXRvY29tcGxldGU6IHtcbiAgICAvLyAgIHNvdXJjZTogWydyZWQnLCdibHVlJywnZ3JlZW4nLCd5ZWxsb3cnLCd2aW9sZXQnLCdicm93bicsJ3B1cnBsZScsJ2JsYWNrJywnd2hpdGUnXSxcbiAgICAvLyAgIGRlbGF5OiAxMDBcbiAgICAvLyB9LFxuICAgIHNob3dBdXRvY29tcGxldGVPbkZvY3VzOiB0cnVlXG4gIH0pXG59XG5cbi8vIFBBR0UgPj4+IG5ld19ibG9nLCBlZGl0X2Jsb2dcbkFwcC5jb250ZW50UHJldmlld0NvdW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjdXJyZW50TnVtO1xuICB2YXIgbWF4TnVtICAgICAgICAgID0gNjAwO1xuICB2YXIgJGNvbnRlbnRQcmV2aWV3ID0gJCgnLmNvbnRlbnQtcHJldmlldy1pbnB1dCcpO1xuICB2YXIgJGN1cnJlbnRDb3VudCAgID0gJCgnLmN1cnJlbnQtY291bnQnKTtcbiAgdmFyICRtYXhOdW0gICAgICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19tYXgnKTtcbiAgdmFyICRjdXJyZW50TnVtICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19jdXJyZW50Jyk7XG5cbiAgJGNvbnRlbnRQcmV2aWV3Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgIGN1cnJlbnROdW0gPSAkY29udGVudFByZXZpZXcudmFsKCkubGVuZ3RoO1xuICAgICRjdXJyZW50TnVtLnRleHQoY3VycmVudE51bSk7XG4gIH0pXG59XG5cbi8vIFBBR0UgPj4+IGJsb2dzLCBzaG93X2Jsb2dcbkFwcC5zY3JvbGxGb2xsb3cgPSBmdW5jdGlvbihlbGVtKSB7XG4gICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICBsaW1pdF9lbGVtOiAnLm9uLWxlZnQnXG4gIH0pO1xufVxuXG4vLyBQQUdFID4+PiBhbGwgcGFnZXNcbkFwcC5uYXZiYXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRuYXZiYXIgPSAkKCdoZWFkZXInKTtcbiAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gIHZhciAkbG9nbyA9ICQoJyNoZWFkZXItbG9nby1saW5rJyk7XG4gIHZhciAkbWVudSA9ICQoJyNoZWFkZXItbWVudS1saW5rJyk7XG5cbiAgJHdpbmRvdy5vbignc2Nyb2xsIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykuc2Nyb2xsVG9wKCkpXG4gICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMCkge1xuICAgICAgJG5hdmJhci5hZGRDbGFzcygnd2l0aC1iZycpO1xuICAgICAgJG1lbnUuY3NzKHsgY29sb3I6ICcjZGRkJyB9KVxuICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAuOCcsIGhlaWdodDogJzQwcHgnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyM5OTknIH0pXG4gICAgICAkbG9nby5jc3MoeyBvcGFjaXR5OiAnMCcsIGhlaWdodDogJzYwcHgnIH0pXG4gICAgfVxuICB9KTtcbn1cblxuLy8gUEFHRSA+Pj4gYWxsIHBhZ2VzXG5BcHAucHVzaE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRuYXZiYXJCdG4gID0gJCgnYSNoZWFkZXItbWVudS1saW5rJyk7XG4gIHZhciAkbWFpbkNvbnQgICA9ICQoJy5tYWluLWNvbnQnKTtcbiAgdmFyICRzaXRlSGVhZGVyID0gJCgnaGVhZGVyLnNpdGUtaGVhZGVyJyk7XG4gIHZhciAkbmF2TWVudSAgICA9ICQoJyNuYXYtbWVudScpO1xuXG4gIC8vIG1lbnUgbGluayBjbGlja2VkXG4gICRuYXZiYXJCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgLy8gaWYgbWFpbi1jb250IGhhcyBjbGFzcyAucHVzaC1yaWdodCB0aGVuIHJlbW92ZSBpdFxuICAgIGlmICgkbWFpbkNvbnQuaGFzQ2xhc3MoJ3B1c2gtcmlnaHQnKSkge1xuICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjOTk5JyB9KTtcbiAgICAgICRuYXZNZW51XG4gICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICcwcHgnIH0sIDIwMClcbiAgICAgICRtYWluQ29udFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICcwcHgnIH0sIDIwMClcbiAgICB9XG4gICAgLy8gYWRkIGl0IGlmIHRoZXJlIGlzbnQgLnB1c2gtcmlnaHRcbiAgICBlbHNlIHtcbiAgICAgIGlmICghJHNpdGVIZWFkZXIuaGFzQ2xhc3MoJ3dpdGgtYmcnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnbm8gYmcnKVxuICAgICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM0ZGFmY2YnIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJHRoaXMuY3NzKHsgJ2NvbG9yJzogJyNmZmYnIH0pXG4gICAgICB9XG5cbiAgICAgICRuYXZNZW51XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzMwMHB4JyB9LCAyMDApXG4gICAgICAkbWFpbkNvbnRcbiAgICAgICAgLmFkZENsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnLTMwMHB4JyB9LCAyMDApXG4gICAgICAvLyAkc2l0ZUhlYWRlclxuICAgICAgLy8gICAuYWRkQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgLy8gICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcblxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IHNob3dfZXZlbnRcbkFwcC5zdWJtaXRSZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgdmFyICRmTmFtZSAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5maXJzdC1uYW1lJyk7XG4gIHZhciAkbE5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubGFzdC1uYW1lJyk7XG4gIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgdmFyICRtZXNzYWdlICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5tZXNzYWdlJyk7XG4gIHZhciAkc2x1ZyAgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuaGlkZGVuLXNsdWcnKTtcbiAgdmFyICR0c2hpcnRTaXplICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoXCJzZWxlY3RbbmFtZT0ndFNoaXJ0U2l6ZSddXCIpO1xuICB2YXIgJHJlZ1N1Y2Nlc3MgICA9ICQoJy5yZWdpc3Rlci1zdWNjZXNzJyk7XG4gIHZhciAkcmVnRXJyb3IgICAgID0gJCgnLnJlZ2lzdGVyLWVycm9yJyk7XG5cbiAgZnVuY3Rpb24gcmVzZXRGb3JtKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgJHJlZ1N1Y2Nlc3MuYXBwZW5kKCc8ZGl2PicrcmVzdWx0Lm1lc3NhZ2UrJzwvZGl2PicpO1xuICAgICAgJHJlZ1N1Y2Nlc3Muc2hvdygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRyZWdFcnJvci5hcHBlbmQoJzxkaXY+JytyZXN1bHQubWVzc2FnZSsnPC9kaXY+Jyk7XG4gICAgICAkcmVnRXJyb3Iuc2hvdygpO1xuICAgIH1cbiAgICAkZk5hbWUudmFsKCcnKTtcbiAgICAkbE5hbWUudmFsKCcnKTtcbiAgICAkZW1haWwudmFsKCcnKTtcbiAgICAkbWVzc2FnZS52YWwoJycpO1xuICAgICRzbHVnLnZhbCgnJyk7XG4gIH1cblxuICAkcmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBmX25hbWU6ICAgICRmTmFtZS52YWwoKSxcbiAgICAgIGxfbmFtZTogICAgJGxOYW1lLnZhbCgpLFxuICAgICAgZnVsbF9uYW1lOiAkLnRyaW0oJGZOYW1lLnZhbCgpKSArICcgJyArICQudHJpbSgkbE5hbWUudmFsKCkpLFxuICAgICAgZW1haWw6ICAgICAkZW1haWwudmFsKCksXG4gICAgICBtZXNzYWdlOiAgICRtZXNzYWdlLnZhbCgpLFxuICAgICAgc2x1ZzogICAgICAkc2x1Zy52YWwoKSxcbiAgICAgIHRzaGlydDogICAgJHRzaGlydFNpemUudmFsKClcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAvLyBjYWxsIGZ1bmMgYmFzZWQgb24gd2VhdGhlciBvciBub3QgcmVzLnNlbmQodHJ1ZSlcbiAgICAgIHJlc3VsdCA/IHJlc2V0Rm9ybShyZXN1bHQpIDogcmVzZXRGb3JtKHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IGFkbWluX3BhZ2VcbkFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkY3JlYXRlZEF0ID0gJCgnLmF0dGVuZGVlX19jcmVhdGVkLWF0Jyk7XG4gIHZhciAkYXR0ZW5kZWVNZXNzYWdlID0gJCgnLmF0dGVuZGVlX19tZXNzYWdlJyk7XG4gIHZhciAkdmlld0F0dGVuZGVlc0J0biA9ICQoJy5idG4tYXR0ZW5kZWVzJyk7XG4gIHZhciAkYXR0ZW5kZWVSb3cgPSAkKCcuYXR0ZW5kZWUtcm93LCAuYXR0ZW5kZWUtbWV0YS1yb3cnKTtcbiAgdmFyIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcblxuICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBhdHRlbmRlZVxuICAvLyB0YWtlIGVhY2ggZGF0YS1jcmVhdGVkYXQsIGNhbGwgdG9EYXRlU3RyaW5nXG4gIC8vIHRoZW4gYXBwZW5kIGJhY2sgb250byBfX2NyZWF0ZWQtYXRcbiAgJGNyZWF0ZWRBdC5lYWNoKGZ1bmN0aW9uKGNhRWxlbSkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGRhdGVEYXRhID0gJHRoaXMuZGF0YSgnY3JlYXRlZGF0Jyk7XG4gICAgY29uc29sZS5sb2coZGF0ZURhdGEpXG4gICAgdmFyIGRhdGVTdHJpbmcgPSBuZXcgRGF0ZShkYXRlRGF0YSk7XG4gICAgJHRoaXMuYXBwZW5kKGRhdGVTdHJpbmcudG9EYXRlU3RyaW5nKCkpO1xuICB9KTtcblxuICAvLyBjbGljayBldmVudCBmb3IgdmlldyBhdHRlbmRlZXNcbiAgJHZpZXdBdHRlbmRlZXNCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghYXR0Um93U2hvd2luZykge1xuICAgICAgLy8gc2hvdyBhdHRSb3dcbiAgICAgIGF0dFJvd1Nob3dpbmcgPSB0cnVlO1xuICAgICAgJGF0dGVuZGVlUm93LnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlkZSBhdHRSb3dcbiAgICAgIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXNNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkcG9wb3ZlcnMgPSAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJyk7XG4gICRwb3BvdmVycy5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgJHBvcG92ZXJzLnBvcG92ZXIoJ2hpZGUnKTtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkdGhpcy5wb3BvdmVyKCdzaG93Jyk7XG4gIH0pXG59XG5cbi8vIFBBR0UgPj4+IGluZGV4XG5BcHAucHJvZ3JhbVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJHBTbGlkZXIgID0gJCgnI3Byb2dyYW1zLXNsaWRlcicpO1xuICB2YXIgJHByb2dBbGwgID0gJHBTbGlkZXIuZmluZCgnYS5wcm9ncmFtJyk7XG4gIHZhciAkcHJvZzEgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTEnKTtcbiAgdmFyICRwcm9nMiAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMicpO1xuICB2YXIgJHByb2czICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0zJyk7XG4gIHZhciAkcHJvZzQgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTQnKTtcbiAgdmFyICRwcm9nNSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNScpO1xuICB2YXIgJHNhdEltZyAgID0gJHBTbGlkZXIuZmluZCgnLnNhdHVyYXRlZC1pbWcnKTtcbiAgdmFyICRkZXNhdEltZyA9ICRwU2xpZGVyLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKTtcblxuXG4gICRwcm9nQWxsLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgLy8gc2FtZSBhY2Nyb3NzIGFsbCBwcm9ncmFtc1xuICAgIC8vIGhpZGUgZGVzYXQgaW1nLCBzaG93IHNhdCBpbWdcbiAgICAkdGhpc1xuICAgICAgLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAuZW5kKClcbiAgICAgIC5maW5kKCcuc2F0dXJhdGVkLWltZycpXG4gICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pXG5cbiAgICAvLyBpZiBzY2VuYXJpbyBwcm9ncmFtWFxuICAgIC8vIG1ha2UgY29udGVudCB3aWR0aCAxMDAlXG4gICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMScpKSB7XG4gICAgICAkdGhpc1xuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAvLyBwdXNoIGFsbCBvdmVyIDQlXG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzI0JScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQ0JScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzY0JScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzg0JScgfSk7XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0yJykpIHtcbiAgICAgICR0aGlzXG4gICAgICAgIC5jc3MoeyBsZWZ0OiAnMTglJyB9KVxuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAvLyBsZWZ0IC0yJSBwdXNoIGFsbCB0byB0aGUgcmlnaHQgMiVcbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDIlJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICB9XG5cbiAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTMnKSkge1xuICAgICAgJHRoaXNcbiAgICAgICAgLmNzcyh7IGxlZnQ6ICczOCUnIH0pXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICB9XG5cbiAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTQnKSkge1xuICAgICAgJHRoaXNcbiAgICAgICAgLmNzcyh7IGxlZnQ6ICc1OCUnIH0pXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnMzglJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcblxuICAgIH1cblxuICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtNScpKSB7XG4gICAgICAkdGhpc1xuICAgICAgICAuY3NzKHsgbGVmdDogJzc2JScgfSlcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgLy8gcHVzaCBhbGwgdG8gdGhlIGxlZnQgLTQlXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy00JScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE2JScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM2JScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzU2JScgfSk7XG5cbiAgICB9XG4gIH0pXG5cbiAgJHByb2dBbGwub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gaGlkZSBhbGwgc2F0LWltZywgc2hvdyBhbGwgZGVzYXQtaW1nXG4gICAgJHByb2dBbGxcbiAgICAgIC5maW5kKCcuc2F0dXJhdGVkLWltZycpXG4gICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgIC5lbmQoKVxuICAgICAgLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgLmVuZCgpXG4gICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgLmNzcyh7IHdpZHRoOiAnODAlJyB9KVxuXG4gICAgLy8gcmV0dXJuIGFsbCBwcm9nYW1zIHRvIHRoZWlyXG4gICAgLy8gbm9ybWFsIHN0YXRlXG4gICAgJHByb2cxLmNzcyh7IGxlZnQ6ICcwJScgfSk7XG4gICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyMCUnIH0pO1xuICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDAlJyB9KTtcbiAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYwJScgfSk7XG4gICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MCUnIH0pO1xuICB9KVxufVxuXG4vLyBQQUdFID4+PiBpbmRleFxuQXBwLmltYWdlR2FsbGVyeSA9IGZ1bmN0aW9uKCkge1xuICAvLyBvbmNlIGFsbCB0aGUgaW1hZ2VzIGFyZSBhbGwgbG9hZGVkIGluaXQgbWFzb25yeSB3aXRoIG9wdGlvbnNcbiAgdmFyICRncmlkID0gJCgnI2dhbGxlcmllcyAuZ3JpZCcpLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAkZ3JpZC5tYXNvbnJ5KHtcbiAgICAgIGl0ZW1TZWxlY3RvcjogICAgJy5ncmlkLWl0ZW0nLFxuICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgY29sdW1uV2lkdGg6ICAgICAnLmdyaWQtc2l6ZXInLFxuICAgICAgZ3V0dGVyOiAgICAgICAgICA1XG4gICAgfSk7XG4gIH0pO1xuXG4gICQoJy5mYW5jeWJveCcpLmZhbmN5Ym94KHtcbiAgICBmaXRUb1ZpZXc6IHRydWUsXG4gICAgY2xvc2VCdG46ICB0cnVlLFxuICAgIHBhZGRpbmc6ICAgJzYwcHggMHB4IDMwcHggMHB4JyxcbiAgICAvLyB3aWR0aDogICc2MCUnLFxuICAgIC8vIGhlaWdodDogJzYwJScsXG4gICAgbWF4V2lkdGg6ICAxMjAwLFxuICAgIG1heEhlaWdodDogNTYwXG4gIH0pO1xufVxuXG4vLyBhY2NlcHRzIGFycmF5IG9mIGltZyBsaW5rcyBhbmQgY3JlYXRlc1xuLy8gc2xpZGVyIGVsZW1lbnRzIGFuZCBhbmltYXRlcyBiZXR3ZWVuIHRoZW1cbi8vIFBBR0UgPj4+IGluZGV4XG5BcHAuaW1hZ2VTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRzbGlkZXIgPSAkKCd1bCNzbGlkZXInKTtcblxuICB2YXIgaW1nTGlua3MgPSBbXG4gICAgJ2h0dHA6Ly9pLmltZ3VyLmNvbS85YU1UQndVLmpwZycsXG4gICAgJ2h0dHA6Ly9pLmltZ3VyLmNvbS9VNEpmT3JiLmpwZycsXG4gICAgJ2h0dHA6Ly9pLmltZ3VyLmNvbS9XMzB4QnNMLmpwZycsXG4gICAgJ2h0dHA6Ly9pLmltZ3VyLmNvbS94NjlBOEdELmpwZydcbiAgXTtcblxuICAvLyBidWlsZCBFc2xpZGVyIERPTSwgcGFzcyBhbmltYXRlU2xpZGVyIGFzXG4gIC8vIGNhbGxiYWNrIHRvIGRvIHdoZW4gYW5pbWF0ZVNsaWRlciBpcyBkb25lXG4gIGJ1aWxkU2xpZGVyRG9tKGltZ0xpbmtzLCBhbmltYXRlU2xpZGVyKTtcblxuICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKGVycikge1xuICAgIHZhciAkc2xpZGVJdGVtcyA9ICQoJy5zbGlkZXJfX2l0ZW0nKTtcbiAgICB2YXIgc2xpZGVyTGVuID0gJHNsaWRlSXRlbXMubGVuZ3RoLFxuICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgIGl0ZW07XG5cbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIC8vIGlmIGF0IGVuZCBvZiBhcnJheSwgcmV0dXJuIGNvdW50IHRvIDBcbiAgICAgIChjb3VudCA9PT0gc2xpZGVyTGVuIC0gMSkgPyBjb3VudCA9IDAgOiBjb3VudCsrO1xuICAgICAgLy8gcmVtb3ZlIC5zaG93IGZyb20gYWxsIHNsaWRlX19pdGVtJ3NcbiAgICAgICRzbGlkZUl0ZW1zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAvLyBmaW5kIGVsZW1lbnQgYmFzZWQgb24gaXRzIGRhdGEtdGVzdGluZ1xuICAgICAgLy8gYXR0ciB0aGVuIGFkZCAuc2hvdywgcmVwZWF0IHNJXG4gICAgICBpdGVtID0gJChcImxpLnNsaWRlcl9faXRlbVtkYXRhLXBvc2l0aW9uPSdcIitjb3VudCtcIiddXCIpO1xuICAgICAgaXRlbS5hZGRDbGFzcygnc2hvdycpO1xuXG4gICAgfSwgNDAwMCk7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgY2FsbGJhY2spIHtcbiAgICB2YXIgc2xpZGVyQXJyID0gW11cblxuICAgIC8vIHJldHVybiBlcnJvciBpZiBubyBpbWdMaW5rcyBvciBpbWdMaW5rcyAhPT0gQXJyYXlcbiAgICBpZiAoIWltZ0xpbmtzIHx8ICEoaW1nTGlua3MgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIHZhciBlcnIgPSAndGhlcmUgd2FzIGFuIGVycm9yISc7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBsaXN0IGFuZCBjcmVhdGUgPGltZz5cbiAgICAvLyBpbWFnZSBhbmQgdGh1bWJuYWlsIGhhdmUgZGlmZmVyZW50IHcvaCAmIGNsYXNzXG4gICAgZm9yICh2YXIgaT0wOyBpPGltZ0xpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGluayA9IGltZ0xpbmtzW2ldO1xuICAgICAgdmFyIGltYWdlID0gbmV3SW1hZ2UobGluaywgZmFsc2UpO1xuICAgICAgdmFyIHRodW1ibmFpbCA9IG5ld0ltYWdlKGxpbmssIHRydWUpO1xuXG4gICAgICAvLyB7IGltYWdlOiAkKC4uLiksIHRodW1ibmFpbDogJCguLi4pIH1cbiAgICAgIHNsaWRlckFyci5wdXNoKHtcbiAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gb25jZSBzbGlkZXJBcnIgZG9uZSwgY3JlYXRlIGEgbGkuc2xpZGVfX2l0ZW0sXG4gICAgLy8gYXBwZW5kIHRoZSBpbWFnZSBpbnRvIHRoZSBsaSwgdGhlbiBhcHBlbmQgbGkgb250byAjc2xpZGVyXG4gICAgZm9yICh2YXIgaT0wOyBpPHNsaWRlckFyci5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGltZyAgPSBzbGlkZXJBcnJbaV0uaW1hZ2U7XG4gICAgICB2YXIgaXRlbSA9ICQoJzxsaS8+Jywge1xuICAgICAgICAnY2xhc3MnOiAnc2xpZGVyX19pdGVtJyxcbiAgICAgICAgJ2RhdGEtcG9zaXRpb24nOiBpXG4gICAgICB9KVxuXG4gICAgICBpdGVtLmFwcGVuZChpbWcpO1xuICAgICAgJHNsaWRlci5hcHBlbmQoaXRlbSk7XG4gICAgfVxuXG4gICAgLy8gYWxsIHdlbnQgd2VsbFxuICAgIGNhbGxiYWNrKG51bGwpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBuZXcgaW1nIGVsZW1lbnQgd2l0aCBzcmM9aW1nTGlua1xuICBmdW5jdGlvbiBuZXdJbWFnZShpbWdMaW5rLCBpc1RodW1ibmFpbCkge1xuICAgIHJldHVybiAkKCc8aW1nLz4nLCB7XG4gICAgICAnc3JjJzogaW1nTGluayxcbiAgICAgICdjbGFzcyc6ICdzLWltZydcbiAgICB9KTtcbiAgfVxuXG59XG5cbi8vIFBBR0UgPj4+IG5vdCBzcGVjaWZpZWRcbkFwcC50d2l0dGVyU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkaW5kaWNhdG9yc1VsID0gJCgnLmNhcm91c2VsLWluZGljYXRvcnMnKTtcbiAgdmFyICRpbm5lckNhcm91c2VsID0gJCgnLmNhcm91c2VsLWlubmVyJyk7XG5cbiAgdmFyIHR3ZWV0cyA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogJzEgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICB1cmw6ICdodHRwOi8vdC5jby83Rm9WU1AwdklmJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICcyIENsYXJpdGFzIGVzdCBldGlhbSBwcm9jZXNzdXMgZHluYW1pY3VzLCBxdWkgc2VxdWl0dXIgbXV0YXRpb25lbSBjb25zdWV0dWRpdW0gbGVjdG9ydW0uIE1pcnVtIGVzdCBub3RhcmUgcXVhbSAuLi4nLFxuICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnMyBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgfVxuICBdXG5cbiAgZm9yICh2YXIgaT0wOyBpPHR3ZWV0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZGF0YSA9IHR3ZWV0c1tpXTtcbiAgICB2YXIgJGluZGljYXRvciA9IGNyZWF0ZUluZGljYXRvcihpKTtcbiAgICB2YXIgJGl0ZW0gPSBjcmVhdGVJdGVtKHRkYXRhLnRpdGxlLCB0ZGF0YS51cmwsIGkpXG5cbiAgICAkaW5kaWNhdG9yc1VsLmFwcGVuZCgkaW5kaWNhdG9yKTtcbiAgICAkaW5uZXJDYXJvdXNlbC5hcHBlbmQoJGl0ZW0pO1xuICB9XG5cbiAgJCgnLmNhcm91c2VsJykuY2Fyb3VzZWwoe1xuICAgIGludGVydmFsOiAzMDAwXG4gIH0pO1xuXG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5kaWNhdG9yKGNvdW50KSB7XG4gICAgdmFyIGluZGkgPSAkKCc8bGkvPicsIHtcbiAgICAgICdkYXRhLXRhcmdldCc6ICcjdHdpdHRlci1zbGlkZXInLFxuICAgICAgJ2RhdGEtc2xpZGUtdG8nOiBjb3VudFxuICAgIH0pXG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIGluZGkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSXRlbSh0d2VldFRleHQsIHR3ZWV0VXJsLCBjb3VudCkge1xuICAgIHZhciBpdGVtID0gJCgnPGRpdi8+Jywge1xuICAgICAgJ2NsYXNzJzogJ2l0ZW0nXG4gICAgfSk7XG4gICAgdmFyIHBhcmEgPSAkKCc8cC8+JykudGV4dCh0d2VldFRleHQpO1xuICAgIHZhciBhbmNoID0gJCgnPGEvPicsIHtcbiAgICAgICdocmVmJzogdHdlZXRVcmxcbiAgICB9KS50ZXh0KHR3ZWV0VXJsKTtcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW0uYXBwZW5kKHBhcmEpLmFwcGVuZChhbmNoKTtcbiAgfVxufVxuXG4vLyBQQUdFID4+PiBhYm91dF91c1xuQXBwLmNvdW50VG8gPSBmdW5jdGlvbihlbGVtKSB7XG4gIGVsZW0uY291bnRUbygndG9nZ2xlJyk7XG59XG5cbi8vIFBBR0UgPj4+IGFkbWluX3BhZ2VcbkFwcC5hZG1pblBhZ2VSZW5kZXJlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGFkbWluU2VjdGlvbnMgICA9ICQoJy5hZG1pbi1zZWN0aW9uJyk7XG4gIHZhciAkYWRtaW5BbGwgICAgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2FsbCcpO1xuICB2YXIgJGFkbWluQmxvZ3MgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19ibG9ncycpO1xuICB2YXIgJGFkbWluRXZlbnRzICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19ldmVudHMnKTtcbiAgdmFyICRhZG1pblN1YnMgICAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fc3Vic2NyaWJlcnMnKTtcbiAgdmFyICRhZG1pbkltYWdlcyAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fZ2FsbGVyeScpO1xuICB2YXIgJGFkbWluRG9uYXRpb25zICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19kb25hdGlvbnMnKTtcblxuICB2YXIgJGFkbWluTGlua3MgICAgICA9ICQoJy5hZG1pbi1saW5rJyk7XG4gIHZhciAkYWRtaW5MaW5rQWxsICAgID0gJCgnLmFkbWluLWxpbmtfX2FsbCcpO1xuICB2YXIgJGFkbWluTGlua0Jsb2dzICA9ICQoJy5hZG1pbi1saW5rX19ibG9ncycpO1xuICB2YXIgJGFkbWluTGlua0V2ZW50cyA9ICQoJy5hZG1pbi1saW5rX19ldmVudHMnKTtcbiAgdmFyICRhZG1pbkxpbmtTdWJzICAgPSAkKCcuYWRtaW4tbGlua19fc3Vic2NyaWJlcnMnKTtcbiAgdmFyICRhZG1pbkxpbmtJbWFnZXMgPSAkKCcuYWRtaW4tbGlua19fZ2FsbGVyeScpO1xuICB2YXIgJGFkbWluTGlua0RvbmF0aW9ucyA9ICQoJy5hZG1pbi1saW5rX19kb25hdGlvbnMnKTtcblxuXG4gIC8vIGhhdmUgdGhlIGBhbGxgIGJlIHRoZSBpbml0aWFsIHN0YXRlXG4gICRhZG1pbkxpbmtBbGwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAkYWRtaW5BbGwuYWRkQ2xhc3MoJ3Nob3cnKTtcblxuXG4gICRhZG1pbkxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyAuYWRtaW4tbGlua19fWFhYXG4gICAgdmFyICRjbGlja2VkID0gJCh0aGlzKTtcblxuICAgIC8vIHJlbW92ZSBhbGwgc2hvd2VkIGFuZCBhZGQgYGFjdGl2ZWBcbiAgICAvLyB0byB0aGUgY2xpY2tlZCBsaW5rXG4gICAgJGFkbWluU2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAkYWRtaW5MaW5rcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJGFkbWluU2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAkY2xpY2tlZC5hZGRDbGFzcygnYWN0aXZlJylcblxuXG4gICAgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtBbGxbMF0pIHtcbiAgICAgICRhZG1pbkFsbC5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rQmxvZ3NbMF0pIHtcbiAgICAgICRhZG1pbkJsb2dzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtFdmVudHNbMF0pIHtcbiAgICAgICRhZG1pbkV2ZW50cy5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rU3Vic1swXSkge1xuICAgICAgJGFkbWluU3Vicy5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rSW1hZ2VzWzBdKSB7XG4gICAgICAkYWRtaW5JbWFnZXMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0RvbmF0aW9uc1swXSkge1xuICAgICAgJGFkbWluRG9uYXRpb25zLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICB9KVxuXG59XG5cbi8vIFBBR0UgPj4+IGNvbnRhY3RfdXNcbkFwcC5nb29nbGVNYXAgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVxdWlyZWQgc28gZXJyb3IgZG9lc250IHNob3csIHNob3VsZCBldmVudHVhbGx5XG4gIC8vIHB1dCBhbGwgY2FsbHMgdG8gQXBwIGluc2lkZSAubG9hZFxuICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblxuICAgIC8vIHNldCB5b3VyIGdvb2dsZSBtYXBzIHBhcmFtZXRlcnNcbiAgICB2YXIgJGxhdGl0dWRlID0gNDIuMDkwMjk3LFxuICAgICAgJGxvbmdpdHVkZSA9IC04OC4wNzU5ODIwMDAwMDAwMSxcbiAgICAgICRtYXBfem9vbSA9IDEyOyAvKiBaT09NIFNFVFRJTkcgKi9cblxuICAgIC8vIGN1c3RvbSBtYXJrZXJcbiAgICB2YXIgJG1hcmtlcl91cmwgPSAnLi4vaW1nL2dvb2dsZS1tYXAtbWFya2VyLnBuZyc7XG5cbiAgICAvLyBwYXN0ZWQgdGhlIHN0eWxlZCBtYXBzIGRlZmluaXRpb25cbiAgICB2YXIgc3R5bGUgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6XCIzOVwifSx7XCJsaWdodG5lc3NcIjpcIjExXCJ9LHtcImNvbG9yXCI6XCIjOTlkZWU5XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiaHVlXCI6XCIjN2QwMGZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOjM2fSx7XCJjb2xvclwiOlwiIzMzMzMzM1wifSx7XCJsaWdodG5lc3NcIjo0MH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmVmZWZlXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZlZmVmZVwifSx7XCJsaWdodG5lc3NcIjoxN30se1wid2VpZ2h0XCI6MS4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNjZDNjM2NcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNjEzNzM3XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjdjNzcwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubmF0dXJhbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifSx7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzA4YjdiZVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM1OWIxYjVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyYmUzYlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kucGFya1wiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjIxfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzcyM2Y4M1wifSx7XCJ3ZWlnaHRcIjpcIjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJ3ZWlnaHRcIjpcIjFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoxN30se1wiY29sb3JcIjpcIiNmMmJlM2JcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjI5fSx7XCJ3ZWlnaHRcIjowLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxOH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn0se1wibGlnaHRuZXNzXCI6MTl9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTd9LHtcImNvbG9yXCI6XCIjZjVmNWY1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzY0MWM3Y1wifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifV19XVxuXG4gICAgLy8gc2V0IGdvb2dsZSBtYXAgb3B0aW9uc1xuICAgIHZhciBtYXBfb3B0aW9ucyA9IHtcbiAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgem9vbTogJG1hcF96b29tLFxuICAgICAgcGFuQ29udHJvbDogdHJ1ZSxcbiAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRydWUsXG4gICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgc3R5bGVzOiBzdHlsZVxuICAgIH07XG5cbiAgICAvLyBpbml6aWFsaXplIHRoZSBtYXBcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZ2xlLWNvbnRhaW5lcicpLCBtYXBfb3B0aW9ucyk7XG5cbiAgICAvL2FkZCBhIGN1c3RvbSBtYXJrZXIgdG8gdGhlIG1hcFxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCRsYXRpdHVkZSwgJGxvbmdpdHVkZSksXG4gICAgICBtYXA6IG1hcCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBpY29uOiAkbWFya2VyX3VybFxuICAgIH0pO1xuICB9KVxufVxuXG4vLyBQQUdFID4+PiBkb25hdGVcbkFwcC5zdWJtaXREb25hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGRvbmF0ZUZvcm0gPSAkKCcjZG9uYXRlLWZvcm0nKTtcblxuICAkZG9uYXRlRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgJGZvcm0gPSAkKHRoaXMpO1xuICAgIHZhciAkc3Bpbm5lckNvbnRhaW5lciA9ICQoJy5zcGlubmVyLWNvbnRhaW5lcicpO1xuICAgIHZhciAkc3Bpbm5lciA9ICQoJzxpLz4nLCB7XG4gICAgICBjbGFzczogJ2ZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLXNwaW4gZmEtMnggZmEtZncnXG4gICAgfSk7XG4gICAgdmFyICRzck9ubHkgPSAkKCc8c3Bhbi8+Jywge1xuICAgICAgY2xhc3M6ICdzci1vbmx5J1xuICAgIH0pO1xuICAgICRzcGlubmVyQ29udGFpbmVyLmFwcGVuZCgkc3Bpbm5lcikuYXBwZW5kKCRzck9ubHkpO1xuICAgICRmb3JtLmZpbmQoJy5idG4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBzdHJpcGVUb2tlblxuICAgIFN0cmlwZS5jYXJkLmNyZWF0ZVRva2VuKCRmb3JtLCBzdHJpcGVSZXNwb25zZUhhbmRsZXIpO1xuICB9KVxuXG4gIC8vIGNhbGxiYWNrIGhhbmRsZXIgdGhhdCBlaXRoZXIgaW5zZXJ0cyBlcnJvcnMgb3IgYXR0YWNoZXNcbiAgLy8gc3RyaXBlVG9rZW4gdG8gaGlkZGVuIGlucHV0LCB0aGVuIHN1Ym1pdHMgZm9ybVxuICBmdW5jdGlvbiBzdHJpcGVSZXNwb25zZUhhbmRsZXIoc3RhdHVzLCByZXNwb25zZSkge1xuICAgIHZhciAkZm9ybSA9ICRkb25hdGVGb3JtO1xuXG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICRmb3JtLmZpbmQoJy5wYXltZW50LWVycm9ycycpLnRleHQocmVzcG9uc2UuZXJyb3IubWVzc2FnZSk7XG4gICAgICAkZm9ybS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICB2YXIgdG9rZW4gPSByZXNwb25zZS5pZDtcbiAgICAgIC8vIEluc2VydCB0aGUgdG9rZW4gaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic3RyaXBlVG9rZW5cIiAvPicpLnZhbCh0b2tlbikpO1xuICAgICAgLy8gYW5kIHN1Ym1pdFxuICAgICAgJGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5BcHAudHlwZXIoJy5ubC10eXBlcicpO1xuQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG5BcHAudG9rZW5GaWVsZCgnI2VkaXQtYmxvZy10b2tlbmZpZWxkJyk7XG5BcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbkFwcC5uYXZiYXIoKTtcbkFwcC5wdXNoTWVudSgpO1xuQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQoKTtcbkFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzKCk7XG5BcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlc01lc3NhZ2UoKTtcbkFwcC5wcm9ncmFtU2xpZGVyKCk7XG5BcHAuaW1hZ2VHYWxsZXJ5KCk7XG5BcHAuaW1hZ2VTbGlkZXIoKTsgLy8gZm9yIGphbWVzIGluZGV4XG5BcHAudHdpdHRlclNsaWRlcigpO1xuQXBwLmNvdW50VG8oJCgnLmFjaGl2ZW1lbnRzIC50aW1lcicpKTtcbkFwcC5hZG1pblBhZ2VSZW5kZXJlcigpO1xuQXBwLmdvb2dsZU1hcCgpO1xuQXBwLnN1Ym1pdERvbmF0aW9uKCk7XG5cbiIsIlxuXG5leHBvcnQgZGVmYXVsdCAoaGkpID0+IHtcbiAgY29uc29sZS5sb2coJ2VsbG8gZnJvbSBpbmRleFBhZ2UhISEgJywgaGkpXG59XG4iXX0=
