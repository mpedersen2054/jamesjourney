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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYWdlcy9pbmRleFBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7QUFFQSx5QkFBTSxNQUFOOztBQUVBLElBQUksTUFBTSxPQUFPLEVBQVA7O0FBRVYsT0FBTyxpQkFBUCxDQUF5QixrQ0FBekI7OztBQUlBLElBQUksS0FBSixHQUFZLFVBQVMsSUFBVCxFQUFlO0FBQ3pCLElBQUUsSUFBRixFQUFRLEtBQVIsQ0FBYztBQUNaLGFBQVMsQ0FDUCxvQkFETyxFQUVQLG9DQUZPLEVBR1AscUNBSE8sQ0FBVDtBQUtBLGVBQVcsQ0FBWDtBQUNBLFVBQU0sSUFBTjtBQUNBLGVBQVcsSUFBWDtBQUNBLGVBQVcsQ0FBQyxDQUFEO0FBQ1gsZ0JBQVksS0FBWjtHQVZGLEVBRHlCO0NBQWY7OztBQWdCWixJQUFJLFVBQUosR0FBaUIsVUFBUyxJQUFULEVBQWU7QUFDOUIsSUFBRSxJQUFGLEVBQVEsVUFBUixDQUFtQjs7Ozs7QUFLakIsNkJBQXlCLElBQXpCO0dBTEYsRUFEOEI7Q0FBZjs7O0FBV2pCLElBQUksbUJBQUosR0FBMEIsWUFBVztBQUNuQyxNQUFJLFVBQUosQ0FEbUM7QUFFbkMsTUFBSSxTQUFrQixHQUFsQixDQUYrQjtBQUduQyxNQUFJLGtCQUFrQixFQUFFLHdCQUFGLENBQWxCLENBSCtCO0FBSW5DLE1BQUksZ0JBQWtCLEVBQUUsZ0JBQUYsQ0FBbEIsQ0FKK0I7QUFLbkMsTUFBSSxVQUFrQixFQUFFLHFCQUFGLENBQWxCLENBTCtCO0FBTW5DLE1BQUksY0FBa0IsRUFBRSx5QkFBRixDQUFsQixDQU4rQjs7QUFRbkMsa0JBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVc7QUFDckMsaUJBQWEsZ0JBQWdCLEdBQWhCLEdBQXNCLE1BQXRCLENBRHdCO0FBRXJDLGdCQUFZLElBQVosQ0FBaUIsVUFB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QUFJLFVBQUosQ0FBZSxzQkFBZjtBQUNBLElBQUksVUFBSixDQUFlLHVCQUFmO0FBQ0EsSUFBSSxtQkFBSjtBQUNBLElBQUksWUFBSixDQUFpQix3Q0FBakI7QUFDQSxJQUFJLE1BQUo7QUFDQSxJQUFJLFFBQUo7QUFDQSxJQUFJLG1CQUFKO0FBQ0EsSUFBSSx5QkFBSjtBQUNBLElBQUksZ0NBQUo7QUFDQSxJQUFJLGFBQUo7QUFDQSxJQUFJLFlBQUo7QUFDQSxJQUFJLFdBQUo7QUFDQSxJQUFJLGFBQUo7QUFDQSxJQUFJLE9BQUosQ0FBWSxFQUFFLHFCQUFGLENBQVo7QUFDQSxJQUFJLGlCQUFKO0FBQ0EsSUFBSSxTQUFKO0FBQ0EsSUFBSSxjQUFKOzs7Ozs7Ozs7a0JDaHFCZSxVQUFDLEVBQUQsRUFBUTtBQUNyQixVQUFRLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxFQUF2QyxFQURxQjtDQUFSIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuaW1wb3J0IGhlbGxvIGZyb20gJy4vcGFnZXMvaW5kZXhQYWdlJ1xuXG5oZWxsbygnbWF0dCcpXG5cbnZhciBBcHAgPSBBcHAgfHwge307XG5cblN0cmlwZS5zZXRQdWJsaXNoYWJsZUtleSgncGtfdGVzdF92ZGR1Q01DVmY3MjNZMUUwSHBHNDNqMzInKTtcblxuXG4vLyBQQUdFID4+PiBub3Qgc3BlY2lmaWVkXG5BcHAudHlwZXIgPSBmdW5jdGlvbihlbGVtKSB7XG4gICQoZWxlbSkudHlwZWQoe1xuICAgIHN0cmluZ3M6IFtcbiAgICAgICdzdXBwb3J0IG91ciBjYXVzZS4nLFxuICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgJ2hlbHAgbWFrZSB0aGUgd29ybGQgYSBiZXR0ZXIgcGxhY2UuJ1xuICAgIF0sXG4gICAgdHlwZVNwZWVkOiAwLFxuICAgIGxvb3A6IHRydWUsXG4gICAgYmFja0RlbGF5OiAzMDAwLFxuICAgIGJhY2tTcGVlZDogLTUsXG4gICAgc2hvd0N1cnNvcjogZmFsc2VcbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IG5ld19ibG9nLCBlZGl0X2Jsb2dcbkFwcC50b2tlbkZpZWxkID0gZnVuY3Rpb24oZWxlbSkge1xuICAkKGVsZW0pLnRva2VuZmllbGQoe1xuICAgIC8vIGF1dG9jb21wbGV0ZToge1xuICAgIC8vICAgc291cmNlOiBbJ3JlZCcsJ2JsdWUnLCdncmVlbicsJ3llbGxvdycsJ3Zpb2xldCcsJ2Jyb3duJywncHVycGxlJywnYmxhY2snLCd3aGl0ZSddLFxuICAgIC8vICAgZGVsYXk6IDEwMFxuICAgIC8vIH0sXG4gICAgc2hvd0F1dG9jb21wbGV0ZU9uRm9jdXM6IHRydWVcbiAgfSlcbn1cblxuLy8gUEFHRSA+Pj4gbmV3X2Jsb2csIGVkaXRfYmxvZ1xuQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGN1cnJlbnROdW07XG4gIHZhciBtYXhOdW0gICAgICAgICAgPSA2MDA7XG4gIHZhciAkY29udGVudFByZXZpZXcgPSAkKCcuY29udGVudC1wcmV2aWV3LWlucHV0Jyk7XG4gIHZhciAkY3VycmVudENvdW50ICAgPSAkKCcuY3VycmVudC1jb3VudCcpO1xuICB2YXIgJG1heE51bSAgICAgICAgID0gJCgnLmN1cnJlbnQtY291bnRfX21heCcpO1xuICB2YXIgJGN1cnJlbnROdW0gICAgID0gJCgnLmN1cnJlbnQtY291bnRfX2N1cnJlbnQnKTtcblxuICAkY29udGVudFByZXZpZXcub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgY3VycmVudE51bSA9ICRjb250ZW50UHJldmlldy52YWwoKS5sZW5ndGg7XG4gICAgJGN1cnJlbnROdW0udGV4dChjdXJyZW50TnVtKTtcbiAgfSlcbn1cblxuLy8gUEFHRSA+Pj4gYmxvZ3MsIHNob3dfYmxvZ1xuQXBwLnNjcm9sbEZvbGxvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgJChlbGVtKS5zaW1wbGVTY3JvbGxGb2xsb3coe1xuICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IGFsbCBwYWdlc1xuQXBwLm5hdmJhciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG5hdmJhciA9ICQoJ2hlYWRlcicpO1xuICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgdmFyICRsb2dvID0gJCgnI2hlYWRlci1sb2dvLWxpbmsnKTtcbiAgdmFyICRtZW51ID0gJCgnI2hlYWRlci1tZW51LWxpbmsnKTtcblxuICAkd2luZG93Lm9uKCdzY3JvbGwgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gY29uc29sZS5sb2coJCh0aGlzKS5zY3JvbGxUb3AoKSlcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwKSB7XG4gICAgICAkbmF2YmFyLmFkZENsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyNkZGQnIH0pXG4gICAgICAkbG9nby5jc3MoeyBvcGFjaXR5OiAnMC44JywgaGVpZ2h0OiAnNDBweCcgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRuYXZiYXIucmVtb3ZlQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnIzk5OScgfSlcbiAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwJywgaGVpZ2h0OiAnNjBweCcgfSlcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBQQUdFID4+PiBhbGwgcGFnZXNcbkFwcC5wdXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJG5hdmJhckJ0biAgPSAkKCdhI2hlYWRlci1tZW51LWxpbmsnKTtcbiAgdmFyICRtYWluQ29udCAgID0gJCgnLm1haW4tY29udCcpO1xuICB2YXIgJHNpdGVIZWFkZXIgPSAkKCdoZWFkZXIuc2l0ZS1oZWFkZXInKTtcbiAgdmFyICRuYXZNZW51ICAgID0gJCgnI25hdi1tZW51Jyk7XG5cbiAgLy8gbWVudSBsaW5rIGNsaWNrZWRcbiAgJG5hdmJhckJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAvLyBpZiBtYWluLWNvbnQgaGFzIGNsYXNzIC5wdXNoLXJpZ2h0IHRoZW4gcmVtb3ZlIGl0XG4gICAgaWYgKCRtYWluQ29udC5oYXNDbGFzcygncHVzaC1yaWdodCcpKSB7XG4gICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM5OTknIH0pO1xuICAgICAgJG5hdk1lbnVcbiAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzBweCcgfSwgMjAwKVxuICAgICAgJG1haW5Db250XG4gICAgICAgIC5yZW1vdmVDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgIC5hbmltYXRlKHsgbGVmdDogJzBweCcgfSwgMjAwKVxuICAgIH1cbiAgICAvLyBhZGQgaXQgaWYgdGhlcmUgaXNudCAucHVzaC1yaWdodFxuICAgIGVsc2Uge1xuICAgICAgaWYgKCEkc2l0ZUhlYWRlci5oYXNDbGFzcygnd2l0aC1iZycpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdubyBiZycpXG4gICAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzRkYWZjZicgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkdGhpcy5jc3MoeyAnY29sb3InOiAnI2ZmZicgfSlcbiAgICAgIH1cblxuICAgICAgJG5hdk1lbnVcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMzAwcHgnIH0sIDIwMClcbiAgICAgICRtYWluQ29udFxuICAgICAgICAuYWRkQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBQQUdFID4+PiBzaG93X2V2ZW50XG5BcHAuc3VibWl0UmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJHJlZ2lzdGVyRm9ybSA9ICQoJyNldmVudC1yZWdpc3Rlci1mb3JtJyk7XG4gIHZhciAkZk5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZmlyc3QtbmFtZScpO1xuICB2YXIgJGxOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmxhc3QtbmFtZScpO1xuICB2YXIgJGVtYWlsICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmVtYWlsJyk7XG4gIHZhciAkbWVzc2FnZSAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubWVzc2FnZScpO1xuICB2YXIgJHNsdWcgICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmhpZGRlbi1zbHVnJyk7XG4gIHZhciAkdHNoaXJ0U2l6ZSAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKFwic2VsZWN0W25hbWU9J3RTaGlydFNpemUnXVwiKTtcbiAgdmFyICRyZWdTdWNjZXNzICAgPSAkKCcucmVnaXN0ZXItc3VjY2VzcycpO1xuICB2YXIgJHJlZ0Vycm9yICAgICA9ICQoJy5yZWdpc3Rlci1lcnJvcicpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0Rm9ybShyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICRyZWdTdWNjZXNzLmFwcGVuZCgnPGRpdj4nK3Jlc3VsdC5tZXNzYWdlKyc8L2Rpdj4nKTtcbiAgICAgICRyZWdTdWNjZXNzLnNob3coKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkcmVnRXJyb3IuYXBwZW5kKCc8ZGl2PicrcmVzdWx0Lm1lc3NhZ2UrJzwvZGl2PicpO1xuICAgICAgJHJlZ0Vycm9yLnNob3coKTtcbiAgICB9XG4gICAgJGZOYW1lLnZhbCgnJyk7XG4gICAgJGxOYW1lLnZhbCgnJyk7XG4gICAgJGVtYWlsLnZhbCgnJyk7XG4gICAgJG1lc3NhZ2UudmFsKCcnKTtcbiAgICAkc2x1Zy52YWwoJycpO1xuICB9XG5cbiAgJHJlZ2lzdGVyRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgZl9uYW1lOiAgICAkZk5hbWUudmFsKCksXG4gICAgICBsX25hbWU6ICAgICRsTmFtZS52YWwoKSxcbiAgICAgIGZ1bGxfbmFtZTogJC50cmltKCRmTmFtZS52YWwoKSkgKyAnICcgKyAkLnRyaW0oJGxOYW1lLnZhbCgpKSxcbiAgICAgIGVtYWlsOiAgICAgJGVtYWlsLnZhbCgpLFxuICAgICAgbWVzc2FnZTogICAkbWVzc2FnZS52YWwoKSxcbiAgICAgIHNsdWc6ICAgICAgJHNsdWcudmFsKCksXG4gICAgICB0c2hpcnQ6ICAgICR0c2hpcnRTaXplLnZhbCgpXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAkLnBvc3QoJy9ldmVudHMvJytkYXRhLnNsdWcrJy9yZWdpc3RlcicsIGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgLy8gY2FsbCBmdW5jIGJhc2VkIG9uIHdlYXRoZXIgb3Igbm90IHJlcy5zZW5kKHRydWUpXG4gICAgICByZXN1bHQgPyByZXNldEZvcm0ocmVzdWx0KSA6IHJlc2V0Rm9ybShyZXN1bHQpO1xuICAgIH0pO1xuXG4gIH0pO1xufVxuXG4vLyBQQUdFID4+PiBhZG1pbl9wYWdlXG5BcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGNyZWF0ZWRBdCA9ICQoJy5hdHRlbmRlZV9fY3JlYXRlZC1hdCcpO1xuICB2YXIgJGF0dGVuZGVlTWVzc2FnZSA9ICQoJy5hdHRlbmRlZV9fbWVzc2FnZScpO1xuICB2YXIgJHZpZXdBdHRlbmRlZXNCdG4gPSAkKCcuYnRuLWF0dGVuZGVlcycpO1xuICB2YXIgJGF0dGVuZGVlUm93ID0gJCgnLmF0dGVuZGVlLXJvdywgLmF0dGVuZGVlLW1ldGEtcm93Jyk7XG4gIHZhciBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG5cbiAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggYXR0ZW5kZWVcbiAgLy8gdGFrZSBlYWNoIGRhdGEtY3JlYXRlZGF0LCBjYWxsIHRvRGF0ZVN0cmluZ1xuICAvLyB0aGVuIGFwcGVuZCBiYWNrIG9udG8gX19jcmVhdGVkLWF0XG4gICRjcmVhdGVkQXQuZWFjaChmdW5jdGlvbihjYUVsZW0pIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBkYXRlRGF0YSA9ICR0aGlzLmRhdGEoJ2NyZWF0ZWRhdCcpO1xuICAgIGNvbnNvbGUubG9nKGRhdGVEYXRhKVxuICAgIHZhciBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZURhdGEpO1xuICAgICR0aGlzLmFwcGVuZChkYXRlU3RyaW5nLnRvRGF0ZVN0cmluZygpKTtcbiAgfSk7XG5cbiAgLy8gY2xpY2sgZXZlbnQgZm9yIHZpZXcgYXR0ZW5kZWVzXG4gICR2aWV3QXR0ZW5kZWVzQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIWF0dFJvd1Nob3dpbmcpIHtcbiAgICAgIC8vIHNob3cgYXR0Um93XG4gICAgICBhdHRSb3dTaG93aW5nID0gdHJ1ZTtcbiAgICAgICRhdHRlbmRlZVJvdy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpZGUgYXR0Um93XG4gICAgICBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG4gICAgICAkYXR0ZW5kZWVSb3cuaGlkZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbkFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzTWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJHBvcG92ZXJzID0gJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpO1xuICAkcG9wb3ZlcnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICRwb3BvdmVycy5wb3BvdmVyKCdoaWRlJyk7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJHRoaXMucG9wb3Zlcignc2hvdycpO1xuICB9KVxufVxuXG4vLyBQQUdFID4+PiBpbmRleFxuQXBwLnByb2dyYW1TbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRwU2xpZGVyICA9ICQoJyNwcm9ncmFtcy1zbGlkZXInKTtcbiAgdmFyICRwcm9nQWxsICA9ICRwU2xpZGVyLmZpbmQoJ2EucHJvZ3JhbScpO1xuICB2YXIgJHByb2cxICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0xJyk7XG4gIHZhciAkcHJvZzIgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTInKTtcbiAgdmFyICRwcm9nMyAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMycpO1xuICB2YXIgJHByb2c0ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW00Jyk7XG4gIHZhciAkcHJvZzUgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTUnKTtcbiAgdmFyICRzYXRJbWcgICA9ICRwU2xpZGVyLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJyk7XG4gIHZhciAkZGVzYXRJbWcgPSAkcFNsaWRlci5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJyk7XG5cblxuICAkcHJvZ0FsbC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgIC8vIHNhbWUgYWNjcm9zcyBhbGwgcHJvZ3JhbXNcbiAgICAvLyBoaWRlIGRlc2F0IGltZywgc2hvdyBzYXQgaW1nXG4gICAgJHRoaXNcbiAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgLmVuZCgpXG4gICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuXG4gICAgLy8gaWYgc2NlbmFyaW8gcHJvZ3JhbVhcbiAgICAvLyBtYWtlIGNvbnRlbnQgd2lkdGggMTAwJVxuICAgIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTEnKSkge1xuICAgICAgJHRoaXNcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgLy8gcHVzaCBhbGwgb3ZlciA0JVxuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyNCUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0NCUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2NCUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4NCUnIH0pO1xuICAgIH1cblxuICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMicpKSB7XG4gICAgICAkdGhpc1xuICAgICAgICAuY3NzKHsgbGVmdDogJzE4JScgfSlcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgLy8gbGVmdCAtMiUgcHVzaCBhbGwgdG8gdGhlIHJpZ2h0IDIlXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQyJScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0zJykpIHtcbiAgICAgICR0aGlzXG4gICAgICAgIC5jc3MoeyBsZWZ0OiAnMzglJyB9KVxuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG4gICAgfVxuXG4gICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW00JykpIHtcbiAgICAgICR0aGlzXG4gICAgICAgIC5jc3MoeyBsZWZ0OiAnNTglJyB9KVxuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM4JScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG5cbiAgICB9XG5cbiAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTUnKSkge1xuICAgICAgJHRoaXNcbiAgICAgICAgLmNzcyh7IGxlZnQ6ICc3NiUnIH0pXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgIC8vIHB1c2ggYWxsIHRvIHRoZSBsZWZ0IC00JVxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctNCUnIH0pO1xuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxNiUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczNiUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc1NiUnIH0pO1xuXG4gICAgfVxuICB9KVxuXG4gICRwcm9nQWxsLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIGhpZGUgYWxsIHNhdC1pbWcsIHNob3cgYWxsIGRlc2F0LWltZ1xuICAgICRwcm9nQWxsXG4gICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAuZW5kKClcbiAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcbiAgICAgIC5lbmQoKVxuICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgIC5jc3MoeyB3aWR0aDogJzgwJScgfSlcblxuICAgIC8vIHJldHVybiBhbGwgcHJvZ2FtcyB0byB0aGVpclxuICAgIC8vIG5vcm1hbCBzdGF0ZVxuICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnMCUnIH0pO1xuICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjAlJyB9KTtcbiAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQwJScgfSk7XG4gICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MCUnIH0pO1xuICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODAlJyB9KTtcbiAgfSlcbn1cblxuLy8gUEFHRSA+Pj4gaW5kZXhcbkFwcC5pbWFnZUdhbGxlcnkgPSBmdW5jdGlvbigpIHtcbiAgLy8gb25jZSBhbGwgdGhlIGltYWdlcyBhcmUgYWxsIGxvYWRlZCBpbml0IG1hc29ucnkgd2l0aCBvcHRpb25zXG4gIHZhciAkZ3JpZCA9ICQoJyNnYWxsZXJpZXMgLmdyaWQnKS5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgJGdyaWQubWFzb25yeSh7XG4gICAgICBpdGVtU2VsZWN0b3I6ICAgICcuZ3JpZC1pdGVtJyxcbiAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGNvbHVtbldpZHRoOiAgICAgJy5ncmlkLXNpemVyJyxcbiAgICAgIGd1dHRlcjogICAgICAgICAgNVxuICAgIH0pO1xuICB9KTtcblxuICAkKCcuZmFuY3lib3gnKS5mYW5jeWJveCh7XG4gICAgZml0VG9WaWV3OiB0cnVlLFxuICAgIGNsb3NlQnRuOiAgdHJ1ZSxcbiAgICBwYWRkaW5nOiAgICc2MHB4IDBweCAzMHB4IDBweCcsXG4gICAgLy8gd2lkdGg6ICAnNjAlJyxcbiAgICAvLyBoZWlnaHQ6ICc2MCUnLFxuICAgIG1heFdpZHRoOiAgMTIwMCxcbiAgICBtYXhIZWlnaHQ6IDU2MFxuICB9KTtcbn1cblxuLy8gYWNjZXB0cyBhcnJheSBvZiBpbWcgbGlua3MgYW5kIGNyZWF0ZXNcbi8vIHNsaWRlciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgYmV0d2VlbiB0aGVtXG4vLyBQQUdFID4+PiBpbmRleFxuQXBwLmltYWdlU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkc2xpZGVyID0gJCgndWwjc2xpZGVyJyk7XG5cbiAgdmFyIGltZ0xpbmtzID0gW1xuICAgICdodHRwOi8vaS5pbWd1ci5jb20vOWFNVEJ3VS5qcGcnLFxuICAgICdodHRwOi8vaS5pbWd1ci5jb20vVTRKZk9yYi5qcGcnLFxuICAgICdodHRwOi8vaS5pbWd1ci5jb20vVzMweEJzTC5qcGcnLFxuICAgICdodHRwOi8vaS5pbWd1ci5jb20veDY5QThHRC5qcGcnXG4gIF07XG5cbiAgLy8gYnVpbGQgRXNsaWRlciBET00sIHBhc3MgYW5pbWF0ZVNsaWRlciBhc1xuICAvLyBjYWxsYmFjayB0byBkbyB3aGVuIGFuaW1hdGVTbGlkZXIgaXMgZG9uZVxuICBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgYW5pbWF0ZVNsaWRlcik7XG5cbiAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlcihlcnIpIHtcbiAgICB2YXIgJHNsaWRlSXRlbXMgPSAkKCcuc2xpZGVyX19pdGVtJyk7XG4gICAgdmFyIHNsaWRlckxlbiA9ICRzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgICAgY291bnQgPSAwLFxuICAgICAgICBpdGVtO1xuXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBpZiBhdCBlbmQgb2YgYXJyYXksIHJldHVybiBjb3VudCB0byAwXG4gICAgICAoY291bnQgPT09IHNsaWRlckxlbiAtIDEpID8gY291bnQgPSAwIDogY291bnQrKztcbiAgICAgIC8vIHJlbW92ZSAuc2hvdyBmcm9tIGFsbCBzbGlkZV9faXRlbSdzXG4gICAgICAkc2xpZGVJdGVtcy5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgLy8gZmluZCBlbGVtZW50IGJhc2VkIG9uIGl0cyBkYXRhLXRlc3RpbmdcbiAgICAgIC8vIGF0dHIgdGhlbiBhZGQgLnNob3csIHJlcGVhdCBzSVxuICAgICAgaXRlbSA9ICQoXCJsaS5zbGlkZXJfX2l0ZW1bZGF0YS1wb3NpdGlvbj0nXCIrY291bnQrXCInXVwiKTtcbiAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3Nob3cnKTtcblxuICAgIH0sIDQwMDApO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNsaWRlckFyciA9IFtdXG5cbiAgICAvLyByZXR1cm4gZXJyb3IgaWYgbm8gaW1nTGlua3Mgb3IgaW1nTGlua3MgIT09IEFycmF5XG4gICAgaWYgKCFpbWdMaW5rcyB8fCAhKGltZ0xpbmtzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICB2YXIgZXJyID0gJ3RoZXJlIHdhcyBhbiBlcnJvciEnO1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgbGlzdCBhbmQgY3JlYXRlIDxpbWc+XG4gICAgLy8gaW1hZ2UgYW5kIHRodW1ibmFpbCBoYXZlIGRpZmZlcmVudCB3L2ggJiBjbGFzc1xuICAgIGZvciAodmFyIGk9MDsgaTxpbWdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGxpbmsgPSBpbWdMaW5rc1tpXTtcbiAgICAgIHZhciBpbWFnZSA9IG5ld0ltYWdlKGxpbmssIGZhbHNlKTtcbiAgICAgIHZhciB0aHVtYm5haWwgPSBuZXdJbWFnZShsaW5rLCB0cnVlKTtcblxuICAgICAgLy8geyBpbWFnZTogJCguLi4pLCB0aHVtYm5haWw6ICQoLi4uKSB9XG4gICAgICBzbGlkZXJBcnIucHVzaCh7XG4gICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgdGh1bWJuYWlsOiB0aHVtYm5haWxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIG9uY2Ugc2xpZGVyQXJyIGRvbmUsIGNyZWF0ZSBhIGxpLnNsaWRlX19pdGVtLFxuICAgIC8vIGFwcGVuZCB0aGUgaW1hZ2UgaW50byB0aGUgbGksIHRoZW4gYXBwZW5kIGxpIG9udG8gI3NsaWRlclxuICAgIGZvciAodmFyIGk9MDsgaTxzbGlkZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbWcgID0gc2xpZGVyQXJyW2ldLmltYWdlO1xuICAgICAgdmFyIGl0ZW0gPSAkKCc8bGkvPicsIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NsaWRlcl9faXRlbScsXG4gICAgICAgICdkYXRhLXBvc2l0aW9uJzogaVxuICAgICAgfSlcblxuICAgICAgaXRlbS5hcHBlbmQoaW1nKTtcbiAgICAgICRzbGlkZXIuYXBwZW5kKGl0ZW0pO1xuICAgIH1cblxuICAgIC8vIGFsbCB3ZW50IHdlbGxcbiAgICBjYWxsYmFjayhudWxsKTtcbiAgfVxuXG4gIC8vIHJldHVybnMgbmV3IGltZyBlbGVtZW50IHdpdGggc3JjPWltZ0xpbmtcbiAgZnVuY3Rpb24gbmV3SW1hZ2UoaW1nTGluaywgaXNUaHVtYm5haWwpIHtcbiAgICByZXR1cm4gJCgnPGltZy8+Jywge1xuICAgICAgJ3NyYyc6IGltZ0xpbmssXG4gICAgICAnY2xhc3MnOiAncy1pbWcnXG4gICAgfSk7XG4gIH1cblxufVxuXG4vLyBQQUdFID4+PiBub3Qgc3BlY2lmaWVkXG5BcHAudHdpdHRlclNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJGluZGljYXRvcnNVbCA9ICQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyk7XG4gIHZhciAkaW5uZXJDYXJvdXNlbCA9ICQoJy5jYXJvdXNlbC1pbm5lcicpO1xuXG4gIHZhciB0d2VldHMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICcxIENsYXJpdGFzIGVzdCBldGlhbSBwcm9jZXNzdXMgZHluYW1pY3VzLCBxdWkgc2VxdWl0dXIgbXV0YXRpb25lbSBjb25zdWV0dWRpdW0gbGVjdG9ydW0uIE1pcnVtIGVzdCBub3RhcmUgcXVhbSAuLi4nLFxuICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnMiBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJzMgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICB1cmw6ICdodHRwOi8vdC5jby83Rm9WU1AwdklmJ1xuICAgIH1cbiAgXVxuXG4gIGZvciAodmFyIGk9MDsgaTx0d2VldHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGRhdGEgPSB0d2VldHNbaV07XG4gICAgdmFyICRpbmRpY2F0b3IgPSBjcmVhdGVJbmRpY2F0b3IoaSk7XG4gICAgdmFyICRpdGVtID0gY3JlYXRlSXRlbSh0ZGF0YS50aXRsZSwgdGRhdGEudXJsLCBpKVxuXG4gICAgJGluZGljYXRvcnNVbC5hcHBlbmQoJGluZGljYXRvcik7XG4gICAgJGlubmVyQ2Fyb3VzZWwuYXBwZW5kKCRpdGVtKTtcbiAgfVxuXG4gICQoJy5jYXJvdXNlbCcpLmNhcm91c2VsKHtcbiAgICBpbnRlcnZhbDogMzAwMFxuICB9KTtcblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvcihjb3VudCkge1xuICAgIHZhciBpbmRpID0gJCgnPGxpLz4nLCB7XG4gICAgICAnZGF0YS10YXJnZXQnOiAnI3R3aXR0ZXItc2xpZGVyJyxcbiAgICAgICdkYXRhLXNsaWRlLXRvJzogY291bnRcbiAgICB9KVxuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBpbmRpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHdlZXRUZXh0LCB0d2VldFVybCwgY291bnQpIHtcbiAgICB2YXIgaXRlbSA9ICQoJzxkaXYvPicsIHtcbiAgICAgICdjbGFzcyc6ICdpdGVtJ1xuICAgIH0pO1xuICAgIHZhciBwYXJhID0gJCgnPHAvPicpLnRleHQodHdlZXRUZXh0KTtcbiAgICB2YXIgYW5jaCA9ICQoJzxhLz4nLCB7XG4gICAgICAnaHJlZic6IHR3ZWV0VXJsXG4gICAgfSkudGV4dCh0d2VldFVybCk7XG5cbiAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtLmFwcGVuZChwYXJhKS5hcHBlbmQoYW5jaCk7XG4gIH1cbn1cblxuLy8gUEFHRSA+Pj4gYWJvdXRfdXNcbkFwcC5jb3VudFRvID0gZnVuY3Rpb24oZWxlbSkge1xuICBlbGVtLmNvdW50VG8oJ3RvZ2dsZScpO1xufVxuXG4vLyBQQUdFID4+PiBhZG1pbl9wYWdlXG5BcHAuYWRtaW5QYWdlUmVuZGVyZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRhZG1pblNlY3Rpb25zICAgPSAkKCcuYWRtaW4tc2VjdGlvbicpO1xuICB2YXIgJGFkbWluQWxsICAgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19hbGwnKTtcbiAgdmFyICRhZG1pbkJsb2dzICAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fYmxvZ3MnKTtcbiAgdmFyICRhZG1pbkV2ZW50cyAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fZXZlbnRzJyk7XG4gIHZhciAkYWRtaW5TdWJzICAgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX3N1YnNjcmliZXJzJyk7XG4gIHZhciAkYWRtaW5JbWFnZXMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2dhbGxlcnknKTtcbiAgdmFyICRhZG1pbkRvbmF0aW9ucyAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fZG9uYXRpb25zJyk7XG5cbiAgdmFyICRhZG1pbkxpbmtzICAgICAgPSAkKCcuYWRtaW4tbGluaycpO1xuICB2YXIgJGFkbWluTGlua0FsbCAgICA9ICQoJy5hZG1pbi1saW5rX19hbGwnKTtcbiAgdmFyICRhZG1pbkxpbmtCbG9ncyAgPSAkKCcuYWRtaW4tbGlua19fYmxvZ3MnKTtcbiAgdmFyICRhZG1pbkxpbmtFdmVudHMgPSAkKCcuYWRtaW4tbGlua19fZXZlbnRzJyk7XG4gIHZhciAkYWRtaW5MaW5rU3VicyAgID0gJCgnLmFkbWluLWxpbmtfX3N1YnNjcmliZXJzJyk7XG4gIHZhciAkYWRtaW5MaW5rSW1hZ2VzID0gJCgnLmFkbWluLWxpbmtfX2dhbGxlcnknKTtcbiAgdmFyICRhZG1pbkxpbmtEb25hdGlvbnMgPSAkKCcuYWRtaW4tbGlua19fZG9uYXRpb25zJyk7XG5cblxuICAvLyBoYXZlIHRoZSBgYWxsYCBiZSB0aGUgaW5pdGlhbCBzdGF0ZVxuICAkYWRtaW5MaW5rQWxsLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgJGFkbWluQWxsLmFkZENsYXNzKCdzaG93Jyk7XG5cblxuICAkYWRtaW5MaW5rcy5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gLmFkbWluLWxpbmtfX1hYWFxuICAgIHZhciAkY2xpY2tlZCA9ICQodGhpcyk7XG5cbiAgICAvLyByZW1vdmUgYWxsIHNob3dlZCBhbmQgYWRkIGBhY3RpdmVgXG4gICAgLy8gdG8gdGhlIGNsaWNrZWQgbGlua1xuICAgICRhZG1pblNlY3Rpb25zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgJGFkbWluTGlua3MucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICRhZG1pblNlY3Rpb25zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgJGNsaWNrZWQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cblxuICAgIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rQWxsWzBdKSB7XG4gICAgICAkYWRtaW5BbGwuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0Jsb2dzWzBdKSB7XG4gICAgICAkYWRtaW5CbG9ncy5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rRXZlbnRzWzBdKSB7XG4gICAgICAkYWRtaW5FdmVudHMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua1N1YnNbMF0pIHtcbiAgICAgICRhZG1pblN1YnMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0ltYWdlc1swXSkge1xuICAgICAgJGFkbWluSW1hZ2VzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtEb25hdGlvbnNbMF0pIHtcbiAgICAgICRhZG1pbkRvbmF0aW9ucy5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgfSlcblxufVxuXG4vLyBQQUdFID4+PiBjb250YWN0X3VzXG5BcHAuZ29vZ2xlTWFwID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlcXVpcmVkIHNvIGVycm9yIGRvZXNudCBzaG93LCBzaG91bGQgZXZlbnR1YWxseVxuICAvLyBwdXQgYWxsIGNhbGxzIHRvIEFwcCBpbnNpZGUgLmxvYWRcbiAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBzZXQgeW91ciBnb29nbGUgbWFwcyBwYXJhbWV0ZXJzXG4gICAgdmFyICRsYXRpdHVkZSA9IDQyLjA5MDI5NyxcbiAgICAgICRsb25naXR1ZGUgPSAtODguMDc1OTgyMDAwMDAwMDEsXG4gICAgICAkbWFwX3pvb20gPSAxMjsgLyogWk9PTSBTRVRUSU5HICovXG5cbiAgICAvLyBjdXN0b20gbWFya2VyXG4gICAgdmFyICRtYXJrZXJfdXJsID0gJy4uL2ltZy9nb29nbGUtbWFwLW1hcmtlci5wbmcnO1xuXG4gICAgLy8gcGFzdGVkIHRoZSBzdHlsZWQgbWFwcyBkZWZpbml0aW9uXG4gICAgdmFyIHN0eWxlID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOlwiMzlcIn0se1wibGlnaHRuZXNzXCI6XCIxMVwifSx7XCJjb2xvclwiOlwiIzk5ZGVlOVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImh1ZVwiOlwiIzdkMDBmZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjozNn0se1wiY29sb3JcIjpcIiMzMzMzMzNcIn0se1wibGlnaHRuZXNzXCI6NDB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZlZmVmZVwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZWZlZmVcIn0se1wibGlnaHRuZXNzXCI6MTd9LHtcIndlaWdodFwiOjEuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjY2QzYzNjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzYxMzczN1wifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2Y3Yzc3MFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubWFuX21hZGVcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm5hdHVyYWxcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5tZWRpY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwOGI3YmVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNTliMWI1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5tZWRpY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmJlM2JcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLnBhcmtcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM3MjNmODNcIn0se1wid2VpZ2h0XCI6XCIyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wid2VpZ2h0XCI6XCIxXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTd9LHtcImNvbG9yXCI6XCIjZjJiZTNiXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjE3fSx7XCJjb2xvclwiOlwiI2Y1ZjVmNVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM2NDFjN2NcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn1dfV1cblxuICAgIC8vIHNldCBnb29nbGUgbWFwIG9wdGlvbnNcbiAgICB2YXIgbWFwX29wdGlvbnMgPSB7XG4gICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJGxhdGl0dWRlLCAkbG9uZ2l0dWRlKSxcbiAgICAgIHpvb206ICRtYXBfem9vbSxcbiAgICAgIHBhbkNvbnRyb2w6IHRydWUsXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgIHN0cmVldFZpZXdDb250cm9sOiB0cnVlLFxuICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcbiAgICAgIHN0eWxlczogc3R5bGVcbiAgICB9O1xuXG4gICAgLy8gaW5pemlhbGl6ZSB0aGUgbWFwXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1jb250YWluZXInKSwgbWFwX29wdGlvbnMpO1xuXG4gICAgLy9hZGQgYSBjdXN0b20gbWFya2VyIHRvIHRoZSBtYXBcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgbWFwOiBtYXAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaWNvbjogJG1hcmtlcl91cmxcbiAgICB9KTtcbiAgfSlcbn1cblxuLy8gUEFHRSA+Pj4gZG9uYXRlXG5BcHAuc3VibWl0RG9uYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyICRkb25hdGVGb3JtID0gJCgnI2RvbmF0ZS1mb3JtJyk7XG5cbiAgJGRvbmF0ZUZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyICRmb3JtID0gJCh0aGlzKTtcbiAgICB2YXIgJHNwaW5uZXJDb250YWluZXIgPSAkKCcuc3Bpbm5lci1jb250YWluZXInKTtcbiAgICB2YXIgJHNwaW5uZXIgPSAkKCc8aS8+Jywge1xuICAgICAgY2xhc3M6ICdmYSBmYS1jaXJjbGUtby1ub3RjaCBmYS1zcGluIGZhLTJ4IGZhLWZ3J1xuICAgIH0pO1xuICAgIHZhciAkc3JPbmx5ID0gJCgnPHNwYW4vPicsIHtcbiAgICAgIGNsYXNzOiAnc3Itb25seSdcbiAgICB9KTtcbiAgICAkc3Bpbm5lckNvbnRhaW5lci5hcHBlbmQoJHNwaW5uZXIpLmFwcGVuZCgkc3JPbmx5KTtcbiAgICAkZm9ybS5maW5kKCcuYnRuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgc3RyaXBlVG9rZW5cbiAgICBTdHJpcGUuY2FyZC5jcmVhdGVUb2tlbigkZm9ybSwgc3RyaXBlUmVzcG9uc2VIYW5kbGVyKTtcbiAgfSlcblxuICAvLyBjYWxsYmFjayBoYW5kbGVyIHRoYXQgZWl0aGVyIGluc2VydHMgZXJyb3JzIG9yIGF0dGFjaGVzXG4gIC8vIHN0cmlwZVRva2VuIHRvIGhpZGRlbiBpbnB1dCwgdGhlbiBzdWJtaXRzIGZvcm1cbiAgZnVuY3Rpb24gc3RyaXBlUmVzcG9uc2VIYW5kbGVyKHN0YXR1cywgcmVzcG9uc2UpIHtcbiAgICB2YXIgJGZvcm0gPSAkZG9uYXRlRm9ybTtcblxuICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAkZm9ybS5maW5kKCcucGF5bWVudC1lcnJvcnMnKS50ZXh0KHJlc3BvbnNlLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgJGZvcm0uZmluZCgnYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgdmFyIHRva2VuID0gcmVzcG9uc2UuaWQ7XG4gICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgJGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInN0cmlwZVRva2VuXCIgLz4nKS52YWwodG9rZW4pKTtcbiAgICAgIC8vIGFuZCBzdWJtaXRcbiAgICAgICRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICB9XG4gIH07XG59XG5cblxuQXBwLnR5cGVyKCcubmwtdHlwZXInKTtcbkFwcC50b2tlbkZpZWxkKCcjbmV3LWJsb2ctdG9rZW5maWVsZCcpO1xuQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQoKTtcbkFwcC5zY3JvbGxGb2xsb3coJyNzaG93LWJsb2cgLm9uLXJpZ2h0LCAjYmxvZ3MgLm9uLXJpZ2h0Jyk7XG5BcHAubmF2YmFyKCk7XG5BcHAucHVzaE1lbnUoKTtcbkFwcC5zdWJtaXRSZWdpc3RlckV2ZW50KCk7XG5BcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXNNZXNzYWdlKCk7XG5BcHAucHJvZ3JhbVNsaWRlcigpO1xuQXBwLmltYWdlR2FsbGVyeSgpO1xuQXBwLmltYWdlU2xpZGVyKCk7IC8vIGZvciBqYW1lcyBpbmRleFxuQXBwLnR3aXR0ZXJTbGlkZXIoKTtcbkFwcC5jb3VudFRvKCQoJy5hY2hpdmVtZW50cyAudGltZXInKSk7XG5BcHAuYWRtaW5QYWdlUmVuZGVyZXIoKTtcbkFwcC5nb29nbGVNYXAoKTtcbkFwcC5zdWJtaXREb25hdGlvbigpO1xuXG4iLCJcblxuZXhwb3J0IGRlZmF1bHQgKGhpKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdlbGxvIGZyb20gaW5kZXhQYWdlISEhICcsIGhpKVxufVxuIl19
