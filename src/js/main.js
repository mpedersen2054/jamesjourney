
(function($) {

  var root = this;
  App = root.App || {};

  Stripe.setPublishableKey('pk_test_vdduCMCVf723Y1E0HpG43j32');

  // PAGE >>> not specified
  App.typer = function(elem) {
    $(elem).typed({
      strings: [
        'support our cause.',
        'recieve regular updates on events.',
        'help make the world a better place.'
      ],
      typeSpeed: 0,
      loop: true,
      backDelay: 3000,
      backSpeed: -5,
      showCursor: false
    });
  }

  // PAGE >>> new_blog, edit_blog
  App.tokenField = function(elem) {
    $(elem).tokenfield({
      // autocomplete: {
      //   source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
      //   delay: 100
      // },
      showAutocompleteOnFocus: true
    })
  }

  // PAGE >>> new_blog, edit_blog
  App.contentPreviewCount = function() {
    var currentNum;
    var maxNum          = 600;
    var $contentPreview = $('.content-preview-input');
    var $currentCount   = $('.current-count');
    var $maxNum         = $('.current-count__max');
    var $currentNum     = $('.current-count__current');

    $contentPreview.on('keyup', function() {
      currentNum = $contentPreview.val().length;
      $currentNum.text(currentNum);
    })
  }

  // PAGE >>> blogs, show_blog
  App.scrollFollow = function(elem) {
    $(elem).simpleScrollFollow({
      limit_elem: '.on-left'
    });
  }

  // PAGE >>> all pages
  App.navbar = function() {
    var $navbar = $('header');
    var $window = $(window);
    var $logo = $('#header-logo-link');
    var $menu = $('#header-menu-link');

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

  // PAGE >>> all pages
  App.pushMenu = function() {
    var $navbarBtn  = $('a#header-menu-link');
    var $mainCont   = $('.main-cont');
    var $siteHeader = $('header.site-header');
    var $navMenu    = $('#nav-menu');

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

  // PAGE >>> show_event
  App.submitRegisterEvent = function() {
    var $registerForm = $('#event-register-form');
    var $fName        = $registerForm.find('.first-name');
    var $lName        = $registerForm.find('.last-name');
    var $email        = $registerForm.find('.email');
    var $message      = $registerForm.find('.message');
    var $slug         = $registerForm.find('.hidden-slug');
    var $tshirtSize   = $registerForm.find("select[name='tShirtSize']");
    var $regSuccess   = $('.register-success');
    var $regError     = $('.register-error');

    function resetForm(result) {
      if (result.success) {
        $regSuccess.append('<div>'+result.message+'</div>');
        $regSuccess.show();
      }
      else {
        $regError.append('<div>'+result.message+'</div>');
        $regError.show();
      }
      $fName.val('');
      $lName.val('');
      $email.val('');
      $message.val('');
      $slug.val('');
    }

    $registerForm.on('submit', function(e) {
      e.preventDefault();

      var data = {
        f_name:    $fName.val(),
        l_name:    $lName.val(),
        full_name: $.trim($fName.val()) + ' ' + $.trim($lName.val()),
        email:     $email.val(),
        message:   $message.val(),
        slug:      $slug.val(),
        tshirt:    $tshirtSize.val()
      }

      console.log(data);

      $.post('/events/'+data.slug+'/register', data, function(result) {
        // call func based on weather or not res.send(true)
        result ? resetForm(result) : resetForm(result);
      });

    });
  }

  // PAGE >>> admin_page
  App.handleAdminEventAttendees = function() {
    var $createdAt = $('.attendee__created-at');
    var $attendeeMessage = $('.attendee__message');
    var $viewAttendeesBtn = $('.btn-attendees');
    var $attendeeRow = $('.attendee-row');
    var attRowShowing = false;

    // iterate over each attendee
    // take each data-createdat, call toDateString
    // then append back onto __created-at
    $createdAt.each(function(caElem) {
      var $this = $(this);
      var dateData = $this.data('createdat');
      var dateString = new Date(dateData);
      $this.append(dateString.toDateString());
    });

    // click event for view attendees
    $viewAttendeesBtn.on('click', function(e) {
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
  }

  // PAGE >>> index
  App.programSlider = function() {
    var $pSlider  = $('#programs-slider');
    var $progAll  = $pSlider.find('a.program');
    var $prog1    = $pSlider.find('.program1');
    var $prog2    = $pSlider.find('.program2');
    var $prog3    = $pSlider.find('.program3');
    var $prog4    = $pSlider.find('.program4');
    var $prog5    = $pSlider.find('.program5');
    var $satImg   = $pSlider.find('.saturated-img');
    var $desatImg = $pSlider.find('.desaturated-img');


    $progAll.on('mouseenter', function(e) {
      e.preventDefault();
      var $this = $(this);

      // same accross all programs
      // hide desat img, show sat img
      $this
        .find('.desaturated-img')
          .css({ display: 'none' })
        .end()
        .find('.saturated-img')
          .css({ display: 'block' })

      // if scenario programX
      // make content width 100%
      if ($this.hasClass('program1')) {
        $this
          .find('.content')
          .css({ width: '100%' })

        // push all over 4%
        $prog2.css({ left: '24%' });
        $prog3.css({ left: '44%' });
        $prog4.css({ left: '64%' });
        $prog5.css({ left: '84%' });
      }

      else if ($this.hasClass('program2')) {
        $this
          .css({ left: '18%' })
          .find('.content')
          .css({ width: '100%' })

        // left -2% push all to the right 2%
        $prog1.css({ left: '-2%' });
        $prog3.css({ left: '42%' });
        $prog4.css({ left: '62%' });
        $prog5.css({ left: '82%' });
      }

      else if ($this.hasClass('program3')) {
        $this
          .css({ left: '38%' })
          .find('.content')
          .css({ width: '100%' })

        $prog1.css({ left: '-2%' });
        $prog2.css({ left: '18%' });
        $prog4.css({ left: '62%' });
        $prog5.css({ left: '82%' });
      }

      else if ($this.hasClass('program4')) {
        $this
          .css({ left: '58%' })
          .find('.content')
          .css({ width: '100%' })

        $prog1.css({ left: '-2%' });
        $prog2.css({ left: '18%' });
        $prog3.css({ left: '38%' });
        $prog5.css({ left: '82%' });

      }

      else if ($this.hasClass('program5')) {
        $this
          .css({ left: '76%' })
          .find('.content')
          .css({ width: '100%' })

        // push all to the left -4%
        $prog1.css({ left: '-4%' });
        $prog2.css({ left: '16%' });
        $prog3.css({ left: '36%' });
        $prog4.css({ left: '56%' });

      }
    })

    $progAll.on('mouseleave', function(e) {
      e.preventDefault();

      // hide all sat-img, show all desat-img
      $progAll
        .find('.saturated-img')
          .css({ display: 'none' })
        .end()
        .find('.desaturated-img')
          .css({ display: 'block' })
        .end()
        .find('.content')
        .css({ width: '80%' })

      // return all progams to their
      // normal state
      $prog1.css({ left: '0%' });
      $prog2.css({ left: '20%' });
      $prog3.css({ left: '40%' });
      $prog4.css({ left: '60%' });
      $prog5.css({ left: '80%' });
    })
  }

  // PAGE >>> index
  App.imageGallery = function() {
    // once all the images are all loaded init masonry with options
    var $grid = $('#galleries .grid').imagesLoaded(function() {
      $grid.masonry({
        itemSelector:    '.grid-item',
        percentPosition: true,
        columnWidth:     '.grid-sizer',
        gutter:          5
      });
    });

    $('.fancybox').fancybox({
      fitToView: true,
      closeBtn:  true,
      padding:   '60px 0px 30px 0px',
      // width:  '60%',
      // height: '60%',
      maxWidth:  1200,
      maxHeight: 560
    });
  }

  // accepts array of img links and creates
  // slider elements and animates between them
  // PAGE >>> index
  App.imageSlider = function() {
    var $slider = $('ul#slider');

    var imgLinks = [
      'http://i.imgur.com/9aMTBwU.jpg',
      'http://i.imgur.com/U4JfOrb.jpg',
      'http://i.imgur.com/W30xBsL.jpg',
      'http://i.imgur.com/x69A8GD.jpg'
    ];

    // build Eslider DOM, pass animateSlider as
    // callback to do when animateSlider is done
    buildSliderDom(imgLinks, animateSlider);

    function animateSlider(err) {
      var $slideItems = $('.slider__item');
      var sliderLen = $slideItems.length,
          count = 0,
          item;

      setInterval(function() {
        // if at end of array, return count to 0
        (count === sliderLen - 1) ? count = 0 : count++;
        // remove .show from all slide__item's
        $slideItems.removeClass('show');
        // find element based on its data-testing
        // attr then add .show, repeat sI
        item = $("li.slider__item[data-position='"+count+"']");
        item.addClass('show');

      }, 4000);
    }

    function buildSliderDom(imgLinks, callback) {
      var sliderArr = []

      // return error if no imgLinks or imgLinks !== Array
      if (!imgLinks || !(imgLinks instanceof Array)) {
        var err = 'there was an error!';
        callback(err);
      }

      // iterate over list and create <img>
      // image and thumbnail have different w/h & class
      for (var i=0; i<imgLinks.length; i++) {
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
      for (var i=0; i<sliderArr.length; i++) {
        var img  = sliderArr[i].image;
        var item = $('<li/>', {
          'class': 'slider__item',
          'data-position': i
        })

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

  }

  // PAGE >>> not specified
  App.twitterSlider = function() {
    var $indicatorsUl = $('.carousel-indicators');
    var $innerCarousel = $('.carousel-inner');

    var tweets = [
      {
        title: '1 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
        url: 'http://t.co/7FoVSP0vIf'
      },
      {
        title: '2 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
        url: 'http://t.co/7FoVSP0vIf'
      },
      {
        title: '3 Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam ...',
        url: 'http://t.co/7FoVSP0vIf'
      }
    ]

    for (var i=0; i<tweets.length; i++) {
      var tdata = tweets[i];
      var $indicator = createIndicator(i);
      var $item = createItem(tdata.title, tdata.url, i)

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
      })

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
  }

  // PAGE >>> about_us
  App.countTo = function(elem) {
    elem.countTo('toggle');
  }

  // PAGE >>> admin_page
  App.adminPageRenderer = function() {
    var $adminSections   = $('.admin-section');
    var $adminAll        = $('.admin-section__all');
    var $adminBlogs      = $('.admin-section__blogs');
    var $adminEvents     = $('.admin-section__events');
    var $adminSubs       = $('.admin-section__subscribers');
    var $adminImages     = $('.admin-section__gallery');
    var $adminDonations     = $('.admin-section__donations');

    var $adminLinks      = $('.admin-link');
    var $adminLinkAll    = $('.admin-link__all');
    var $adminLinkBlogs  = $('.admin-link__blogs');
    var $adminLinkEvents = $('.admin-link__events');
    var $adminLinkSubs   = $('.admin-link__subscribers');
    var $adminLinkImages = $('.admin-link__gallery');
    var $adminLinkDonations = $('.admin-link__donations');


    // have the `all` be the initial state
    $adminLinkAll.addClass('active');
    $adminAll.addClass('show');


    $adminLinks.on('click', function(e) {
      e.preventDefault();

      // .admin-link__XXX
      var $clicked = $(this);

      // remove all showed and add `active`
      // to the clicked link
      $adminSections.removeClass('show');
      $adminLinks.removeClass('active');
      $adminSections.removeClass('show');
      $clicked.addClass('active')


      if ($clicked[0] == $adminLinkAll[0]) {
        $adminAll.addClass('show');
      }
      else if ($clicked[0] == $adminLinkBlogs[0]) {
        $adminBlogs.addClass('show');
      }
      else if ($clicked[0] == $adminLinkEvents[0]) {
        $adminEvents.addClass('show');
      }
      else if ($clicked[0] == $adminLinkSubs[0]) {
        $adminSubs.addClass('show');
      }
      else if ($clicked[0] == $adminLinkImages[0]) {
        $adminImages.addClass('show');
      }
      else if ($clicked[0] == $adminLinkDonations[0]) {
        $adminDonations.addClass('show');
      }
    })

  }

  // PAGE >>> contact_us
  App.googleMap = function() {
    // required so error doesnt show, should eventually
    // put all calls to App inside .load
    $(window).load(function() {

      // set your google maps parameters
      var $latitude = 42.090297,
        $longitude = -88.07598200000001,
        $map_zoom = 12; /* ZOOM SETTING */

      // custom marker
      var $marker_url = '../img/google-map-marker.png';

      // pasted the styled maps definition
      var style = [{"featureType":"all","elementType":"all","stylers":[{"saturation":"39"},{"lightness":"11"},{"color":"#99dee9"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"hue":"#7d00ff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#cd3c3c"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"color":"#613737"}]},{"featureType":"landscape","elementType":"labels.icon","stylers":[{"color":"#f7c770"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#8ed8e1"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#8ed8e1"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#8ed8e1"},{"lightness":21}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#08b7be"}]},{"featureType":"poi.medical","elementType":"labels.text.fill","stylers":[{"color":"#59b1b5"}]},{"featureType":"poi.medical","elementType":"labels.icon","stylers":[{"color":"#f2be3b"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#723f83"},{"weight":"2"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":"1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":17},{"color":"#f2be3b"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#f5f5f5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#641c7c"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]

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
    })
  }

  // PAGE >>> donate
  App.submitDonation = function() {
    var $donateForm = $('#donate-form');

    $donateForm.on('submit', function(e) {
      e.preventDefault();
      var $form = $(this);
      $form.find('.btn').prop('disabled', true);
      // create the stripeToken
      Stripe.card.createToken($form, stripeResponseHandler);
    })

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
  }


  root.App = App;

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

})(jQuery);

