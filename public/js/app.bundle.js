
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
    var $attendeeRow = $('.attendee-row, .attendee-meta-row');
    var attRowShowing = false;

    // iterate over each attendee
    // take each data-createdat, call toDateString
    // then append back onto __created-at
    $createdAt.each(function(caElem) {
      var $this = $(this);
      var dateData = $this.data('createdat');
      console.log(dateData)
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4oZnVuY3Rpb24oJCkge1xuXG4gIHZhciByb290ID0gdGhpcztcbiAgQXBwID0gcm9vdC5BcHAgfHwge307XG5cbiAgU3RyaXBlLnNldFB1Ymxpc2hhYmxlS2V5KCdwa190ZXN0X3ZkZHVDTUNWZjcyM1kxRTBIcEc0M2ozMicpO1xuXG4gIC8vIFBBR0UgPj4+IG5vdCBzcGVjaWZpZWRcbiAgQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudHlwZWQoe1xuICAgICAgc3RyaW5nczogW1xuICAgICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgICBdLFxuICAgICAgdHlwZVNwZWVkOiAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICAgIGJhY2tTcGVlZDogLTUsXG4gICAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gUEFHRSA+Pj4gbmV3X2Jsb2csIGVkaXRfYmxvZ1xuICBBcHAudG9rZW5GaWVsZCA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnRva2VuZmllbGQoe1xuICAgICAgLy8gYXV0b2NvbXBsZXRlOiB7XG4gICAgICAvLyAgIHNvdXJjZTogWydyZWQnLCdibHVlJywnZ3JlZW4nLCd5ZWxsb3cnLCd2aW9sZXQnLCdicm93bicsJ3B1cnBsZScsJ2JsYWNrJywnd2hpdGUnXSxcbiAgICAgIC8vICAgZGVsYXk6IDEwMFxuICAgICAgLy8gfSxcbiAgICAgIHNob3dBdXRvY29tcGxldGVPbkZvY3VzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIC8vIFBBR0UgPj4+IG5ld19ibG9nLCBlZGl0X2Jsb2dcbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudE51bTtcbiAgICB2YXIgbWF4TnVtICAgICAgICAgID0gNjAwO1xuICAgIHZhciAkY29udGVudFByZXZpZXcgPSAkKCcuY29udGVudC1wcmV2aWV3LWlucHV0Jyk7XG4gICAgdmFyICRjdXJyZW50Q291bnQgICA9ICQoJy5jdXJyZW50LWNvdW50Jyk7XG4gICAgdmFyICRtYXhOdW0gICAgICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19tYXgnKTtcbiAgICB2YXIgJGN1cnJlbnROdW0gICAgID0gJCgnLmN1cnJlbnQtY291bnRfX2N1cnJlbnQnKTtcblxuICAgICRjb250ZW50UHJldmlldy5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgIGN1cnJlbnROdW0gPSAkY29udGVudFByZXZpZXcudmFsKCkubGVuZ3RoO1xuICAgICAgJGN1cnJlbnROdW0udGV4dChjdXJyZW50TnVtKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gUEFHRSA+Pj4gYmxvZ3MsIHNob3dfYmxvZ1xuICBBcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGFsbCBwYWdlc1xuICBBcHAubmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXIgPSAkKCdoZWFkZXInKTtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICB2YXIgJGxvZ28gPSAkKCcjaGVhZGVyLWxvZ28tbGluaycpO1xuICAgIHZhciAkbWVudSA9ICQoJyNoZWFkZXItbWVudS1saW5rJyk7XG5cbiAgICAkd2luZG93Lm9uKCdzY3JvbGwgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNjcm9sbFRvcCgpKVxuICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMCkge1xuICAgICAgICAkbmF2YmFyLmFkZENsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnI2RkZCcgfSlcbiAgICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAuOCcsIGhlaWdodDogJzQwcHgnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyM5OTknIH0pXG4gICAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwJywgaGVpZ2h0OiAnNjBweCcgfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGFsbCBwYWdlc1xuICBBcHAucHVzaE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhckJ0biAgPSAkKCdhI2hlYWRlci1tZW51LWxpbmsnKTtcbiAgICB2YXIgJG1haW5Db250ICAgPSAkKCcubWFpbi1jb250Jyk7XG4gICAgdmFyICRzaXRlSGVhZGVyID0gJCgnaGVhZGVyLnNpdGUtaGVhZGVyJyk7XG4gICAgdmFyICRuYXZNZW51ICAgID0gJCgnI25hdi1tZW51Jyk7XG5cbiAgICAvLyBtZW51IGxpbmsgY2xpY2tlZFxuICAgICRuYXZiYXJCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgLy8gaWYgbWFpbi1jb250IGhhcyBjbGFzcyAucHVzaC1yaWdodCB0aGVuIHJlbW92ZSBpdFxuICAgICAgaWYgKCRtYWluQ29udC5oYXNDbGFzcygncHVzaC1yaWdodCcpKSB7XG4gICAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzk5OScgfSk7XG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJzBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgICAgLy8gYWRkIGl0IGlmIHRoZXJlIGlzbnQgLnB1c2gtcmlnaHRcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoISRzaXRlSGVhZGVyLmhhc0NsYXNzKCd3aXRoLWJnJykpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gYmcnKVxuICAgICAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzRkYWZjZicgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkdGhpcy5jc3MoeyAnY29sb3InOiAnI2ZmZicgfSlcbiAgICAgICAgfVxuXG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLnNob3coKVxuICAgICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICczMDBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAuYWRkQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJy0zMDBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gUEFHRSA+Pj4gc2hvd19ldmVudFxuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgICB2YXIgJGZOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmZpcnN0LW5hbWUnKTtcbiAgICB2YXIgJGxOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmxhc3QtbmFtZScpO1xuICAgIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgICB2YXIgJG1lc3NhZ2UgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLm1lc3NhZ2UnKTtcbiAgICB2YXIgJHNsdWcgICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmhpZGRlbi1zbHVnJyk7XG4gICAgdmFyICR0c2hpcnRTaXplICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoXCJzZWxlY3RbbmFtZT0ndFNoaXJ0U2l6ZSddXCIpO1xuICAgIHZhciAkcmVnU3VjY2VzcyAgID0gJCgnLnJlZ2lzdGVyLXN1Y2Nlc3MnKTtcbiAgICB2YXIgJHJlZ0Vycm9yICAgICA9ICQoJy5yZWdpc3Rlci1lcnJvcicpO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRGb3JtKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICRyZWdTdWNjZXNzLmFwcGVuZCgnPGRpdj4nK3Jlc3VsdC5tZXNzYWdlKyc8L2Rpdj4nKTtcbiAgICAgICAgJHJlZ1N1Y2Nlc3Muc2hvdygpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRyZWdFcnJvci5hcHBlbmQoJzxkaXY+JytyZXN1bHQubWVzc2FnZSsnPC9kaXY+Jyk7XG4gICAgICAgICRyZWdFcnJvci5zaG93KCk7XG4gICAgICB9XG4gICAgICAkZk5hbWUudmFsKCcnKTtcbiAgICAgICRsTmFtZS52YWwoJycpO1xuICAgICAgJGVtYWlsLnZhbCgnJyk7XG4gICAgICAkbWVzc2FnZS52YWwoJycpO1xuICAgICAgJHNsdWcudmFsKCcnKTtcbiAgICB9XG5cbiAgICAkcmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBmX25hbWU6ICAgICRmTmFtZS52YWwoKSxcbiAgICAgICAgbF9uYW1lOiAgICAkbE5hbWUudmFsKCksXG4gICAgICAgIGZ1bGxfbmFtZTogJC50cmltKCRmTmFtZS52YWwoKSkgKyAnICcgKyAkLnRyaW0oJGxOYW1lLnZhbCgpKSxcbiAgICAgICAgZW1haWw6ICAgICAkZW1haWwudmFsKCksXG4gICAgICAgIG1lc3NhZ2U6ICAgJG1lc3NhZ2UudmFsKCksXG4gICAgICAgIHNsdWc6ICAgICAgJHNsdWcudmFsKCksXG4gICAgICAgIHRzaGlydDogICAgJHRzaGlydFNpemUudmFsKClcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8vIGNhbGwgZnVuYyBiYXNlZCBvbiB3ZWF0aGVyIG9yIG5vdCByZXMuc2VuZCh0cnVlKVxuICAgICAgICByZXN1bHQgPyByZXNldEZvcm0ocmVzdWx0KSA6IHJlc2V0Rm9ybShyZXN1bHQpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGFkbWluX3BhZ2VcbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNyZWF0ZWRBdCA9ICQoJy5hdHRlbmRlZV9fY3JlYXRlZC1hdCcpO1xuICAgIHZhciAkYXR0ZW5kZWVNZXNzYWdlID0gJCgnLmF0dGVuZGVlX19tZXNzYWdlJyk7XG4gICAgdmFyICR2aWV3QXR0ZW5kZWVzQnRuID0gJCgnLmJ0bi1hdHRlbmRlZXMnKTtcbiAgICB2YXIgJGF0dGVuZGVlUm93ID0gJCgnLmF0dGVuZGVlLXJvdywgLmF0dGVuZGVlLW1ldGEtcm93Jyk7XG4gICAgdmFyIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGF0dGVuZGVlXG4gICAgLy8gdGFrZSBlYWNoIGRhdGEtY3JlYXRlZGF0LCBjYWxsIHRvRGF0ZVN0cmluZ1xuICAgIC8vIHRoZW4gYXBwZW5kIGJhY2sgb250byBfX2NyZWF0ZWQtYXRcbiAgICAkY3JlYXRlZEF0LmVhY2goZnVuY3Rpb24oY2FFbGVtKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIGRhdGVEYXRhID0gJHRoaXMuZGF0YSgnY3JlYXRlZGF0Jyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRlRGF0YSlcbiAgICAgIHZhciBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZURhdGEpO1xuICAgICAgJHRoaXMuYXBwZW5kKGRhdGVTdHJpbmcudG9EYXRlU3RyaW5nKCkpO1xuICAgIH0pO1xuXG4gICAgLy8gY2xpY2sgZXZlbnQgZm9yIHZpZXcgYXR0ZW5kZWVzXG4gICAgJHZpZXdBdHRlbmRlZXNCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoIWF0dFJvd1Nob3dpbmcpIHtcbiAgICAgICAgLy8gc2hvdyBhdHRSb3dcbiAgICAgICAgYXR0Um93U2hvd2luZyA9IHRydWU7XG4gICAgICAgICRhdHRlbmRlZVJvdy5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoaWRlIGF0dFJvd1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBQQUdFID4+PiBpbmRleFxuICBBcHAucHJvZ3JhbVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcFNsaWRlciAgPSAkKCcjcHJvZ3JhbXMtc2xpZGVyJyk7XG4gICAgdmFyICRwcm9nQWxsICA9ICRwU2xpZGVyLmZpbmQoJ2EucHJvZ3JhbScpO1xuICAgIHZhciAkcHJvZzEgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTEnKTtcbiAgICB2YXIgJHByb2cyICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0yJyk7XG4gICAgdmFyICRwcm9nMyAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMycpO1xuICAgIHZhciAkcHJvZzQgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTQnKTtcbiAgICB2YXIgJHByb2c1ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW01Jyk7XG4gICAgdmFyICRzYXRJbWcgICA9ICRwU2xpZGVyLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJyk7XG4gICAgdmFyICRkZXNhdEltZyA9ICRwU2xpZGVyLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKTtcblxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAvLyBzYW1lIGFjY3Jvc3MgYWxsIHByb2dyYW1zXG4gICAgICAvLyBoaWRlIGRlc2F0IGltZywgc2hvdyBzYXQgaW1nXG4gICAgICAkdGhpc1xuICAgICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuXG4gICAgICAvLyBpZiBzY2VuYXJpbyBwcm9ncmFtWFxuICAgICAgLy8gbWFrZSBjb250ZW50IHdpZHRoIDEwMCVcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTEnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAvLyBwdXNoIGFsbCBvdmVyIDQlXG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjQlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0NCUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzY0JScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODQlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0yJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzE4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gbGVmdCAtMiUgcHVzaCBhbGwgdG8gdGhlIHJpZ2h0IDIlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0zJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzM4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTQnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnNTglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczOCUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW01JykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzc2JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gcHVzaCBhbGwgdG8gdGhlIGxlZnQgLTQlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTQlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxNiUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM2JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNTYlJyB9KTtcblxuICAgICAgfVxuICAgIH0pXG5cbiAgICAkcHJvZ0FsbC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gaGlkZSBhbGwgc2F0LWltZywgc2hvdyBhbGwgZGVzYXQtaW1nXG4gICAgICAkcHJvZ0FsbFxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnODAlJyB9KVxuXG4gICAgICAvLyByZXR1cm4gYWxsIHByb2dhbXMgdG8gdGhlaXJcbiAgICAgIC8vIG5vcm1hbCBzdGF0ZVxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICcwJScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzIwJScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQwJScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYwJScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgwJScgfSk7XG4gICAgfSlcbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGluZGV4XG4gIEFwcC5pbWFnZUdhbGxlcnkgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBvbmNlIGFsbCB0aGUgaW1hZ2VzIGFyZSBhbGwgbG9hZGVkIGluaXQgbWFzb25yeSB3aXRoIG9wdGlvbnNcbiAgICB2YXIgJGdyaWQgPSAkKCcjZ2FsbGVyaWVzIC5ncmlkJykuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgJGdyaWQubWFzb25yeSh7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogICAgJy5ncmlkLWl0ZW0nLFxuICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICAgIGNvbHVtbldpZHRoOiAgICAgJy5ncmlkLXNpemVyJyxcbiAgICAgICAgZ3V0dGVyOiAgICAgICAgICA1XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy5mYW5jeWJveCcpLmZhbmN5Ym94KHtcbiAgICAgIGZpdFRvVmlldzogdHJ1ZSxcbiAgICAgIGNsb3NlQnRuOiAgdHJ1ZSxcbiAgICAgIHBhZGRpbmc6ICAgJzYwcHggMHB4IDMwcHggMHB4JyxcbiAgICAgIC8vIHdpZHRoOiAgJzYwJScsXG4gICAgICAvLyBoZWlnaHQ6ICc2MCUnLFxuICAgICAgbWF4V2lkdGg6ICAxMjAwLFxuICAgICAgbWF4SGVpZ2h0OiA1NjBcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGFjY2VwdHMgYXJyYXkgb2YgaW1nIGxpbmtzIGFuZCBjcmVhdGVzXG4gIC8vIHNsaWRlciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgYmV0d2VlbiB0aGVtXG4gIC8vIFBBR0UgPj4+IGluZGV4XG4gIEFwcC5pbWFnZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2xpZGVyID0gJCgndWwjc2xpZGVyJyk7XG5cbiAgICB2YXIgaW1nTGlua3MgPSBbXG4gICAgICAnaHR0cDovL2kuaW1ndXIuY29tLzlhTVRCd1UuanBnJyxcbiAgICAgICdodHRwOi8vaS5pbWd1ci5jb20vVTRKZk9yYi5qcGcnLFxuICAgICAgJ2h0dHA6Ly9pLmltZ3VyLmNvbS9XMzB4QnNMLmpwZycsXG4gICAgICAnaHR0cDovL2kuaW1ndXIuY29tL3g2OUE4R0QuanBnJ1xuICAgIF07XG5cbiAgICAvLyBidWlsZCBFc2xpZGVyIERPTSwgcGFzcyBhbmltYXRlU2xpZGVyIGFzXG4gICAgLy8gY2FsbGJhY2sgdG8gZG8gd2hlbiBhbmltYXRlU2xpZGVyIGlzIGRvbmVcbiAgICBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgYW5pbWF0ZVNsaWRlcik7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKGVycikge1xuICAgICAgdmFyICRzbGlkZUl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScpO1xuICAgICAgdmFyIHNsaWRlckxlbiA9ICRzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgICAgaXRlbTtcblxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGlmIGF0IGVuZCBvZiBhcnJheSwgcmV0dXJuIGNvdW50IHRvIDBcbiAgICAgICAgKGNvdW50ID09PSBzbGlkZXJMZW4gLSAxKSA/IGNvdW50ID0gMCA6IGNvdW50Kys7XG4gICAgICAgIC8vIHJlbW92ZSAuc2hvdyBmcm9tIGFsbCBzbGlkZV9faXRlbSdzXG4gICAgICAgICRzbGlkZUl0ZW1zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgIC8vIGZpbmQgZWxlbWVudCBiYXNlZCBvbiBpdHMgZGF0YS10ZXN0aW5nXG4gICAgICAgIC8vIGF0dHIgdGhlbiBhZGQgLnNob3csIHJlcGVhdCBzSVxuICAgICAgICBpdGVtID0gJChcImxpLnNsaWRlcl9faXRlbVtkYXRhLXBvc2l0aW9uPSdcIitjb3VudCtcIiddXCIpO1xuICAgICAgICBpdGVtLmFkZENsYXNzKCdzaG93Jyk7XG5cbiAgICAgIH0sIDQwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkU2xpZGVyRG9tKGltZ0xpbmtzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHNsaWRlckFyciA9IFtdXG5cbiAgICAgIC8vIHJldHVybiBlcnJvciBpZiBubyBpbWdMaW5rcyBvciBpbWdMaW5rcyAhPT0gQXJyYXlcbiAgICAgIGlmICghaW1nTGlua3MgfHwgIShpbWdMaW5rcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICB2YXIgZXJyID0gJ3RoZXJlIHdhcyBhbiBlcnJvciEnO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgbGlzdCBhbmQgY3JlYXRlIDxpbWc+XG4gICAgICAvLyBpbWFnZSBhbmQgdGh1bWJuYWlsIGhhdmUgZGlmZmVyZW50IHcvaCAmIGNsYXNzXG4gICAgICBmb3IgKHZhciBpPTA7IGk8aW1nTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmsgPSBpbWdMaW5rc1tpXTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3SW1hZ2UobGluaywgZmFsc2UpO1xuICAgICAgICB2YXIgdGh1bWJuYWlsID0gbmV3SW1hZ2UobGluaywgdHJ1ZSk7XG5cbiAgICAgICAgLy8geyBpbWFnZTogJCguLi4pLCB0aHVtYm5haWw6ICQoLi4uKSB9XG4gICAgICAgIHNsaWRlckFyci5wdXNoKHtcbiAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aHVtYm5haWxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG9uY2Ugc2xpZGVyQXJyIGRvbmUsIGNyZWF0ZSBhIGxpLnNsaWRlX19pdGVtLFxuICAgICAgLy8gYXBwZW5kIHRoZSBpbWFnZSBpbnRvIHRoZSBsaSwgdGhlbiBhcHBlbmQgbGkgb250byAjc2xpZGVyXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2xpZGVyQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpbWcgID0gc2xpZGVyQXJyW2ldLmltYWdlO1xuICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaS8+Jywge1xuICAgICAgICAgICdjbGFzcyc6ICdzbGlkZXJfX2l0ZW0nLFxuICAgICAgICAgICdkYXRhLXBvc2l0aW9uJzogaVxuICAgICAgICB9KVxuXG4gICAgICAgIGl0ZW0uYXBwZW5kKGltZyk7XG4gICAgICAgICRzbGlkZXIuYXBwZW5kKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICAvLyBhbGwgd2VudCB3ZWxsXG4gICAgICBjYWxsYmFjayhudWxsKTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm5zIG5ldyBpbWcgZWxlbWVudCB3aXRoIHNyYz1pbWdMaW5rXG4gICAgZnVuY3Rpb24gbmV3SW1hZ2UoaW1nTGluaywgaXNUaHVtYm5haWwpIHtcbiAgICAgIHJldHVybiAkKCc8aW1nLz4nLCB7XG4gICAgICAgICdzcmMnOiBpbWdMaW5rLFxuICAgICAgICAnY2xhc3MnOiAncy1pbWcnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8vIFBBR0UgPj4+IG5vdCBzcGVjaWZpZWRcbiAgQXBwLnR3aXR0ZXJTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGluZGljYXRvcnNVbCA9ICQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyk7XG4gICAgdmFyICRpbm5lckNhcm91c2VsID0gJCgnLmNhcm91c2VsLWlubmVyJyk7XG5cbiAgICB2YXIgdHdlZXRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJzEgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJzIgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJzMgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9XG4gICAgXVxuXG4gICAgZm9yICh2YXIgaT0wOyBpPHR3ZWV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRkYXRhID0gdHdlZXRzW2ldO1xuICAgICAgdmFyICRpbmRpY2F0b3IgPSBjcmVhdGVJbmRpY2F0b3IoaSk7XG4gICAgICB2YXIgJGl0ZW0gPSBjcmVhdGVJdGVtKHRkYXRhLnRpdGxlLCB0ZGF0YS51cmwsIGkpXG5cbiAgICAgICRpbmRpY2F0b3JzVWwuYXBwZW5kKCRpbmRpY2F0b3IpO1xuICAgICAgJGlubmVyQ2Fyb3VzZWwuYXBwZW5kKCRpdGVtKTtcbiAgICB9XG5cbiAgICAkKCcuY2Fyb3VzZWwnKS5jYXJvdXNlbCh7XG4gICAgICBpbnRlcnZhbDogMzAwMFxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3IoY291bnQpIHtcbiAgICAgIHZhciBpbmRpID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICdkYXRhLXRhcmdldCc6ICcjdHdpdHRlci1zbGlkZXInLFxuICAgICAgICAnZGF0YS1zbGlkZS10byc6IGNvdW50XG4gICAgICB9KVxuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaW5kaS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmRpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHdlZXRUZXh0LCB0d2VldFVybCwgY291bnQpIHtcbiAgICAgIHZhciBpdGVtID0gJCgnPGRpdi8+Jywge1xuICAgICAgICAnY2xhc3MnOiAnaXRlbSdcbiAgICAgIH0pO1xuICAgICAgdmFyIHBhcmEgPSAkKCc8cC8+JykudGV4dCh0d2VldFRleHQpO1xuICAgICAgdmFyIGFuY2ggPSAkKCc8YS8+Jywge1xuICAgICAgICAnaHJlZic6IHR3ZWV0VXJsXG4gICAgICB9KS50ZXh0KHR3ZWV0VXJsKTtcblxuICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbS5hcHBlbmQocGFyYSkuYXBwZW5kKGFuY2gpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGFib3V0X3VzXG4gIEFwcC5jb3VudFRvID0gZnVuY3Rpb24oZWxlbSkge1xuICAgIGVsZW0uY291bnRUbygndG9nZ2xlJyk7XG4gIH1cblxuICAvLyBQQUdFID4+PiBhZG1pbl9wYWdlXG4gIEFwcC5hZG1pblBhZ2VSZW5kZXJlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkYWRtaW5TZWN0aW9ucyAgID0gJCgnLmFkbWluLXNlY3Rpb24nKTtcbiAgICB2YXIgJGFkbWluQWxsICAgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19hbGwnKTtcbiAgICB2YXIgJGFkbWluQmxvZ3MgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19ibG9ncycpO1xuICAgIHZhciAkYWRtaW5FdmVudHMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2V2ZW50cycpO1xuICAgIHZhciAkYWRtaW5TdWJzICAgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX3N1YnNjcmliZXJzJyk7XG4gICAgdmFyICRhZG1pbkltYWdlcyAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fZ2FsbGVyeScpO1xuICAgIHZhciAkYWRtaW5Eb25hdGlvbnMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2RvbmF0aW9ucycpO1xuXG4gICAgdmFyICRhZG1pbkxpbmtzICAgICAgPSAkKCcuYWRtaW4tbGluaycpO1xuICAgIHZhciAkYWRtaW5MaW5rQWxsICAgID0gJCgnLmFkbWluLWxpbmtfX2FsbCcpO1xuICAgIHZhciAkYWRtaW5MaW5rQmxvZ3MgID0gJCgnLmFkbWluLWxpbmtfX2Jsb2dzJyk7XG4gICAgdmFyICRhZG1pbkxpbmtFdmVudHMgPSAkKCcuYWRtaW4tbGlua19fZXZlbnRzJyk7XG4gICAgdmFyICRhZG1pbkxpbmtTdWJzICAgPSAkKCcuYWRtaW4tbGlua19fc3Vic2NyaWJlcnMnKTtcbiAgICB2YXIgJGFkbWluTGlua0ltYWdlcyA9ICQoJy5hZG1pbi1saW5rX19nYWxsZXJ5Jyk7XG4gICAgdmFyICRhZG1pbkxpbmtEb25hdGlvbnMgPSAkKCcuYWRtaW4tbGlua19fZG9uYXRpb25zJyk7XG5cblxuICAgIC8vIGhhdmUgdGhlIGBhbGxgIGJlIHRoZSBpbml0aWFsIHN0YXRlXG4gICAgJGFkbWluTGlua0FsbC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJGFkbWluQWxsLmFkZENsYXNzKCdzaG93Jyk7XG5cblxuICAgICRhZG1pbkxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gLmFkbWluLWxpbmtfX1hYWFxuICAgICAgdmFyICRjbGlja2VkID0gJCh0aGlzKTtcblxuICAgICAgLy8gcmVtb3ZlIGFsbCBzaG93ZWQgYW5kIGFkZCBgYWN0aXZlYFxuICAgICAgLy8gdG8gdGhlIGNsaWNrZWQgbGlua1xuICAgICAgJGFkbWluU2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICRhZG1pbkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICRhZG1pblNlY3Rpb25zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAkY2xpY2tlZC5hZGRDbGFzcygnYWN0aXZlJylcblxuXG4gICAgICBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0FsbFswXSkge1xuICAgICAgICAkYWRtaW5BbGwuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtCbG9nc1swXSkge1xuICAgICAgICAkYWRtaW5CbG9ncy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0V2ZW50c1swXSkge1xuICAgICAgICAkYWRtaW5FdmVudHMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtTdWJzWzBdKSB7XG4gICAgICAgICRhZG1pblN1YnMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtJbWFnZXNbMF0pIHtcbiAgICAgICAgJGFkbWluSW1hZ2VzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rRG9uYXRpb25zWzBdKSB7XG4gICAgICAgICRhZG1pbkRvbmF0aW9ucy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfVxuXG4gIC8vIFBBR0UgPj4+IGNvbnRhY3RfdXNcbiAgQXBwLmdvb2dsZU1hcCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlcXVpcmVkIHNvIGVycm9yIGRvZXNudCBzaG93LCBzaG91bGQgZXZlbnR1YWxseVxuICAgIC8vIHB1dCBhbGwgY2FsbHMgdG8gQXBwIGluc2lkZSAubG9hZFxuICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBzZXQgeW91ciBnb29nbGUgbWFwcyBwYXJhbWV0ZXJzXG4gICAgICB2YXIgJGxhdGl0dWRlID0gNDIuMDkwMjk3LFxuICAgICAgICAkbG9uZ2l0dWRlID0gLTg4LjA3NTk4MjAwMDAwMDAxLFxuICAgICAgICAkbWFwX3pvb20gPSAxMjsgLyogWk9PTSBTRVRUSU5HICovXG5cbiAgICAgIC8vIGN1c3RvbSBtYXJrZXJcbiAgICAgIHZhciAkbWFya2VyX3VybCA9ICcuLi9pbWcvZ29vZ2xlLW1hcC1tYXJrZXIucG5nJztcblxuICAgICAgLy8gcGFzdGVkIHRoZSBzdHlsZWQgbWFwcyBkZWZpbml0aW9uXG4gICAgICB2YXIgc3R5bGUgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6XCIzOVwifSx7XCJsaWdodG5lc3NcIjpcIjExXCJ9LHtcImNvbG9yXCI6XCIjOTlkZWU5XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiaHVlXCI6XCIjN2QwMGZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOjM2fSx7XCJjb2xvclwiOlwiIzMzMzMzM1wifSx7XCJsaWdodG5lc3NcIjo0MH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmVmZWZlXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZlZmVmZVwifSx7XCJsaWdodG5lc3NcIjoxN30se1wid2VpZ2h0XCI6MS4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNjZDNjM2NcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNjEzNzM3XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjdjNzcwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubmF0dXJhbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifSx7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzA4YjdiZVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM1OWIxYjVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyYmUzYlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kucGFya1wiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjIxfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzcyM2Y4M1wifSx7XCJ3ZWlnaHRcIjpcIjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJ3ZWlnaHRcIjpcIjFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoxN30se1wiY29sb3JcIjpcIiNmMmJlM2JcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjI5fSx7XCJ3ZWlnaHRcIjowLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxOH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn0se1wibGlnaHRuZXNzXCI6MTl9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTd9LHtcImNvbG9yXCI6XCIjZjVmNWY1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzY0MWM3Y1wifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifV19XVxuXG4gICAgICAvLyBzZXQgZ29vZ2xlIG1hcCBvcHRpb25zXG4gICAgICB2YXIgbWFwX29wdGlvbnMgPSB7XG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgICB6b29tOiAkbWFwX3pvb20sXG4gICAgICAgIHBhbkNvbnRyb2w6IHRydWUsXG4gICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sOiB0cnVlLFxuICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgIHN0eWxlczogc3R5bGVcbiAgICAgIH07XG5cbiAgICAgIC8vIGluaXppYWxpemUgdGhlIG1hcFxuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1jb250YWluZXInKSwgbWFwX29wdGlvbnMpO1xuXG4gICAgICAvL2FkZCBhIGN1c3RvbSBtYXJrZXIgdG8gdGhlIG1hcFxuICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogJG1hcmtlcl91cmxcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICAvLyBQQUdFID4+PiBkb25hdGVcbiAgQXBwLnN1Ym1pdERvbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRkb25hdGVGb3JtID0gJCgnI2RvbmF0ZS1mb3JtJyk7XG5cbiAgICAkZG9uYXRlRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICRmb3JtLmZpbmQoJy5idG4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgLy8gY3JlYXRlIHRoZSBzdHJpcGVUb2tlblxuICAgICAgU3RyaXBlLmNhcmQuY3JlYXRlVG9rZW4oJGZvcm0sIHN0cmlwZVJlc3BvbnNlSGFuZGxlcik7XG4gICAgfSlcblxuICAgIC8vIGNhbGxiYWNrIGhhbmRsZXIgdGhhdCBlaXRoZXIgaW5zZXJ0cyBlcnJvcnMgb3IgYXR0YWNoZXNcbiAgICAvLyBzdHJpcGVUb2tlbiB0byBoaWRkZW4gaW5wdXQsIHRoZW4gc3VibWl0cyBmb3JtXG4gICAgZnVuY3Rpb24gc3RyaXBlUmVzcG9uc2VIYW5kbGVyKHN0YXR1cywgcmVzcG9uc2UpIHtcbiAgICAgIHZhciAkZm9ybSA9ICRkb25hdGVGb3JtO1xuXG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICRmb3JtLmZpbmQoJy5wYXltZW50LWVycm9ycycpLnRleHQocmVzcG9uc2UuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICRmb3JtLmZpbmQoJ2J1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgIHZhciB0b2tlbiA9IHJlc3BvbnNlLmlkO1xuICAgICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic3RyaXBlVG9rZW5cIiAvPicpLnZhbCh0b2tlbikpO1xuICAgICAgICAvLyBhbmQgc3VibWl0XG4gICAgICAgICRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cblxuICByb290LkFwcCA9IEFwcDtcblxuICBBcHAudHlwZXIoJy5ubC10eXBlcicpO1xuICBBcHAudG9rZW5GaWVsZCgnI25ldy1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuICBBcHAuc2Nyb2xsRm9sbG93KCcjc2hvdy1ibG9nIC5vbi1yaWdodCwgI2Jsb2dzIC5vbi1yaWdodCcpO1xuICBBcHAubmF2YmFyKCk7XG4gIEFwcC5wdXNoTWVudSgpO1xuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCgpO1xuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuICBBcHAucHJvZ3JhbVNsaWRlcigpO1xuICBBcHAuaW1hZ2VHYWxsZXJ5KCk7XG4gIEFwcC5pbWFnZVNsaWRlcigpOyAvLyBmb3IgamFtZXMgaW5kZXhcbiAgQXBwLnR3aXR0ZXJTbGlkZXIoKTtcbiAgQXBwLmNvdW50VG8oJCgnLmFjaGl2ZW1lbnRzIC50aW1lcicpKTtcbiAgQXBwLmFkbWluUGFnZVJlbmRlcmVyKCk7XG4gIEFwcC5nb29nbGVNYXAoKTtcbiAgQXBwLnN1Ym1pdERvbmF0aW9uKCk7XG5cbn0pKGpRdWVyeSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
