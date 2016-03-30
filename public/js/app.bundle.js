
(function($) {

  var root = this;
  App = root.App || {};

  Stripe.setPublishableKey('pk_test_vdduCMCVf723Y1E0HpG43j32');

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

  App.tokenField = function(elem) {
    $(elem).tokenfield({
      // autocomplete: {
      //   source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
      //   delay: 100
      // },
      showAutocompleteOnFocus: true
    })
  }

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

  // plugin used in blogs/show_blog sidebar
  App.scrollFollow = function(elem) {
    $(elem).simpleScrollFollow({
      limit_elem: '.on-left'
    });
  }

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

  App.submitRegisterEvent = function() {
    var $registerForm = $('#event-register-form');
    var $fName        = $registerForm.find('.first-name');
    var $lName        = $registerForm.find('.last-name');
    var $email        = $registerForm.find('.email');
    var $message      = $registerForm.find('.message');
    var $slug         = $registerForm.find('.hidden-slug');
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
        slug:      $slug.val()
      }

      $.post('/events/'+data.slug+'/register', data, function(result) {
        // call func based on weather or not res.send(true)
        result ? resetForm(result) : resetForm(result);
      });

    });
  }

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
  App.imageSlider = function() {
    var $slider = $('ul#slider');

    var imgLinks = [
      'https://i.ytimg.com/vi/UIrEM_9qvZU/maxresdefault.jpg',
      'http://www.knowyourpresidents.com/wp-content/uploads/2015/11/george-washington1.jpg',
      'http://www.unoosa.org/res/timeline/index_html/space-2.jpg',
      'http://www.dogbreedplus.com/images/puredogss.png'
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
        item = $("li.slider__item[data-testing='"+count+"']");
        item.addClass('show');

      }, 6000);
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
          'data-testing': i
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

  App.countTo = function(elem) {
    elem.countTo('toggle');
  }

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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuICBBcHAgPSByb290LkFwcCB8fCB7fTtcblxuICBTdHJpcGUuc2V0UHVibGlzaGFibGVLZXkoJ3BrX3Rlc3RfdmRkdUNNQ1ZmNzIzWTFFMEhwRzQzajMyJyk7XG5cbiAgQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudHlwZWQoe1xuICAgICAgc3RyaW5nczogW1xuICAgICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgICBdLFxuICAgICAgdHlwZVNwZWVkOiAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICAgIGJhY2tTcGVlZDogLTUsXG4gICAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnRva2VuRmllbGQgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50b2tlbmZpZWxkKHtcbiAgICAgIC8vIGF1dG9jb21wbGV0ZToge1xuICAgICAgLy8gICBzb3VyY2U6IFsncmVkJywnYmx1ZScsJ2dyZWVuJywneWVsbG93JywndmlvbGV0JywnYnJvd24nLCdwdXJwbGUnLCdibGFjaycsJ3doaXRlJ10sXG4gICAgICAvLyAgIGRlbGF5OiAxMDBcbiAgICAgIC8vIH0sXG4gICAgICBzaG93QXV0b2NvbXBsZXRlT25Gb2N1czogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBBcHAuY29udGVudFByZXZpZXdDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50TnVtO1xuICAgIHZhciBtYXhOdW0gICAgICAgICAgPSA2MDA7XG4gICAgdmFyICRjb250ZW50UHJldmlldyA9ICQoJy5jb250ZW50LXByZXZpZXctaW5wdXQnKTtcbiAgICB2YXIgJGN1cnJlbnRDb3VudCAgID0gJCgnLmN1cnJlbnQtY291bnQnKTtcbiAgICB2YXIgJG1heE51bSAgICAgICAgID0gJCgnLmN1cnJlbnQtY291bnRfX21heCcpO1xuICAgIHZhciAkY3VycmVudE51bSAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fY3VycmVudCcpO1xuXG4gICAgJGNvbnRlbnRQcmV2aWV3Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgY3VycmVudE51bSA9ICRjb250ZW50UHJldmlldy52YWwoKS5sZW5ndGg7XG4gICAgICAkY3VycmVudE51bS50ZXh0KGN1cnJlbnROdW0pO1xuICAgIH0pXG4gIH1cblxuICAvLyBwbHVnaW4gdXNlZCBpbiBibG9ncy9zaG93X2Jsb2cgc2lkZWJhclxuICBBcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5uYXZiYXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhciA9ICQoJ2hlYWRlcicpO1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHZhciAkbG9nbyA9ICQoJyNoZWFkZXItbG9nby1saW5rJyk7XG4gICAgdmFyICRtZW51ID0gJCgnI2hlYWRlci1tZW51LWxpbmsnKTtcblxuICAgICR3aW5kb3cub24oJ3Njcm9sbCBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykuc2Nyb2xsVG9wKCkpXG4gICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwKSB7XG4gICAgICAgICRuYXZiYXIuYWRkQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICAgJG1lbnUuY3NzKHsgY29sb3I6ICcjZGRkJyB9KVxuICAgICAgICAkbG9nby5jc3MoeyBvcGFjaXR5OiAnMC44JywgaGVpZ2h0OiAnNDBweCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnIzk5OScgfSlcbiAgICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAnLCBoZWlnaHQ6ICc2MHB4JyB9KVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnB1c2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXJCdG4gID0gJCgnYSNoZWFkZXItbWVudS1saW5rJyk7XG4gICAgdmFyICRtYWluQ29udCAgID0gJCgnLm1haW4tY29udCcpO1xuICAgIHZhciAkc2l0ZUhlYWRlciA9ICQoJ2hlYWRlci5zaXRlLWhlYWRlcicpO1xuICAgIHZhciAkbmF2TWVudSAgICA9ICQoJyNuYXYtbWVudScpO1xuXG4gICAgLy8gbWVudSBsaW5rIGNsaWNrZWRcbiAgICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgIC8vIGlmIG1haW4tY29udCBoYXMgY2xhc3MgLnB1c2gtcmlnaHQgdGhlbiByZW1vdmUgaXRcbiAgICAgIGlmICgkbWFpbkNvbnQuaGFzQ2xhc3MoJ3B1c2gtcmlnaHQnKSkge1xuICAgICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM5OTknIH0pO1xuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICcwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLnJlbW92ZUNsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICcwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBpdCBpZiB0aGVyZSBpc250IC5wdXNoLXJpZ2h0XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKCEkc2l0ZUhlYWRlci5oYXNDbGFzcygnd2l0aC1iZycpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIGJnJylcbiAgICAgICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM0ZGFmY2YnIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJHRoaXMuY3NzKHsgJ2NvbG9yJzogJyNmZmYnIH0pXG4gICAgICAgIH1cblxuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMzAwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLmFkZENsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5zdWJtaXRSZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyZWdpc3RlckZvcm0gPSAkKCcjZXZlbnQtcmVnaXN0ZXItZm9ybScpO1xuICAgIHZhciAkZk5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZmlyc3QtbmFtZScpO1xuICAgIHZhciAkbE5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubGFzdC1uYW1lJyk7XG4gICAgdmFyICRlbWFpbCAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5lbWFpbCcpO1xuICAgIHZhciAkbWVzc2FnZSAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubWVzc2FnZScpO1xuICAgIHZhciAkc2x1ZyAgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuaGlkZGVuLXNsdWcnKTtcbiAgICB2YXIgJHJlZ1N1Y2Nlc3MgICA9ICQoJy5yZWdpc3Rlci1zdWNjZXNzJyk7XG4gICAgdmFyICRyZWdFcnJvciAgICAgPSAkKCcucmVnaXN0ZXItZXJyb3InKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybShyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAkcmVnU3VjY2Vzcy5hcHBlbmQoJzxkaXY+JytyZXN1bHQubWVzc2FnZSsnPC9kaXY+Jyk7XG4gICAgICAgICRyZWdTdWNjZXNzLnNob3coKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkcmVnRXJyb3IuYXBwZW5kKCc8ZGl2PicrcmVzdWx0Lm1lc3NhZ2UrJzwvZGl2PicpO1xuICAgICAgICAkcmVnRXJyb3Iuc2hvdygpO1xuICAgICAgfVxuICAgICAgJGZOYW1lLnZhbCgnJyk7XG4gICAgICAkbE5hbWUudmFsKCcnKTtcbiAgICAgICRlbWFpbC52YWwoJycpO1xuICAgICAgJG1lc3NhZ2UudmFsKCcnKTtcbiAgICAgICRzbHVnLnZhbCgnJyk7XG4gICAgfVxuXG4gICAgJHJlZ2lzdGVyRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgZl9uYW1lOiAgICAkZk5hbWUudmFsKCksXG4gICAgICAgIGxfbmFtZTogICAgJGxOYW1lLnZhbCgpLFxuICAgICAgICBmdWxsX25hbWU6ICQudHJpbSgkZk5hbWUudmFsKCkpICsgJyAnICsgJC50cmltKCRsTmFtZS52YWwoKSksXG4gICAgICAgIGVtYWlsOiAgICAgJGVtYWlsLnZhbCgpLFxuICAgICAgICBtZXNzYWdlOiAgICRtZXNzYWdlLnZhbCgpLFxuICAgICAgICBzbHVnOiAgICAgICRzbHVnLnZhbCgpXG4gICAgICB9XG5cbiAgICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8vIGNhbGwgZnVuYyBiYXNlZCBvbiB3ZWF0aGVyIG9yIG5vdCByZXMuc2VuZCh0cnVlKVxuICAgICAgICByZXN1bHQgPyByZXNldEZvcm0ocmVzdWx0KSA6IHJlc2V0Rm9ybShyZXN1bHQpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRjcmVhdGVkQXQgPSAkKCcuYXR0ZW5kZWVfX2NyZWF0ZWQtYXQnKTtcbiAgICB2YXIgJGF0dGVuZGVlTWVzc2FnZSA9ICQoJy5hdHRlbmRlZV9fbWVzc2FnZScpO1xuICAgIHZhciAkdmlld0F0dGVuZGVlc0J0biA9ICQoJy5idG4tYXR0ZW5kZWVzJyk7XG4gICAgdmFyICRhdHRlbmRlZVJvdyA9ICQoJy5hdHRlbmRlZS1yb3cnKTtcbiAgICB2YXIgYXR0Um93U2hvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggYXR0ZW5kZWVcbiAgICAvLyB0YWtlIGVhY2ggZGF0YS1jcmVhdGVkYXQsIGNhbGwgdG9EYXRlU3RyaW5nXG4gICAgLy8gdGhlbiBhcHBlbmQgYmFjayBvbnRvIF9fY3JlYXRlZC1hdFxuICAgICRjcmVhdGVkQXQuZWFjaChmdW5jdGlvbihjYUVsZW0pIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgZGF0ZURhdGEgPSAkdGhpcy5kYXRhKCdjcmVhdGVkYXQnKTtcbiAgICAgIHZhciBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZURhdGEpO1xuICAgICAgJHRoaXMuYXBwZW5kKGRhdGVTdHJpbmcudG9EYXRlU3RyaW5nKCkpO1xuICAgIH0pO1xuXG4gICAgLy8gY2xpY2sgZXZlbnQgZm9yIHZpZXcgYXR0ZW5kZWVzXG4gICAgJHZpZXdBdHRlbmRlZXNCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoIWF0dFJvd1Nob3dpbmcpIHtcbiAgICAgICAgLy8gc2hvdyBhdHRSb3dcbiAgICAgICAgYXR0Um93U2hvd2luZyA9IHRydWU7XG4gICAgICAgICRhdHRlbmRlZVJvdy5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoaWRlIGF0dFJvd1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAucHJvZ3JhbVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcFNsaWRlciAgPSAkKCcjcHJvZ3JhbXMtc2xpZGVyJyk7XG4gICAgdmFyICRwcm9nQWxsICA9ICRwU2xpZGVyLmZpbmQoJ2EucHJvZ3JhbScpO1xuICAgIHZhciAkcHJvZzEgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTEnKTtcbiAgICB2YXIgJHByb2cyICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0yJyk7XG4gICAgdmFyICRwcm9nMyAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMycpO1xuICAgIHZhciAkcHJvZzQgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTQnKTtcbiAgICB2YXIgJHByb2c1ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW01Jyk7XG4gICAgdmFyICRzYXRJbWcgICA9ICRwU2xpZGVyLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJyk7XG4gICAgdmFyICRkZXNhdEltZyA9ICRwU2xpZGVyLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKTtcblxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAvLyBzYW1lIGFjY3Jvc3MgYWxsIHByb2dyYW1zXG4gICAgICAvLyBoaWRlIGRlc2F0IGltZywgc2hvdyBzYXQgaW1nXG4gICAgICAkdGhpc1xuICAgICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuXG4gICAgICAvLyBpZiBzY2VuYXJpbyBwcm9ncmFtWFxuICAgICAgLy8gbWFrZSBjb250ZW50IHdpZHRoIDEwMCVcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTEnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAvLyBwdXNoIGFsbCBvdmVyIDQlXG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjQlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0NCUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzY0JScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODQlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0yJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzE4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gbGVmdCAtMiUgcHVzaCBhbGwgdG8gdGhlIHJpZ2h0IDIlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0zJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzM4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTQnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnNTglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczOCUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW01JykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzc2JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gcHVzaCBhbGwgdG8gdGhlIGxlZnQgLTQlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTQlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxNiUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM2JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNTYlJyB9KTtcblxuICAgICAgfVxuICAgIH0pXG5cbiAgICAkcHJvZ0FsbC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gaGlkZSBhbGwgc2F0LWltZywgc2hvdyBhbGwgZGVzYXQtaW1nXG4gICAgICAkcHJvZ0FsbFxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnODAlJyB9KVxuXG4gICAgICAvLyByZXR1cm4gYWxsIHByb2dhbXMgdG8gdGhlaXJcbiAgICAgIC8vIG5vcm1hbCBzdGF0ZVxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICcwJScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzIwJScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQwJScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYwJScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgwJScgfSk7XG4gICAgfSlcbiAgfVxuXG4gIEFwcC5pbWFnZUdhbGxlcnkgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBvbmNlIGFsbCB0aGUgaW1hZ2VzIGFyZSBhbGwgbG9hZGVkIGluaXQgbWFzb25yeSB3aXRoIG9wdGlvbnNcbiAgICB2YXIgJGdyaWQgPSAkKCcjZ2FsbGVyaWVzIC5ncmlkJykuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgJGdyaWQubWFzb25yeSh7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogICAgJy5ncmlkLWl0ZW0nLFxuICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICAgIGNvbHVtbldpZHRoOiAgICAgJy5ncmlkLXNpemVyJyxcbiAgICAgICAgZ3V0dGVyOiAgICAgICAgICA1XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy5mYW5jeWJveCcpLmZhbmN5Ym94KHtcbiAgICAgIGZpdFRvVmlldzogdHJ1ZSxcbiAgICAgIGNsb3NlQnRuOiAgdHJ1ZSxcbiAgICAgIHBhZGRpbmc6ICAgJzYwcHggMHB4IDMwcHggMHB4JyxcbiAgICAgIC8vIHdpZHRoOiAgJzYwJScsXG4gICAgICAvLyBoZWlnaHQ6ICc2MCUnLFxuICAgICAgbWF4V2lkdGg6ICAxMjAwLFxuICAgICAgbWF4SGVpZ2h0OiA1NjBcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGFjY2VwdHMgYXJyYXkgb2YgaW1nIGxpbmtzIGFuZCBjcmVhdGVzXG4gIC8vIHNsaWRlciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgYmV0d2VlbiB0aGVtXG4gIEFwcC5pbWFnZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2xpZGVyID0gJCgndWwjc2xpZGVyJyk7XG5cbiAgICB2YXIgaW1nTGlua3MgPSBbXG4gICAgICAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9VSXJFTV85cXZaVS9tYXhyZXNkZWZhdWx0LmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5rbm93eW91cnByZXNpZGVudHMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzExL2dlb3JnZS13YXNoaW5ndG9uMS5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cudW5vb3NhLm9yZy9yZXMvdGltZWxpbmUvaW5kZXhfaHRtbC9zcGFjZS0yLmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5kb2dicmVlZHBsdXMuY29tL2ltYWdlcy9wdXJlZG9nc3MucG5nJ1xuICAgIF07XG5cbiAgICAvLyBidWlsZCBFc2xpZGVyIERPTSwgcGFzcyBhbmltYXRlU2xpZGVyIGFzXG4gICAgLy8gY2FsbGJhY2sgdG8gZG8gd2hlbiBhbmltYXRlU2xpZGVyIGlzIGRvbmVcbiAgICBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgYW5pbWF0ZVNsaWRlcik7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKGVycikge1xuICAgICAgdmFyICRzbGlkZUl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScpO1xuICAgICAgdmFyIHNsaWRlckxlbiA9ICRzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgICAgaXRlbTtcblxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGlmIGF0IGVuZCBvZiBhcnJheSwgcmV0dXJuIGNvdW50IHRvIDBcbiAgICAgICAgKGNvdW50ID09PSBzbGlkZXJMZW4gLSAxKSA/IGNvdW50ID0gMCA6IGNvdW50Kys7XG4gICAgICAgIC8vIHJlbW92ZSAuc2hvdyBmcm9tIGFsbCBzbGlkZV9faXRlbSdzXG4gICAgICAgICRzbGlkZUl0ZW1zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgIC8vIGZpbmQgZWxlbWVudCBiYXNlZCBvbiBpdHMgZGF0YS10ZXN0aW5nXG4gICAgICAgIC8vIGF0dHIgdGhlbiBhZGQgLnNob3csIHJlcGVhdCBzSVxuICAgICAgICBpdGVtID0gJChcImxpLnNsaWRlcl9faXRlbVtkYXRhLXRlc3Rpbmc9J1wiK2NvdW50K1wiJ11cIik7XG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3Nob3cnKTtcblxuICAgICAgfSwgNjAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2xpZGVyQXJyID0gW11cblxuICAgICAgLy8gcmV0dXJuIGVycm9yIGlmIG5vIGltZ0xpbmtzIG9yIGltZ0xpbmtzICE9PSBBcnJheVxuICAgICAgaWYgKCFpbWdMaW5rcyB8fCAhKGltZ0xpbmtzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIHZhciBlcnIgPSAndGhlcmUgd2FzIGFuIGVycm9yISc7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBsaXN0IGFuZCBjcmVhdGUgPGltZz5cbiAgICAgIC8vIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgdy9oICYgY2xhc3NcbiAgICAgIGZvciAodmFyIGk9MDsgaTxpbWdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGluayA9IGltZ0xpbmtzW2ldO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXdJbWFnZShsaW5rLCBmYWxzZSk7XG4gICAgICAgIHZhciB0aHVtYm5haWwgPSBuZXdJbWFnZShsaW5rLCB0cnVlKTtcblxuICAgICAgICAvLyB7IGltYWdlOiAkKC4uLiksIHRodW1ibmFpbDogJCguLi4pIH1cbiAgICAgICAgc2xpZGVyQXJyLnB1c2goe1xuICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gb25jZSBzbGlkZXJBcnIgZG9uZSwgY3JlYXRlIGEgbGkuc2xpZGVfX2l0ZW0sXG4gICAgICAvLyBhcHBlbmQgdGhlIGltYWdlIGludG8gdGhlIGxpLCB0aGVuIGFwcGVuZCBsaSBvbnRvICNzbGlkZXJcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzbGlkZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGltZyAgPSBzbGlkZXJBcnJbaV0uaW1hZ2U7XG4gICAgICAgIHZhciBpdGVtID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICAgJ2NsYXNzJzogJ3NsaWRlcl9faXRlbScsXG4gICAgICAgICAgJ2RhdGEtdGVzdGluZyc6IGlcbiAgICAgICAgfSlcblxuICAgICAgICBpdGVtLmFwcGVuZChpbWcpO1xuICAgICAgICAkc2xpZGVyLmFwcGVuZChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsIHdlbnQgd2VsbFxuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBuZXcgaW1nIGVsZW1lbnQgd2l0aCBzcmM9aW1nTGlua1xuICAgIGZ1bmN0aW9uIG5ld0ltYWdlKGltZ0xpbmssIGlzVGh1bWJuYWlsKSB7XG4gICAgICByZXR1cm4gJCgnPGltZy8+Jywge1xuICAgICAgICAnc3JjJzogaW1nTGluayxcbiAgICAgICAgJ2NsYXNzJzogJ3MtaW1nJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBBcHAudHdpdHRlclNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkaW5kaWNhdG9yc1VsID0gJCgnLmNhcm91c2VsLWluZGljYXRvcnMnKTtcbiAgICB2YXIgJGlubmVyQ2Fyb3VzZWwgPSAkKCcuY2Fyb3VzZWwtaW5uZXInKTtcblxuICAgIHZhciB0d2VldHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMSBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMiBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMyBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH1cbiAgICBdXG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dHdlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGRhdGEgPSB0d2VldHNbaV07XG4gICAgICB2YXIgJGluZGljYXRvciA9IGNyZWF0ZUluZGljYXRvcihpKTtcbiAgICAgIHZhciAkaXRlbSA9IGNyZWF0ZUl0ZW0odGRhdGEudGl0bGUsIHRkYXRhLnVybCwgaSlcblxuICAgICAgJGluZGljYXRvcnNVbC5hcHBlbmQoJGluZGljYXRvcik7XG4gICAgICAkaW5uZXJDYXJvdXNlbC5hcHBlbmQoJGl0ZW0pO1xuICAgIH1cblxuICAgICQoJy5jYXJvdXNlbCcpLmNhcm91c2VsKHtcbiAgICAgIGludGVydmFsOiAzMDAwXG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvcihjb3VudCkge1xuICAgICAgdmFyIGluZGkgPSAkKCc8bGkvPicsIHtcbiAgICAgICAgJ2RhdGEtdGFyZ2V0JzogJyN0d2l0dGVyLXNsaWRlcicsXG4gICAgICAgICdkYXRhLXNsaWRlLXRvJzogY291bnRcbiAgICAgIH0pXG5cbiAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICBpbmRpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluZGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbSh0d2VldFRleHQsIHR3ZWV0VXJsLCBjb3VudCkge1xuICAgICAgdmFyIGl0ZW0gPSAkKCc8ZGl2Lz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdpdGVtJ1xuICAgICAgfSk7XG4gICAgICB2YXIgcGFyYSA9ICQoJzxwLz4nKS50ZXh0KHR3ZWV0VGV4dCk7XG4gICAgICB2YXIgYW5jaCA9ICQoJzxhLz4nLCB7XG4gICAgICAgICdocmVmJzogdHdlZXRVcmxcbiAgICAgIH0pLnRleHQodHdlZXRVcmwpO1xuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtLmFwcGVuZChwYXJhKS5hcHBlbmQoYW5jaCk7XG4gICAgfVxuICB9XG5cbiAgQXBwLmNvdW50VG8gPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgZWxlbS5jb3VudFRvKCd0b2dnbGUnKTtcbiAgfVxuXG4gIEFwcC5hZG1pblBhZ2VSZW5kZXJlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkYWRtaW5TZWN0aW9ucyAgID0gJCgnLmFkbWluLXNlY3Rpb24nKTtcbiAgICB2YXIgJGFkbWluQWxsICAgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19hbGwnKTtcbiAgICB2YXIgJGFkbWluQmxvZ3MgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19ibG9ncycpO1xuICAgIHZhciAkYWRtaW5FdmVudHMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2V2ZW50cycpO1xuICAgIHZhciAkYWRtaW5TdWJzICAgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX3N1YnNjcmliZXJzJyk7XG4gICAgdmFyICRhZG1pbkltYWdlcyAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fZ2FsbGVyeScpO1xuICAgIHZhciAkYWRtaW5Eb25hdGlvbnMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2RvbmF0aW9ucycpO1xuXG4gICAgdmFyICRhZG1pbkxpbmtzICAgICAgPSAkKCcuYWRtaW4tbGluaycpO1xuICAgIHZhciAkYWRtaW5MaW5rQWxsICAgID0gJCgnLmFkbWluLWxpbmtfX2FsbCcpO1xuICAgIHZhciAkYWRtaW5MaW5rQmxvZ3MgID0gJCgnLmFkbWluLWxpbmtfX2Jsb2dzJyk7XG4gICAgdmFyICRhZG1pbkxpbmtFdmVudHMgPSAkKCcuYWRtaW4tbGlua19fZXZlbnRzJyk7XG4gICAgdmFyICRhZG1pbkxpbmtTdWJzICAgPSAkKCcuYWRtaW4tbGlua19fc3Vic2NyaWJlcnMnKTtcbiAgICB2YXIgJGFkbWluTGlua0ltYWdlcyA9ICQoJy5hZG1pbi1saW5rX19nYWxsZXJ5Jyk7XG4gICAgdmFyICRhZG1pbkxpbmtEb25hdGlvbnMgPSAkKCcuYWRtaW4tbGlua19fZG9uYXRpb25zJyk7XG5cblxuICAgIC8vIGhhdmUgdGhlIGBhbGxgIGJlIHRoZSBpbml0aWFsIHN0YXRlXG4gICAgJGFkbWluTGlua0FsbC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJGFkbWluQWxsLmFkZENsYXNzKCdzaG93Jyk7XG5cblxuICAgICRhZG1pbkxpbmtzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gLmFkbWluLWxpbmtfX1hYWFxuICAgICAgdmFyICRjbGlja2VkID0gJCh0aGlzKTtcblxuICAgICAgLy8gcmVtb3ZlIGFsbCBzaG93ZWQgYW5kIGFkZCBgYWN0aXZlYFxuICAgICAgLy8gdG8gdGhlIGNsaWNrZWQgbGlua1xuICAgICAgJGFkbWluU2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICRhZG1pbkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICRhZG1pblNlY3Rpb25zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAkY2xpY2tlZC5hZGRDbGFzcygnYWN0aXZlJylcblxuXG4gICAgICBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0FsbFswXSkge1xuICAgICAgICAkYWRtaW5BbGwuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtCbG9nc1swXSkge1xuICAgICAgICAkYWRtaW5CbG9ncy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0V2ZW50c1swXSkge1xuICAgICAgICAkYWRtaW5FdmVudHMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtTdWJzWzBdKSB7XG4gICAgICAgICRhZG1pblN1YnMuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtJbWFnZXNbMF0pIHtcbiAgICAgICAgJGFkbWluSW1hZ2VzLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICgkY2xpY2tlZFswXSA9PSAkYWRtaW5MaW5rRG9uYXRpb25zWzBdKSB7XG4gICAgICAgICRhZG1pbkRvbmF0aW9ucy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfVxuXG4gIEFwcC5nb29nbGVNYXAgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZXF1aXJlZCBzbyBlcnJvciBkb2VzbnQgc2hvdywgc2hvdWxkIGV2ZW50dWFsbHlcbiAgICAvLyBwdXQgYWxsIGNhbGxzIHRvIEFwcCBpbnNpZGUgLmxvYWRcbiAgICAkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblxuICAgICAgLy8gc2V0IHlvdXIgZ29vZ2xlIG1hcHMgcGFyYW1ldGVyc1xuICAgICAgdmFyICRsYXRpdHVkZSA9IDQyLjA5MDI5NyxcbiAgICAgICAgJGxvbmdpdHVkZSA9IC04OC4wNzU5ODIwMDAwMDAwMSxcbiAgICAgICAgJG1hcF96b29tID0gMTI7IC8qIFpPT00gU0VUVElORyAqL1xuXG4gICAgICAvLyBjdXN0b20gbWFya2VyXG4gICAgICB2YXIgJG1hcmtlcl91cmwgPSAnLi4vaW1nL2dvb2dsZS1tYXAtbWFya2VyLnBuZyc7XG5cbiAgICAgIC8vIHBhc3RlZCB0aGUgc3R5bGVkIG1hcHMgZGVmaW5pdGlvblxuICAgICAgdmFyIHN0eWxlID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOlwiMzlcIn0se1wibGlnaHRuZXNzXCI6XCIxMVwifSx7XCJjb2xvclwiOlwiIzk5ZGVlOVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImh1ZVwiOlwiIzdkMDBmZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjozNn0se1wiY29sb3JcIjpcIiMzMzMzMzNcIn0se1wibGlnaHRuZXNzXCI6NDB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZlZmVmZVwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZWZlZmVcIn0se1wibGlnaHRuZXNzXCI6MTd9LHtcIndlaWdodFwiOjEuMn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVsc1wiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjY2QzYzNjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzYxMzczN1wifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2Y3Yzc3MFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubWFuX21hZGVcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlLm5hdHVyYWxcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM4ZWQ4ZTFcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5tZWRpY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwOGI3YmVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNTliMWI1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5tZWRpY2FsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmJlM2JcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLnBhcmtcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM3MjNmODNcIn0se1wid2VpZ2h0XCI6XCIyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wid2VpZ2h0XCI6XCIxXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTd9LHtcImNvbG9yXCI6XCIjZjJiZTNiXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjE3fSx7XCJjb2xvclwiOlwiI2Y1ZjVmNVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM2NDFjN2NcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5zdHJva2VcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn1dfV1cblxuICAgICAgLy8gc2V0IGdvb2dsZSBtYXAgb3B0aW9uc1xuICAgICAgdmFyIG1hcF9vcHRpb25zID0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJGxhdGl0dWRlLCAkbG9uZ2l0dWRlKSxcbiAgICAgICAgem9vbTogJG1hcF96b29tLFxuICAgICAgICBwYW5Db250cm9sOiB0cnVlLFxuICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICBzdHlsZXM6IHN0eWxlXG4gICAgICB9O1xuXG4gICAgICAvLyBpbml6aWFsaXplIHRoZSBtYXBcbiAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29nbGUtY29udGFpbmVyJyksIG1hcF9vcHRpb25zKTtcblxuICAgICAgLy9hZGQgYSBjdXN0b20gbWFya2VyIHRvIHRoZSBtYXBcbiAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoJGxhdGl0dWRlLCAkbG9uZ2l0dWRlKSxcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIGljb246ICRtYXJrZXJfdXJsXG4gICAgICB9KTtcbiAgICB9KVxuICB9XG5cbiAgQXBwLnN1Ym1pdERvbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRkb25hdGVGb3JtID0gJCgnI2RvbmF0ZS1mb3JtJyk7XG5cbiAgICAkZG9uYXRlRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICRmb3JtID0gJCh0aGlzKTtcbiAgICAgICRmb3JtLmZpbmQoJy5idG4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgLy8gY3JlYXRlIHRoZSBzdHJpcGVUb2tlblxuICAgICAgU3RyaXBlLmNhcmQuY3JlYXRlVG9rZW4oJGZvcm0sIHN0cmlwZVJlc3BvbnNlSGFuZGxlcik7XG4gICAgfSlcblxuICAgIC8vIGNhbGxiYWNrIGhhbmRsZXIgdGhhdCBlaXRoZXIgaW5zZXJ0cyBlcnJvcnMgb3IgYXR0YWNoZXNcbiAgICAvLyBzdHJpcGVUb2tlbiB0byBoaWRkZW4gaW5wdXQsIHRoZW4gc3VibWl0cyBmb3JtXG4gICAgZnVuY3Rpb24gc3RyaXBlUmVzcG9uc2VIYW5kbGVyKHN0YXR1cywgcmVzcG9uc2UpIHtcbiAgICAgIHZhciAkZm9ybSA9ICRkb25hdGVGb3JtO1xuXG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICRmb3JtLmZpbmQoJy5wYXltZW50LWVycm9ycycpLnRleHQocmVzcG9uc2UuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICRmb3JtLmZpbmQoJ2J1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgIHZhciB0b2tlbiA9IHJlc3BvbnNlLmlkO1xuICAgICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic3RyaXBlVG9rZW5cIiAvPicpLnZhbCh0b2tlbikpO1xuICAgICAgICAvLyBhbmQgc3VibWl0XG4gICAgICAgICRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cblxuICByb290LkFwcCA9IEFwcDtcblxuICBBcHAudHlwZXIoJy5ubC10eXBlcicpO1xuICBBcHAudG9rZW5GaWVsZCgnI25ldy1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuICBBcHAuc2Nyb2xsRm9sbG93KCcjc2hvdy1ibG9nIC5vbi1yaWdodCwgI2Jsb2dzIC5vbi1yaWdodCcpO1xuICBBcHAubmF2YmFyKCk7XG4gIEFwcC5wdXNoTWVudSgpO1xuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCgpO1xuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuICBBcHAucHJvZ3JhbVNsaWRlcigpO1xuICBBcHAuaW1hZ2VHYWxsZXJ5KCk7XG4gIEFwcC5pbWFnZVNsaWRlcigpOyAvLyBmb3IgamFtZXMgaW5kZXhcbiAgQXBwLnR3aXR0ZXJTbGlkZXIoKTtcbiAgQXBwLmNvdW50VG8oJCgnLmFjaGl2ZW1lbnRzIC50aW1lcicpKTtcbiAgQXBwLmFkbWluUGFnZVJlbmRlcmVyKCk7XG4gIEFwcC5nb29nbGVNYXAoKTtcbiAgQXBwLnN1Ym1pdERvbmF0aW9uKCk7XG5cbn0pKGpRdWVyeSk7XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
