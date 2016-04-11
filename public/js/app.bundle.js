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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9wYWdlcy9pbmRleFBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7Ozs7QUFFQSx5QkFBTSxNQUFOOztBQUVBLElBQUksTUFBTSxPQUFPLEVBQVA7O0FBRVYsT0FBTyxpQkFBUCxDQUF5QixrQ0FBekI7OztBQUdBLElBQUksS0FBSixHQUFZLFVBQVMsSUFBVCxFQUFlO0FBQ3pCLElBQUUsSUFBRixFQUFRLEtBQVIsQ0FBYztBQUNaLGFBQVMsQ0FDUCxvQkFETyxFQUVQLG9DQUZPLEVBR1AscUNBSE8sQ0FBVDtBQUtBLGVBQVcsQ0FBWDtBQUNBLFVBQU0sSUFBTjtBQUNBLGVBQVcsSUFBWDtBQUNBLGVBQVcsQ0FBQyxDQUFEO0FBQ1gsZ0JBQVksS0FBWjtHQVZGLEVBRHlCO0NBQWY7OztBQWdCWixJQUFJLFVBQUosR0FBaUIsVUFBUyxJQUFULEVBQWU7QUFDOUIsSUFBRSxJQUFGLEVBQVEsVUFBUixDQUFtQjs7Ozs7QUFLakIsNkJBQXlCLElBQXpCO0dBTEYsRUFEOEI7Q0FBZjs7O0FBV2pCLElBQUksbUJBQUosR0FBMEIsWUFBVztBQUNuQyxNQUFJLFVBQUosQ0FEbUM7QUFFbkMsTUFBSSxTQUFrQixHQUFsQixDQUYrQjtBQUduQyxNQUFJLGtCQUFrQixFQUFFLHdCQUFGLENBQWxCLENBSCtCO0FBSW5DLE1BQUksZ0JBQWtCLEVBQUUsZ0JBQUYsQ0FBbEIsQ0FKK0I7QUFLbkMsTUFBSSxVQUFrQixFQUFFLHFCQUFGLENBQWxCLENBTCtCO0FBTW5DLE1BQUksY0FBa0IsRUFBRSx5QkFBRixDQUFsQixDQU4rQjs7QUFRbkMsa0JBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVc7QUFDckMsaUJBQWEsZ0JBQWdCLEdBQWhCLEdBQXNCLE1BQXRCLENBRHdCO0FBRXJDLGdCQUFZLElBQVosQ0FBaUIsVUFB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RDtBQUMvQyxRQUFJLFFBQVEsV0FBUixDQUQyQzs7QUFHL0MsUUFBSSxTQUFTLEtBQVQsRUFBZ0I7O0FBRWxCLFlBQU0sSUFBTixDQUFXLGlCQUFYLEVBQThCLElBQTlCLENBQW1DLFNBQVMsS0FBVCxDQUFlLE9BQWYsQ0FBbkMsQ0FGa0I7QUFHbEIsWUFBTSxJQUFOLENBQVcsUUFBWCxFQUFxQixJQUFyQixDQUEwQixVQUExQixFQUFzQyxLQUF0QyxFQUhrQjtLQUFwQixNQUlPOztBQUVMLFVBQUksUUFBUSxTQUFTLEVBQVQ7O0FBRlAsV0FJTCxDQUFNLE1BQU4sQ0FBYSxFQUFFLDRDQUFGLEVBQWdELEdBQWhELENBQW9ELEtBQXBELENBQWI7O0FBSkssV0FNTCxDQUFNLEdBQU4sQ0FBVSxDQUFWLEVBQWEsTUFBYixHQU5LO0tBSlA7R0FIRixDQWI4QjtDQUFYOztBQWdDckIsSUFBSSxLQUFKLENBQVUsV0FBVjtBQUNBLElBQUksVUFBSixDQUFlLHNCQUFmO0FBQ0EsSUFBSSxVQUFKLENBQWUsdUJBQWY7QUFDQSxJQUFJLG1CQUFKO0FBQ0EsSUFBSSxZQUFKLENBQWlCLHdDQUFqQjtBQUNBLElBQUksTUFBSjtBQUNBLElBQUksUUFBSjtBQUNBLElBQUksbUJBQUo7QUFDQSxJQUFJLHlCQUFKO0FBQ0EsSUFBSSxhQUFKO0FBQ0EsSUFBSSxZQUFKO0FBQ0EsSUFBSSxXQUFKO0FBQ0EsSUFBSSxhQUFKO0FBQ0EsSUFBSSxPQUFKLENBQVksRUFBRSxxQkFBRixDQUFaO0FBQ0EsSUFBSSxpQkFBSjtBQUNBLElBQUksU0FBSjtBQUNBLElBQUksY0FBSjs7Ozs7Ozs7O2tCQzNvQmUsVUFBQyxFQUFELEVBQVE7QUFDckIsVUFBUSxHQUFSLENBQVkseUJBQVosRUFBdUMsRUFBdkMsRUFEcUI7Q0FBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmltcG9ydCBoZWxsbyBmcm9tICcuL3BhZ2VzL2luZGV4UGFnZSdcblxuaGVsbG8oJ21hdHQnKVxuXG52YXIgQXBwID0gQXBwIHx8IHt9O1xuXG5TdHJpcGUuc2V0UHVibGlzaGFibGVLZXkoJ3BrX3Rlc3RfdmRkdUNNQ1ZmNzIzWTFFMEhwRzQzajMyJyk7XG5cbi8vIFBBR0UgPj4+IG5vdCBzcGVjaWZpZWRcbkFwcC50eXBlciA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgJChlbGVtKS50eXBlZCh7XG4gICAgc3RyaW5nczogW1xuICAgICAgJ3N1cHBvcnQgb3VyIGNhdXNlLicsXG4gICAgICAncmVjaWV2ZSByZWd1bGFyIHVwZGF0ZXMgb24gZXZlbnRzLicsXG4gICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgXSxcbiAgICB0eXBlU3BlZWQ6IDAsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBiYWNrRGVsYXk6IDMwMDAsXG4gICAgYmFja1NwZWVkOiAtNSxcbiAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICB9KTtcbn1cblxuLy8gUEFHRSA+Pj4gbmV3X2Jsb2csIGVkaXRfYmxvZ1xuQXBwLnRva2VuRmllbGQgPSBmdW5jdGlvbihlbGVtKSB7XG4gICQoZWxlbSkudG9rZW5maWVsZCh7XG4gICAgLy8gYXV0b2NvbXBsZXRlOiB7XG4gICAgLy8gICBzb3VyY2U6IFsncmVkJywnYmx1ZScsJ2dyZWVuJywneWVsbG93JywndmlvbGV0JywnYnJvd24nLCdwdXJwbGUnLCdibGFjaycsJ3doaXRlJ10sXG4gICAgLy8gICBkZWxheTogMTAwXG4gICAgLy8gfSxcbiAgICBzaG93QXV0b2NvbXBsZXRlT25Gb2N1czogdHJ1ZVxuICB9KVxufVxuXG4vLyBQQUdFID4+PiBuZXdfYmxvZywgZWRpdF9ibG9nXG5BcHAuY29udGVudFByZXZpZXdDb3VudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY3VycmVudE51bTtcbiAgdmFyIG1heE51bSAgICAgICAgICA9IDYwMDtcbiAgdmFyICRjb250ZW50UHJldmlldyA9ICQoJy5jb250ZW50LXByZXZpZXctaW5wdXQnKTtcbiAgdmFyICRjdXJyZW50Q291bnQgICA9ICQoJy5jdXJyZW50LWNvdW50Jyk7XG4gIHZhciAkbWF4TnVtICAgICAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fbWF4Jyk7XG4gIHZhciAkY3VycmVudE51bSAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fY3VycmVudCcpO1xuXG4gICRjb250ZW50UHJldmlldy5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICBjdXJyZW50TnVtID0gJGNvbnRlbnRQcmV2aWV3LnZhbCgpLmxlbmd0aDtcbiAgICAkY3VycmVudE51bS50ZXh0KGN1cnJlbnROdW0pO1xuICB9KVxufVxuXG4vLyBQQUdFID4+PiBibG9ncywgc2hvd19ibG9nXG5BcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAkKGVsZW0pLnNpbXBsZVNjcm9sbEZvbGxvdyh7XG4gICAgbGltaXRfZWxlbTogJy5vbi1sZWZ0J1xuICB9KTtcbn1cblxuLy8gUEFHRSA+Pj4gYWxsIHBhZ2VzXG5BcHAubmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbmF2YmFyID0gJCgnaGVhZGVyJyk7XG4gIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuICB2YXIgJGxvZ28gPSAkKCcjaGVhZGVyLWxvZ28tbGluaycpO1xuICB2YXIgJG1lbnUgPSAkKCcjaGVhZGVyLW1lbnUtbGluaycpO1xuXG4gICR3aW5kb3cub24oJ3Njcm9sbCBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNjcm9sbFRvcCgpKVxuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjApIHtcbiAgICAgICRuYXZiYXIuYWRkQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnI2RkZCcgfSlcbiAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwLjgnLCBoZWlnaHQ6ICc0MHB4JyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgJG1lbnUuY3NzKHsgY29sb3I6ICcjOTk5JyB9KVxuICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAnLCBoZWlnaHQ6ICc2MHB4JyB9KVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IGFsbCBwYWdlc1xuQXBwLnB1c2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkbmF2YmFyQnRuICA9ICQoJ2EjaGVhZGVyLW1lbnUtbGluaycpO1xuICB2YXIgJG1haW5Db250ICAgPSAkKCcubWFpbi1jb250Jyk7XG4gIHZhciAkc2l0ZUhlYWRlciA9ICQoJ2hlYWRlci5zaXRlLWhlYWRlcicpO1xuICB2YXIgJG5hdk1lbnUgICAgPSAkKCcjbmF2LW1lbnUnKTtcblxuICAvLyBtZW51IGxpbmsgY2xpY2tlZFxuICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgIC8vIGlmIG1haW4tY29udCBoYXMgY2xhc3MgLnB1c2gtcmlnaHQgdGhlbiByZW1vdmUgaXRcbiAgICBpZiAoJG1haW5Db250Lmhhc0NsYXNzKCdwdXNoLXJpZ2h0JykpIHtcbiAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzk5OScgfSk7XG4gICAgICAkbmF2TWVudVxuICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMHB4JyB9LCAyMDApXG4gICAgICAkbWFpbkNvbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnMHB4JyB9LCAyMDApXG4gICAgfVxuICAgIC8vIGFkZCBpdCBpZiB0aGVyZSBpc250IC5wdXNoLXJpZ2h0XG4gICAgZWxzZSB7XG4gICAgICBpZiAoISRzaXRlSGVhZGVyLmhhc0NsYXNzKCd3aXRoLWJnJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIGJnJylcbiAgICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjNGRhZmNmJyB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICR0aGlzLmNzcyh7ICdjb2xvcic6ICcjZmZmJyB9KVxuICAgICAgfVxuXG4gICAgICAkbmF2TWVudVxuICAgICAgICAuc2hvdygpXG4gICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICczMDBweCcgfSwgMjAwKVxuICAgICAgJG1haW5Db250XG4gICAgICAgIC5hZGRDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgIC5hbmltYXRlKHsgbGVmdDogJy0zMDBweCcgfSwgMjAwKVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IHNob3dfZXZlbnRcbkFwcC5zdWJtaXRSZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgdmFyICRmTmFtZSAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5maXJzdC1uYW1lJyk7XG4gIHZhciAkbE5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubGFzdC1uYW1lJyk7XG4gIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgdmFyICRtZXNzYWdlICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5tZXNzYWdlJyk7XG4gIHZhciAkc2x1ZyAgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuaGlkZGVuLXNsdWcnKTtcbiAgdmFyICR0c2hpcnRTaXplICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoXCJzZWxlY3RbbmFtZT0ndFNoaXJ0U2l6ZSddXCIpO1xuICB2YXIgJHJlZ1N1Y2Nlc3MgICA9ICQoJy5yZWdpc3Rlci1zdWNjZXNzJyk7XG4gIHZhciAkcmVnRXJyb3IgICAgID0gJCgnLnJlZ2lzdGVyLWVycm9yJyk7XG5cbiAgZnVuY3Rpb24gcmVzZXRGb3JtKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgJHJlZ1N1Y2Nlc3MuYXBwZW5kKCc8ZGl2PicrcmVzdWx0Lm1lc3NhZ2UrJzwvZGl2PicpO1xuICAgICAgJHJlZ1N1Y2Nlc3Muc2hvdygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICRyZWdFcnJvci5hcHBlbmQoJzxkaXY+JytyZXN1bHQubWVzc2FnZSsnPC9kaXY+Jyk7XG4gICAgICAkcmVnRXJyb3Iuc2hvdygpO1xuICAgIH1cbiAgICAkZk5hbWUudmFsKCcnKTtcbiAgICAkbE5hbWUudmFsKCcnKTtcbiAgICAkZW1haWwudmFsKCcnKTtcbiAgICAkbWVzc2FnZS52YWwoJycpO1xuICAgICRzbHVnLnZhbCgnJyk7XG4gIH1cblxuICAkcmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBmX25hbWU6ICAgICRmTmFtZS52YWwoKSxcbiAgICAgIGxfbmFtZTogICAgJGxOYW1lLnZhbCgpLFxuICAgICAgZnVsbF9uYW1lOiAkLnRyaW0oJGZOYW1lLnZhbCgpKSArICcgJyArICQudHJpbSgkbE5hbWUudmFsKCkpLFxuICAgICAgZW1haWw6ICAgICAkZW1haWwudmFsKCksXG4gICAgICBtZXNzYWdlOiAgICRtZXNzYWdlLnZhbCgpLFxuICAgICAgc2x1ZzogICAgICAkc2x1Zy52YWwoKSxcbiAgICAgIHRzaGlydDogICAgJHRzaGlydFNpemUudmFsKClcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAvLyBjYWxsIGZ1bmMgYmFzZWQgb24gd2VhdGhlciBvciBub3QgcmVzLnNlbmQodHJ1ZSlcbiAgICAgIHJlc3VsdCA/IHJlc2V0Rm9ybShyZXN1bHQpIDogcmVzZXRGb3JtKHJlc3VsdCk7XG4gICAgfSk7XG5cbiAgfSk7XG59XG5cbi8vIFBBR0UgPj4+IGFkbWluX3BhZ2VcbkFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkY3JlYXRlZEF0ID0gJCgnLmF0dGVuZGVlX19jcmVhdGVkLWF0Jyk7XG4gIHZhciAkYXR0ZW5kZWVNZXNzYWdlID0gJCgnLmF0dGVuZGVlX19tZXNzYWdlJyk7XG4gIHZhciAkdmlld0F0dGVuZGVlc0J0biA9ICQoJy5idG4tYXR0ZW5kZWVzJyk7XG4gIHZhciAkYXR0ZW5kZWVSb3cgPSAkKCcuYXR0ZW5kZWUtcm93LCAuYXR0ZW5kZWUtbWV0YS1yb3cnKTtcbiAgdmFyIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcblxuICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBhdHRlbmRlZVxuICAvLyB0YWtlIGVhY2ggZGF0YS1jcmVhdGVkYXQsIGNhbGwgdG9EYXRlU3RyaW5nXG4gIC8vIHRoZW4gYXBwZW5kIGJhY2sgb250byBfX2NyZWF0ZWQtYXRcbiAgJGNyZWF0ZWRBdC5lYWNoKGZ1bmN0aW9uKGNhRWxlbSkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGRhdGVEYXRhID0gJHRoaXMuZGF0YSgnY3JlYXRlZGF0Jyk7XG4gICAgY29uc29sZS5sb2coZGF0ZURhdGEpXG4gICAgdmFyIGRhdGVTdHJpbmcgPSBuZXcgRGF0ZShkYXRlRGF0YSk7XG4gICAgJHRoaXMuYXBwZW5kKGRhdGVTdHJpbmcudG9EYXRlU3RyaW5nKCkpO1xuICB9KTtcblxuICAvLyBjbGljayBldmVudCBmb3IgdmlldyBhdHRlbmRlZXNcbiAgJHZpZXdBdHRlbmRlZXNCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghYXR0Um93U2hvd2luZykge1xuICAgICAgLy8gc2hvdyBhdHRSb3dcbiAgICAgIGF0dFJvd1Nob3dpbmcgPSB0cnVlO1xuICAgICAgJGF0dGVuZGVlUm93LnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlkZSBhdHRSb3dcbiAgICAgIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gUEFHRSA+Pj4gaW5kZXhcbkFwcC5wcm9ncmFtU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkcFNsaWRlciAgPSAkKCcjcHJvZ3JhbXMtc2xpZGVyJyk7XG4gIHZhciAkcHJvZ0FsbCAgPSAkcFNsaWRlci5maW5kKCdhLnByb2dyYW0nKTtcbiAgdmFyICRwcm9nMSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMScpO1xuICB2YXIgJHByb2cyICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0yJyk7XG4gIHZhciAkcHJvZzMgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTMnKTtcbiAgdmFyICRwcm9nNCAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNCcpO1xuICB2YXIgJHByb2c1ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW01Jyk7XG4gIHZhciAkc2F0SW1nICAgPSAkcFNsaWRlci5maW5kKCcuc2F0dXJhdGVkLWltZycpO1xuICB2YXIgJGRlc2F0SW1nID0gJHBTbGlkZXIuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpO1xuXG5cbiAgJHByb2dBbGwub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAvLyBzYW1lIGFjY3Jvc3MgYWxsIHByb2dyYW1zXG4gICAgLy8gaGlkZSBkZXNhdCBpbWcsIHNob3cgc2F0IGltZ1xuICAgICR0aGlzXG4gICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgIC5lbmQoKVxuICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcblxuICAgIC8vIGlmIHNjZW5hcmlvIHByb2dyYW1YXG4gICAgLy8gbWFrZSBjb250ZW50IHdpZHRoIDEwMCVcbiAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0xJykpIHtcbiAgICAgICR0aGlzXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgIC8vIHB1c2ggYWxsIG92ZXIgNCVcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjQlJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDQlJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjQlJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODQlJyB9KTtcbiAgICB9XG5cbiAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTInKSkge1xuICAgICAgJHRoaXNcbiAgICAgICAgLmNzcyh7IGxlZnQ6ICcxOCUnIH0pXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgIC8vIGxlZnQgLTIlIHB1c2ggYWxsIHRvIHRoZSByaWdodCAyJVxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MiUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgIH1cblxuICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMycpKSB7XG4gICAgICAkdGhpc1xuICAgICAgICAuY3NzKHsgbGVmdDogJzM4JScgfSlcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgIH1cblxuICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtNCcpKSB7XG4gICAgICAkdGhpc1xuICAgICAgICAuY3NzKHsgbGVmdDogJzU4JScgfSlcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczOCUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW01JykpIHtcbiAgICAgICR0aGlzXG4gICAgICAgIC5jc3MoeyBsZWZ0OiAnNzYlJyB9KVxuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAvLyBwdXNoIGFsbCB0byB0aGUgbGVmdCAtNCVcbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTQlJyB9KTtcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTYlJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnMzYlJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNTYlJyB9KTtcblxuICAgIH1cbiAgfSlcblxuICAkcHJvZ0FsbC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBoaWRlIGFsbCBzYXQtaW1nLCBzaG93IGFsbCBkZXNhdC1pbWdcbiAgICAkcHJvZ0FsbFxuICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgLmVuZCgpXG4gICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAuZW5kKClcbiAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAuY3NzKHsgd2lkdGg6ICc4MCUnIH0pXG5cbiAgICAvLyByZXR1cm4gYWxsIHByb2dhbXMgdG8gdGhlaXJcbiAgICAvLyBub3JtYWwgc3RhdGVcbiAgICAkcHJvZzEuY3NzKHsgbGVmdDogJzAlJyB9KTtcbiAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzIwJScgfSk7XG4gICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MCUnIH0pO1xuICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjAlJyB9KTtcbiAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgwJScgfSk7XG4gIH0pXG59XG5cbi8vIFBBR0UgPj4+IGluZGV4XG5BcHAuaW1hZ2VHYWxsZXJ5ID0gZnVuY3Rpb24oKSB7XG4gIC8vIG9uY2UgYWxsIHRoZSBpbWFnZXMgYXJlIGFsbCBsb2FkZWQgaW5pdCBtYXNvbnJ5IHdpdGggb3B0aW9uc1xuICB2YXIgJGdyaWQgPSAkKCcjZ2FsbGVyaWVzIC5ncmlkJykuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICRncmlkLm1hc29ucnkoe1xuICAgICAgaXRlbVNlbGVjdG9yOiAgICAnLmdyaWQtaXRlbScsXG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBjb2x1bW5XaWR0aDogICAgICcuZ3JpZC1zaXplcicsXG4gICAgICBndXR0ZXI6ICAgICAgICAgIDVcbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnLmZhbmN5Ym94JykuZmFuY3lib3goe1xuICAgIGZpdFRvVmlldzogdHJ1ZSxcbiAgICBjbG9zZUJ0bjogIHRydWUsXG4gICAgcGFkZGluZzogICAnNjBweCAwcHggMzBweCAwcHgnLFxuICAgIC8vIHdpZHRoOiAgJzYwJScsXG4gICAgLy8gaGVpZ2h0OiAnNjAlJyxcbiAgICBtYXhXaWR0aDogIDEyMDAsXG4gICAgbWF4SGVpZ2h0OiA1NjBcbiAgfSk7XG59XG5cbi8vIGFjY2VwdHMgYXJyYXkgb2YgaW1nIGxpbmtzIGFuZCBjcmVhdGVzXG4vLyBzbGlkZXIgZWxlbWVudHMgYW5kIGFuaW1hdGVzIGJldHdlZW4gdGhlbVxuLy8gUEFHRSA+Pj4gaW5kZXhcbkFwcC5pbWFnZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgJHNsaWRlciA9ICQoJ3VsI3NsaWRlcicpO1xuXG4gIHZhciBpbWdMaW5rcyA9IFtcbiAgICAnaHR0cDovL2kuaW1ndXIuY29tLzlhTVRCd1UuanBnJyxcbiAgICAnaHR0cDovL2kuaW1ndXIuY29tL1U0SmZPcmIuanBnJyxcbiAgICAnaHR0cDovL2kuaW1ndXIuY29tL1czMHhCc0wuanBnJyxcbiAgICAnaHR0cDovL2kuaW1ndXIuY29tL3g2OUE4R0QuanBnJ1xuICBdO1xuXG4gIC8vIGJ1aWxkIEVzbGlkZXIgRE9NLCBwYXNzIGFuaW1hdGVTbGlkZXIgYXNcbiAgLy8gY2FsbGJhY2sgdG8gZG8gd2hlbiBhbmltYXRlU2xpZGVyIGlzIGRvbmVcbiAgYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGFuaW1hdGVTbGlkZXIpO1xuXG4gIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZXIoZXJyKSB7XG4gICAgdmFyICRzbGlkZUl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScpO1xuICAgIHZhciBzbGlkZXJMZW4gPSAkc2xpZGVJdGVtcy5sZW5ndGgsXG4gICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgaXRlbTtcblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaWYgYXQgZW5kIG9mIGFycmF5LCByZXR1cm4gY291bnQgdG8gMFxuICAgICAgKGNvdW50ID09PSBzbGlkZXJMZW4gLSAxKSA/IGNvdW50ID0gMCA6IGNvdW50Kys7XG4gICAgICAvLyByZW1vdmUgLnNob3cgZnJvbSBhbGwgc2xpZGVfX2l0ZW0nc1xuICAgICAgJHNsaWRlSXRlbXMucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIC8vIGZpbmQgZWxlbWVudCBiYXNlZCBvbiBpdHMgZGF0YS10ZXN0aW5nXG4gICAgICAvLyBhdHRyIHRoZW4gYWRkIC5zaG93LCByZXBlYXQgc0lcbiAgICAgIGl0ZW0gPSAkKFwibGkuc2xpZGVyX19pdGVtW2RhdGEtcG9zaXRpb249J1wiK2NvdW50K1wiJ11cIik7XG4gICAgICBpdGVtLmFkZENsYXNzKCdzaG93Jyk7XG5cbiAgICB9LCA0MDAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkU2xpZGVyRG9tKGltZ0xpbmtzLCBjYWxsYmFjaykge1xuICAgIHZhciBzbGlkZXJBcnIgPSBbXVxuXG4gICAgLy8gcmV0dXJuIGVycm9yIGlmIG5vIGltZ0xpbmtzIG9yIGltZ0xpbmtzICE9PSBBcnJheVxuICAgIGlmICghaW1nTGlua3MgfHwgIShpbWdMaW5rcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgdmFyIGVyciA9ICd0aGVyZSB3YXMgYW4gZXJyb3IhJztcbiAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGxpc3QgYW5kIGNyZWF0ZSA8aW1nPlxuICAgIC8vIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgdy9oICYgY2xhc3NcbiAgICBmb3IgKHZhciBpPTA7IGk8aW1nTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaW5rID0gaW1nTGlua3NbaV07XG4gICAgICB2YXIgaW1hZ2UgPSBuZXdJbWFnZShsaW5rLCBmYWxzZSk7XG4gICAgICB2YXIgdGh1bWJuYWlsID0gbmV3SW1hZ2UobGluaywgdHJ1ZSk7XG5cbiAgICAgIC8vIHsgaW1hZ2U6ICQoLi4uKSwgdGh1bWJuYWlsOiAkKC4uLikgfVxuICAgICAgc2xpZGVyQXJyLnB1c2goe1xuICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgIHRodW1ibmFpbDogdGh1bWJuYWlsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBvbmNlIHNsaWRlckFyciBkb25lLCBjcmVhdGUgYSBsaS5zbGlkZV9faXRlbSxcbiAgICAvLyBhcHBlbmQgdGhlIGltYWdlIGludG8gdGhlIGxpLCB0aGVuIGFwcGVuZCBsaSBvbnRvICNzbGlkZXJcbiAgICBmb3IgKHZhciBpPTA7IGk8c2xpZGVyQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaW1nICA9IHNsaWRlckFycltpXS5pbWFnZTtcbiAgICAgIHZhciBpdGVtID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdzbGlkZXJfX2l0ZW0nLFxuICAgICAgICAnZGF0YS1wb3NpdGlvbic6IGlcbiAgICAgIH0pXG5cbiAgICAgIGl0ZW0uYXBwZW5kKGltZyk7XG4gICAgICAkc2xpZGVyLmFwcGVuZChpdGVtKTtcbiAgICB9XG5cbiAgICAvLyBhbGwgd2VudCB3ZWxsXG4gICAgY2FsbGJhY2sobnVsbCk7XG4gIH1cblxuICAvLyByZXR1cm5zIG5ldyBpbWcgZWxlbWVudCB3aXRoIHNyYz1pbWdMaW5rXG4gIGZ1bmN0aW9uIG5ld0ltYWdlKGltZ0xpbmssIGlzVGh1bWJuYWlsKSB7XG4gICAgcmV0dXJuICQoJzxpbWcvPicsIHtcbiAgICAgICdzcmMnOiBpbWdMaW5rLFxuICAgICAgJ2NsYXNzJzogJ3MtaW1nJ1xuICAgIH0pO1xuICB9XG5cbn1cblxuLy8gUEFHRSA+Pj4gbm90IHNwZWNpZmllZFxuQXBwLnR3aXR0ZXJTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyICRpbmRpY2F0b3JzVWwgPSAkKCcuY2Fyb3VzZWwtaW5kaWNhdG9ycycpO1xuICB2YXIgJGlubmVyQ2Fyb3VzZWwgPSAkKCcuY2Fyb3VzZWwtaW5uZXInKTtcblxuICB2YXIgdHdlZXRzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnMSBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJzIgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICB1cmw6ICdodHRwOi8vdC5jby83Rm9WU1AwdklmJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICczIENsYXJpdGFzIGVzdCBldGlhbSBwcm9jZXNzdXMgZHluYW1pY3VzLCBxdWkgc2VxdWl0dXIgbXV0YXRpb25lbSBjb25zdWV0dWRpdW0gbGVjdG9ydW0uIE1pcnVtIGVzdCBub3RhcmUgcXVhbSAuLi4nLFxuICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICB9XG4gIF1cblxuICBmb3IgKHZhciBpPTA7IGk8dHdlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRkYXRhID0gdHdlZXRzW2ldO1xuICAgIHZhciAkaW5kaWNhdG9yID0gY3JlYXRlSW5kaWNhdG9yKGkpO1xuICAgIHZhciAkaXRlbSA9IGNyZWF0ZUl0ZW0odGRhdGEudGl0bGUsIHRkYXRhLnVybCwgaSlcblxuICAgICRpbmRpY2F0b3JzVWwuYXBwZW5kKCRpbmRpY2F0b3IpO1xuICAgICRpbm5lckNhcm91c2VsLmFwcGVuZCgkaXRlbSk7XG4gIH1cblxuICAkKCcuY2Fyb3VzZWwnKS5jYXJvdXNlbCh7XG4gICAgaW50ZXJ2YWw6IDMwMDBcbiAgfSk7XG5cblxuICBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3IoY291bnQpIHtcbiAgICB2YXIgaW5kaSA9ICQoJzxsaS8+Jywge1xuICAgICAgJ2RhdGEtdGFyZ2V0JzogJyN0d2l0dGVyLXNsaWRlcicsXG4gICAgICAnZGF0YS1zbGlkZS10byc6IGNvdW50XG4gICAgfSlcblxuICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgaW5kaS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJdGVtKHR3ZWV0VGV4dCwgdHdlZXRVcmwsIGNvdW50KSB7XG4gICAgdmFyIGl0ZW0gPSAkKCc8ZGl2Lz4nLCB7XG4gICAgICAnY2xhc3MnOiAnaXRlbSdcbiAgICB9KTtcbiAgICB2YXIgcGFyYSA9ICQoJzxwLz4nKS50ZXh0KHR3ZWV0VGV4dCk7XG4gICAgdmFyIGFuY2ggPSAkKCc8YS8+Jywge1xuICAgICAgJ2hyZWYnOiB0d2VldFVybFxuICAgIH0pLnRleHQodHdlZXRVcmwpO1xuXG4gICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbS5hcHBlbmQocGFyYSkuYXBwZW5kKGFuY2gpO1xuICB9XG59XG5cbi8vIFBBR0UgPj4+IGFib3V0X3VzXG5BcHAuY291bnRUbyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgZWxlbS5jb3VudFRvKCd0b2dnbGUnKTtcbn1cblxuLy8gUEFHRSA+Pj4gYWRtaW5fcGFnZVxuQXBwLmFkbWluUGFnZVJlbmRlcmVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkYWRtaW5TZWN0aW9ucyAgID0gJCgnLmFkbWluLXNlY3Rpb24nKTtcbiAgdmFyICRhZG1pbkFsbCAgICAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fYWxsJyk7XG4gIHZhciAkYWRtaW5CbG9ncyAgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2Jsb2dzJyk7XG4gIHZhciAkYWRtaW5FdmVudHMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2V2ZW50cycpO1xuICB2YXIgJGFkbWluU3VicyAgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19zdWJzY3JpYmVycycpO1xuICB2YXIgJGFkbWluSW1hZ2VzICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19nYWxsZXJ5Jyk7XG4gIHZhciAkYWRtaW5Eb25hdGlvbnMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2RvbmF0aW9ucycpO1xuXG4gIHZhciAkYWRtaW5MaW5rcyAgICAgID0gJCgnLmFkbWluLWxpbmsnKTtcbiAgdmFyICRhZG1pbkxpbmtBbGwgICAgPSAkKCcuYWRtaW4tbGlua19fYWxsJyk7XG4gIHZhciAkYWRtaW5MaW5rQmxvZ3MgID0gJCgnLmFkbWluLWxpbmtfX2Jsb2dzJyk7XG4gIHZhciAkYWRtaW5MaW5rRXZlbnRzID0gJCgnLmFkbWluLWxpbmtfX2V2ZW50cycpO1xuICB2YXIgJGFkbWluTGlua1N1YnMgICA9ICQoJy5hZG1pbi1saW5rX19zdWJzY3JpYmVycycpO1xuICB2YXIgJGFkbWluTGlua0ltYWdlcyA9ICQoJy5hZG1pbi1saW5rX19nYWxsZXJ5Jyk7XG4gIHZhciAkYWRtaW5MaW5rRG9uYXRpb25zID0gJCgnLmFkbWluLWxpbmtfX2RvbmF0aW9ucycpO1xuXG5cbiAgLy8gaGF2ZSB0aGUgYGFsbGAgYmUgdGhlIGluaXRpYWwgc3RhdGVcbiAgJGFkbWluTGlua0FsbC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICRhZG1pbkFsbC5hZGRDbGFzcygnc2hvdycpO1xuXG5cbiAgJGFkbWluTGlua3Mub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIC5hZG1pbi1saW5rX19YWFhcbiAgICB2YXIgJGNsaWNrZWQgPSAkKHRoaXMpO1xuXG4gICAgLy8gcmVtb3ZlIGFsbCBzaG93ZWQgYW5kIGFkZCBgYWN0aXZlYFxuICAgIC8vIHRvIHRoZSBjbGlja2VkIGxpbmtcbiAgICAkYWRtaW5TZWN0aW9ucy5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICRhZG1pbkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkYWRtaW5TZWN0aW9ucy5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICRjbGlja2VkLmFkZENsYXNzKCdhY3RpdmUnKVxuXG5cbiAgICBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0FsbFswXSkge1xuICAgICAgJGFkbWluQWxsLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtCbG9nc1swXSkge1xuICAgICAgJGFkbWluQmxvZ3MuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0V2ZW50c1swXSkge1xuICAgICAgJGFkbWluRXZlbnRzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtTdWJzWzBdKSB7XG4gICAgICAkYWRtaW5TdWJzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtJbWFnZXNbMF0pIHtcbiAgICAgICRhZG1pbkltYWdlcy5hZGRDbGFzcygnc2hvdycpO1xuICAgIH1cbiAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rRG9uYXRpb25zWzBdKSB7XG4gICAgICAkYWRtaW5Eb25hdGlvbnMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICB9XG4gIH0pXG5cbn1cblxuLy8gUEFHRSA+Pj4gY29udGFjdF91c1xuQXBwLmdvb2dsZU1hcCA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXF1aXJlZCBzbyBlcnJvciBkb2VzbnQgc2hvdywgc2hvdWxkIGV2ZW50dWFsbHlcbiAgLy8gcHV0IGFsbCBjYWxscyB0byBBcHAgaW5zaWRlIC5sb2FkXG4gICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gc2V0IHlvdXIgZ29vZ2xlIG1hcHMgcGFyYW1ldGVyc1xuICAgIHZhciAkbGF0aXR1ZGUgPSA0Mi4wOTAyOTcsXG4gICAgICAkbG9uZ2l0dWRlID0gLTg4LjA3NTk4MjAwMDAwMDAxLFxuICAgICAgJG1hcF96b29tID0gMTI7IC8qIFpPT00gU0VUVElORyAqL1xuXG4gICAgLy8gY3VzdG9tIG1hcmtlclxuICAgIHZhciAkbWFya2VyX3VybCA9ICcuLi9pbWcvZ29vZ2xlLW1hcC1tYXJrZXIucG5nJztcblxuICAgIC8vIHBhc3RlZCB0aGUgc3R5bGVkIG1hcHMgZGVmaW5pdGlvblxuICAgIHZhciBzdHlsZSA9IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjpcIjM5XCJ9LHtcImxpZ2h0bmVzc1wiOlwiMTFcIn0se1wiY29sb3JcIjpcIiM5OWRlZTlcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJodWVcIjpcIiM3ZDAwZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6MzZ9LHtcImNvbG9yXCI6XCIjMzMzMzMzXCJ9LHtcImxpZ2h0bmVzc1wiOjQwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn0se1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTZ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZWZlZmVcIn0se1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmVmZWZlXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fSx7XCJ3ZWlnaHRcIjoxLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHNcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2NkM2MzY1wifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM2MTM3MzdcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmN2M3NzBcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm1hbl9tYWRlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjOGVkOGUxXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5uYXR1cmFsXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjOGVkOGUxXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjOGVkOGUxXCJ9LHtcImxpZ2h0bmVzc1wiOjIxfV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDhiN2JlXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5tZWRpY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzU5YjFiNVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJiZTNiXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5wYXJrXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNzIzZjgzXCJ9LHtcIndlaWdodFwiOlwiMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcIndlaWdodFwiOlwiMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjE3fSx7XCJjb2xvclwiOlwiI2YyYmUzYlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6Mjl9LHtcIndlaWdodFwiOjAuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE4fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmxvY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTZ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifSx7XCJsaWdodG5lc3NcIjoxOX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoxN30se1wiY29sb3JcIjpcIiNmNWY1ZjVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNjQxYzdjXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9XX1dXG5cbiAgICAvLyBzZXQgZ29vZ2xlIG1hcCBvcHRpb25zXG4gICAgdmFyIG1hcF9vcHRpb25zID0ge1xuICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKCRsYXRpdHVkZSwgJGxvbmdpdHVkZSksXG4gICAgICB6b29tOiAkbWFwX3pvb20sXG4gICAgICBwYW5Db250cm9sOiB0cnVlLFxuICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcbiAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsXG4gICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICBzdHlsZXM6IHN0eWxlXG4gICAgfTtcblxuICAgIC8vIGluaXppYWxpemUgdGhlIG1hcFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtY29udGFpbmVyJyksIG1hcF9vcHRpb25zKTtcblxuICAgIC8vYWRkIGEgY3VzdG9tIG1hcmtlciB0byB0aGUgbWFwXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJGxhdGl0dWRlLCAkbG9uZ2l0dWRlKSxcbiAgICAgIG1hcDogbWFwLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIGljb246ICRtYXJrZXJfdXJsXG4gICAgfSk7XG4gIH0pXG59XG5cbi8vIFBBR0UgPj4+IGRvbmF0ZVxuQXBwLnN1Ym1pdERvbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciAkZG9uYXRlRm9ybSA9ICQoJyNkb25hdGUtZm9ybScpO1xuXG4gICRkb25hdGVGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciAkZm9ybSA9ICQodGhpcyk7XG4gICAgJGZvcm0uZmluZCgnLmJ0bicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgLy8gY3JlYXRlIHRoZSBzdHJpcGVUb2tlblxuICAgIFN0cmlwZS5jYXJkLmNyZWF0ZVRva2VuKCRmb3JtLCBzdHJpcGVSZXNwb25zZUhhbmRsZXIpO1xuICB9KVxuXG4gIC8vIGNhbGxiYWNrIGhhbmRsZXIgdGhhdCBlaXRoZXIgaW5zZXJ0cyBlcnJvcnMgb3IgYXR0YWNoZXNcbiAgLy8gc3RyaXBlVG9rZW4gdG8gaGlkZGVuIGlucHV0LCB0aGVuIHN1Ym1pdHMgZm9ybVxuICBmdW5jdGlvbiBzdHJpcGVSZXNwb25zZUhhbmRsZXIoc3RhdHVzLCByZXNwb25zZSkge1xuICAgIHZhciAkZm9ybSA9ICRkb25hdGVGb3JtO1xuXG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICRmb3JtLmZpbmQoJy5wYXltZW50LWVycm9ycycpLnRleHQocmVzcG9uc2UuZXJyb3IubWVzc2FnZSk7XG4gICAgICAkZm9ybS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICB2YXIgdG9rZW4gPSByZXNwb25zZS5pZDtcbiAgICAgIC8vIEluc2VydCB0aGUgdG9rZW4gaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic3RyaXBlVG9rZW5cIiAvPicpLnZhbCh0b2tlbikpO1xuICAgICAgLy8gYW5kIHN1Ym1pdFxuICAgICAgJGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5BcHAudHlwZXIoJy5ubC10eXBlcicpO1xuQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG5BcHAudG9rZW5GaWVsZCgnI2VkaXQtYmxvZy10b2tlbmZpZWxkJyk7XG5BcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbkFwcC5uYXZiYXIoKTtcbkFwcC5wdXNoTWVudSgpO1xuQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQoKTtcbkFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzKCk7XG5BcHAucHJvZ3JhbVNsaWRlcigpO1xuQXBwLmltYWdlR2FsbGVyeSgpO1xuQXBwLmltYWdlU2xpZGVyKCk7IC8vIGZvciBqYW1lcyBpbmRleFxuQXBwLnR3aXR0ZXJTbGlkZXIoKTtcbkFwcC5jb3VudFRvKCQoJy5hY2hpdmVtZW50cyAudGltZXInKSk7XG5BcHAuYWRtaW5QYWdlUmVuZGVyZXIoKTtcbkFwcC5nb29nbGVNYXAoKTtcbkFwcC5zdWJtaXREb25hdGlvbigpO1xuXG4iLCJcblxuZXhwb3J0IGRlZmF1bHQgKGhpKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdlbGxvIGZyb20gaW5kZXhQYWdlISEhICcsIGhpKVxufVxuIl19
