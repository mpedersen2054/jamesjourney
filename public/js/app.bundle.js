
(function($) {

  var root = this;
  App = root.App || {};

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

      }, 3000);
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
      // var width  = isThumbnail ? '40px' : '100%';
      // var height = isThumbnail ? '40px' : '100%';
      // var klass  = isThumbnail ? 's-img-thumb' : 's-img';

      return $('<img/>', {
        'src': imgLink,
        'class': 's-img'
        // 'data-test': num
        // width: widt, ih,
        // height: height, i,
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

    var $adminLinks      = $('.admin-link');
    var $adminLinkAll    = $('.admin-link__all');
    var $adminLinkBlogs  = $('.admin-link__blogs');
    var $adminLinkEvents = $('.admin-link__events');
    var $adminLinkSubs   = $('.admin-link__subscribers');
    var $adminLinkImages = $('.admin-link__gallery');


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
        console.log('hello blogs!')
        $adminAll.addClass('show');
      }
      else if ($clicked[0] == $adminLinkBlogs[0]) {
        console.log('hello blogs!')
        $adminBlogs.addClass('show');
      }
      else if ($clicked[0] == $adminLinkEvents[0]) {
        console.log('hello events!')
        $adminEvents.addClass('show');
      }
      else if ($clicked[0] == $adminLinkSubs[0]) {
        console.log('hello subs!')
        $adminSubs.addClass('show');
      }
      else if ($clicked[0] == $adminLinkImages[0]) {
        console.log('hello images!')
        $adminImages.addClass('show');
      }
    })

  }

  App.googleMap = function() {

    // $(window).load(function() {

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
    // })
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

})(jQuery);


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuKGZ1bmN0aW9uKCQpIHtcblxuICB2YXIgcm9vdCA9IHRoaXM7XG4gIEFwcCA9IHJvb3QuQXBwIHx8IHt9O1xuXG4gIEFwcC50eXBlciA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnR5cGVkKHtcbiAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgJ3N1cHBvcnQgb3VyIGNhdXNlLicsXG4gICAgICAgICdyZWNpZXZlIHJlZ3VsYXIgdXBkYXRlcyBvbiBldmVudHMuJyxcbiAgICAgICAgJ2hlbHAgbWFrZSB0aGUgd29ybGQgYSBiZXR0ZXIgcGxhY2UuJ1xuICAgICAgXSxcbiAgICAgIHR5cGVTcGVlZDogMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBiYWNrRGVsYXk6IDMwMDAsXG4gICAgICBiYWNrU3BlZWQ6IC01LFxuICAgICAgc2hvd0N1cnNvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC50b2tlbkZpZWxkID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudG9rZW5maWVsZCh7XG4gICAgICAvLyBhdXRvY29tcGxldGU6IHtcbiAgICAgIC8vICAgc291cmNlOiBbJ3JlZCcsJ2JsdWUnLCdncmVlbicsJ3llbGxvdycsJ3Zpb2xldCcsJ2Jyb3duJywncHVycGxlJywnYmxhY2snLCd3aGl0ZSddLFxuICAgICAgLy8gICBkZWxheTogMTAwXG4gICAgICAvLyB9LFxuICAgICAgc2hvd0F1dG9jb21wbGV0ZU9uRm9jdXM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudE51bTtcbiAgICB2YXIgbWF4TnVtICAgICAgICAgID0gNjAwO1xuICAgIHZhciAkY29udGVudFByZXZpZXcgPSAkKCcuY29udGVudC1wcmV2aWV3LWlucHV0Jyk7XG4gICAgdmFyICRjdXJyZW50Q291bnQgICA9ICQoJy5jdXJyZW50LWNvdW50Jyk7XG4gICAgdmFyICRtYXhOdW0gICAgICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19tYXgnKTtcbiAgICB2YXIgJGN1cnJlbnROdW0gICAgID0gJCgnLmN1cnJlbnQtY291bnRfX2N1cnJlbnQnKTtcblxuICAgICRjb250ZW50UHJldmlldy5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgIGN1cnJlbnROdW0gPSAkY29udGVudFByZXZpZXcudmFsKCkubGVuZ3RoO1xuICAgICAgJGN1cnJlbnROdW0udGV4dChjdXJyZW50TnVtKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gcGx1Z2luIHVzZWQgaW4gYmxvZ3Mvc2hvd19ibG9nIHNpZGViYXJcbiAgQXBwLnNjcm9sbEZvbGxvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnNpbXBsZVNjcm9sbEZvbGxvdyh7XG4gICAgICBsaW1pdF9lbGVtOiAnLm9uLWxlZnQnXG4gICAgfSk7XG4gIH1cblxuICBBcHAubmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXIgPSAkKCdoZWFkZXInKTtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICB2YXIgJGxvZ28gPSAkKCcjaGVhZGVyLWxvZ28tbGluaycpO1xuICAgIHZhciAkbWVudSA9ICQoJyNoZWFkZXItbWVudS1saW5rJyk7XG5cbiAgICAkd2luZG93Lm9uKCdzY3JvbGwgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNjcm9sbFRvcCgpKVxuICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMCkge1xuICAgICAgICAkbmF2YmFyLmFkZENsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnI2RkZCcgfSlcbiAgICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAuOCcsIGhlaWdodDogJzQwcHgnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyM5OTknIH0pXG4gICAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwJywgaGVpZ2h0OiAnNjBweCcgfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5wdXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkbmF2YmFyQnRuICA9ICQoJ2EjaGVhZGVyLW1lbnUtbGluaycpO1xuICAgIHZhciAkbWFpbkNvbnQgICA9ICQoJy5tYWluLWNvbnQnKTtcbiAgICB2YXIgJHNpdGVIZWFkZXIgPSAkKCdoZWFkZXIuc2l0ZS1oZWFkZXInKTtcbiAgICB2YXIgJG5hdk1lbnUgICAgPSAkKCcjbmF2LW1lbnUnKTtcblxuICAgIC8vIG1lbnUgbGluayBjbGlja2VkXG4gICAgJG5hdmJhckJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAvLyBpZiBtYWluLWNvbnQgaGFzIGNsYXNzIC5wdXNoLXJpZ2h0IHRoZW4gcmVtb3ZlIGl0XG4gICAgICBpZiAoJG1haW5Db250Lmhhc0NsYXNzKCdwdXNoLXJpZ2h0JykpIHtcbiAgICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjOTk5JyB9KTtcbiAgICAgICAgJG5hdk1lbnVcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMHB4JyB9LCAyMDApXG4gICAgICAgICRtYWluQ29udFxuICAgICAgICAgIC5yZW1vdmVDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnMHB4JyB9LCAyMDApXG4gICAgICB9XG4gICAgICAvLyBhZGQgaXQgaWYgdGhlcmUgaXNudCAucHVzaC1yaWdodFxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmICghJHNpdGVIZWFkZXIuaGFzQ2xhc3MoJ3dpdGgtYmcnKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBiZycpXG4gICAgICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjNGRhZmNmJyB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICR0aGlzLmNzcyh7ICdjb2xvcic6ICcjZmZmJyB9KVxuICAgICAgICB9XG5cbiAgICAgICAgJG5hdk1lbnVcbiAgICAgICAgICAuc2hvdygpXG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzMwMHB4JyB9LCAyMDApXG4gICAgICAgICRtYWluQ29udFxuICAgICAgICAgIC5hZGRDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnLTMwMHB4JyB9LCAyMDApXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgICB2YXIgJGZOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmZpcnN0LW5hbWUnKTtcbiAgICB2YXIgJGxOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmxhc3QtbmFtZScpO1xuICAgIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgICB2YXIgJG1lc3NhZ2UgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLm1lc3NhZ2UnKTtcbiAgICB2YXIgJHNsdWcgICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmhpZGRlbi1zbHVnJyk7XG4gICAgdmFyICRyZWdTdWNjZXNzICAgPSAkKCcucmVnaXN0ZXItc3VjY2VzcycpO1xuICAgIHZhciAkcmVnRXJyb3IgICAgID0gJCgnLnJlZ2lzdGVyLWVycm9yJyk7XG5cbiAgICBmdW5jdGlvbiByZXNldEZvcm0ocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgJHJlZ1N1Y2Nlc3MuYXBwZW5kKCc8ZGl2PicrcmVzdWx0Lm1lc3NhZ2UrJzwvZGl2PicpO1xuICAgICAgICAkcmVnU3VjY2Vzcy5zaG93KCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJHJlZ0Vycm9yLmFwcGVuZCgnPGRpdj4nK3Jlc3VsdC5tZXNzYWdlKyc8L2Rpdj4nKTtcbiAgICAgICAgJHJlZ0Vycm9yLnNob3coKTtcbiAgICAgIH1cbiAgICAgICRmTmFtZS52YWwoJycpO1xuICAgICAgJGxOYW1lLnZhbCgnJyk7XG4gICAgICAkZW1haWwudmFsKCcnKTtcbiAgICAgICRtZXNzYWdlLnZhbCgnJyk7XG4gICAgICAkc2x1Zy52YWwoJycpO1xuICAgIH1cblxuICAgICRyZWdpc3RlckZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGZfbmFtZTogICAgJGZOYW1lLnZhbCgpLFxuICAgICAgICBsX25hbWU6ICAgICRsTmFtZS52YWwoKSxcbiAgICAgICAgZnVsbF9uYW1lOiAkLnRyaW0oJGZOYW1lLnZhbCgpKSArICcgJyArICQudHJpbSgkbE5hbWUudmFsKCkpLFxuICAgICAgICBlbWFpbDogICAgICRlbWFpbC52YWwoKSxcbiAgICAgICAgbWVzc2FnZTogICAkbWVzc2FnZS52YWwoKSxcbiAgICAgICAgc2x1ZzogICAgICAkc2x1Zy52YWwoKVxuICAgICAgfVxuXG4gICAgICAkLnBvc3QoJy9ldmVudHMvJytkYXRhLnNsdWcrJy9yZWdpc3RlcicsIGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAvLyBjYWxsIGZ1bmMgYmFzZWQgb24gd2VhdGhlciBvciBub3QgcmVzLnNlbmQodHJ1ZSlcbiAgICAgICAgcmVzdWx0ID8gcmVzZXRGb3JtKHJlc3VsdCkgOiByZXNldEZvcm0ocmVzdWx0KTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkY3JlYXRlZEF0ID0gJCgnLmF0dGVuZGVlX19jcmVhdGVkLWF0Jyk7XG4gICAgdmFyICRhdHRlbmRlZU1lc3NhZ2UgPSAkKCcuYXR0ZW5kZWVfX21lc3NhZ2UnKTtcbiAgICB2YXIgJHZpZXdBdHRlbmRlZXNCdG4gPSAkKCcuYnRuLWF0dGVuZGVlcycpO1xuICAgIHZhciAkYXR0ZW5kZWVSb3cgPSAkKCcuYXR0ZW5kZWUtcm93Jyk7XG4gICAgdmFyIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGF0dGVuZGVlXG4gICAgLy8gdGFrZSBlYWNoIGRhdGEtY3JlYXRlZGF0LCBjYWxsIHRvRGF0ZVN0cmluZ1xuICAgIC8vIHRoZW4gYXBwZW5kIGJhY2sgb250byBfX2NyZWF0ZWQtYXRcbiAgICAkY3JlYXRlZEF0LmVhY2goZnVuY3Rpb24oY2FFbGVtKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIGRhdGVEYXRhID0gJHRoaXMuZGF0YSgnY3JlYXRlZGF0Jyk7XG4gICAgICB2YXIgZGF0ZVN0cmluZyA9IG5ldyBEYXRlKGRhdGVEYXRhKTtcbiAgICAgICR0aGlzLmFwcGVuZChkYXRlU3RyaW5nLnRvRGF0ZVN0cmluZygpKTtcbiAgICB9KTtcblxuICAgIC8vIGNsaWNrIGV2ZW50IGZvciB2aWV3IGF0dGVuZGVlc1xuICAgICR2aWV3QXR0ZW5kZWVzQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCFhdHRSb3dTaG93aW5nKSB7XG4gICAgICAgIC8vIHNob3cgYXR0Um93XG4gICAgICAgIGF0dFJvd1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICAkYXR0ZW5kZWVSb3cuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGlkZSBhdHRSb3dcbiAgICAgICAgYXR0Um93U2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAkYXR0ZW5kZWVSb3cuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnByb2dyYW1TbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHBTbGlkZXIgID0gJCgnI3Byb2dyYW1zLXNsaWRlcicpO1xuICAgIHZhciAkcHJvZ0FsbCAgPSAkcFNsaWRlci5maW5kKCdhLnByb2dyYW0nKTtcbiAgICB2YXIgJHByb2cxICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0xJyk7XG4gICAgdmFyICRwcm9nMiAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMicpO1xuICAgIHZhciAkcHJvZzMgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTMnKTtcbiAgICB2YXIgJHByb2c0ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW00Jyk7XG4gICAgdmFyICRwcm9nNSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNScpO1xuICAgIHZhciAkc2F0SW1nICAgPSAkcFNsaWRlci5maW5kKCcuc2F0dXJhdGVkLWltZycpO1xuICAgIHZhciAkZGVzYXRJbWcgPSAkcFNsaWRlci5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJyk7XG5cblxuICAgICRwcm9nQWxsLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgLy8gc2FtZSBhY2Nyb3NzIGFsbCBwcm9ncmFtc1xuICAgICAgLy8gaGlkZSBkZXNhdCBpbWcsIHNob3cgc2F0IGltZ1xuICAgICAgJHRoaXNcbiAgICAgICAgLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcblxuICAgICAgLy8gaWYgc2NlbmFyaW8gcHJvZ3JhbVhcbiAgICAgIC8vIG1ha2UgY29udGVudCB3aWR0aCAxMDAlXG4gICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0xJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gcHVzaCBhbGwgb3ZlciA0JVxuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzI0JScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDQlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2NCUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzg0JScgfSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMicpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICcxOCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgIC8vIGxlZnQgLTIlIHB1c2ggYWxsIHRvIHRoZSByaWdodCAyJVxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDIlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMycpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICczOCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW00JykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzU4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnMzglJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtNScpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICc3NiUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgIC8vIHB1c2ggYWxsIHRvIHRoZSBsZWZ0IC00JVxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy00JScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTYlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczNiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzU2JScgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIGhpZGUgYWxsIHNhdC1pbWcsIHNob3cgYWxsIGRlc2F0LWltZ1xuICAgICAgJHByb2dBbGxcbiAgICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzgwJScgfSlcblxuICAgICAgLy8gcmV0dXJuIGFsbCBwcm9nYW1zIHRvIHRoZWlyXG4gICAgICAvLyBub3JtYWwgc3RhdGVcbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnMCUnIH0pO1xuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyMCUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MCUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MCUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MCUnIH0pO1xuICAgIH0pXG4gIH1cblxuICBBcHAuaW1hZ2VHYWxsZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gb25jZSBhbGwgdGhlIGltYWdlcyBhcmUgYWxsIGxvYWRlZCBpbml0IG1hc29ucnkgd2l0aCBvcHRpb25zXG4gICAgdmFyICRncmlkID0gJCgnI2dhbGxlcmllcyAuZ3JpZCcpLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICRncmlkLm1hc29ucnkoe1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICAgICcuZ3JpZC1pdGVtJyxcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjb2x1bW5XaWR0aDogICAgICcuZ3JpZC1zaXplcicsXG4gICAgICAgIGd1dHRlcjogICAgICAgICAgNVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKCcuZmFuY3lib3gnKS5mYW5jeWJveCh7XG4gICAgICBmaXRUb1ZpZXc6IHRydWUsXG4gICAgICBjbG9zZUJ0bjogIHRydWUsXG4gICAgICBwYWRkaW5nOiAgICc2MHB4IDBweCAzMHB4IDBweCcsXG4gICAgICAvLyB3aWR0aDogICc2MCUnLFxuICAgICAgLy8gaGVpZ2h0OiAnNjAlJyxcbiAgICAgIG1heFdpZHRoOiAgMTIwMCxcbiAgICAgIG1heEhlaWdodDogNTYwXG4gICAgfSk7XG4gIH1cblxuICAvLyBhY2NlcHRzIGFycmF5IG9mIGltZyBsaW5rcyBhbmQgY3JlYXRlc1xuICAvLyBzbGlkZXIgZWxlbWVudHMgYW5kIGFuaW1hdGVzIGJldHdlZW4gdGhlbVxuICBBcHAuaW1hZ2VTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHNsaWRlciA9ICQoJ3VsI3NsaWRlcicpO1xuXG4gICAgdmFyIGltZ0xpbmtzID0gW1xuICAgICAgJ2h0dHBzOi8vaS55dGltZy5jb20vdmkvVUlyRU1fOXF2WlUvbWF4cmVzZGVmYXVsdC5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cua25vd3lvdXJwcmVzaWRlbnRzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8xMS9nZW9yZ2Utd2FzaGluZ3RvbjEuanBnJyxcbiAgICAgICdodHRwOi8vd3d3LnVub29zYS5vcmcvcmVzL3RpbWVsaW5lL2luZGV4X2h0bWwvc3BhY2UtMi5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cuZG9nYnJlZWRwbHVzLmNvbS9pbWFnZXMvcHVyZWRvZ3NzLnBuZydcbiAgICBdO1xuXG4gICAgLy8gYnVpbGQgRXNsaWRlciBET00sIHBhc3MgYW5pbWF0ZVNsaWRlciBhc1xuICAgIC8vIGNhbGxiYWNrIHRvIGRvIHdoZW4gYW5pbWF0ZVNsaWRlciBpcyBkb25lXG4gICAgYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGFuaW1hdGVTbGlkZXIpO1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlcihlcnIpIHtcbiAgICAgIHZhciAkc2xpZGVJdGVtcyA9ICQoJy5zbGlkZXJfX2l0ZW0nKTtcbiAgICAgIHZhciBzbGlkZXJMZW4gPSAkc2xpZGVJdGVtcy5sZW5ndGgsXG4gICAgICAgICAgY291bnQgPSAwLFxuICAgICAgICAgIGl0ZW07XG5cbiAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBpZiBhdCBlbmQgb2YgYXJyYXksIHJldHVybiBjb3VudCB0byAwXG4gICAgICAgIChjb3VudCA9PT0gc2xpZGVyTGVuIC0gMSkgPyBjb3VudCA9IDAgOiBjb3VudCsrO1xuICAgICAgICAvLyByZW1vdmUgLnNob3cgZnJvbSBhbGwgc2xpZGVfX2l0ZW0nc1xuICAgICAgICAkc2xpZGVJdGVtcy5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAvLyBmaW5kIGVsZW1lbnQgYmFzZWQgb24gaXRzIGRhdGEtdGVzdGluZ1xuICAgICAgICAvLyBhdHRyIHRoZW4gYWRkIC5zaG93LCByZXBlYXQgc0lcbiAgICAgICAgaXRlbSA9ICQoXCJsaS5zbGlkZXJfX2l0ZW1bZGF0YS10ZXN0aW5nPSdcIitjb3VudCtcIiddXCIpO1xuICAgICAgICBpdGVtLmFkZENsYXNzKCdzaG93Jyk7XG5cbiAgICAgIH0sIDMwMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkU2xpZGVyRG9tKGltZ0xpbmtzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHNsaWRlckFyciA9IFtdXG5cbiAgICAgIC8vIHJldHVybiBlcnJvciBpZiBubyBpbWdMaW5rcyBvciBpbWdMaW5rcyAhPT0gQXJyYXlcbiAgICAgIGlmICghaW1nTGlua3MgfHwgIShpbWdMaW5rcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICB2YXIgZXJyID0gJ3RoZXJlIHdhcyBhbiBlcnJvciEnO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuXG4gICAgICAvLyBpdGVyYXRlIG92ZXIgbGlzdCBhbmQgY3JlYXRlIDxpbWc+XG4gICAgICAvLyBpbWFnZSBhbmQgdGh1bWJuYWlsIGhhdmUgZGlmZmVyZW50IHcvaCAmIGNsYXNzXG4gICAgICBmb3IgKHZhciBpPTA7IGk8aW1nTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmsgPSBpbWdMaW5rc1tpXTtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3SW1hZ2UobGluaywgZmFsc2UpO1xuICAgICAgICB2YXIgdGh1bWJuYWlsID0gbmV3SW1hZ2UobGluaywgdHJ1ZSk7XG5cbiAgICAgICAgLy8geyBpbWFnZTogJCguLi4pLCB0aHVtYm5haWw6ICQoLi4uKSB9XG4gICAgICAgIHNsaWRlckFyci5wdXNoKHtcbiAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgdGh1bWJuYWlsOiB0aHVtYm5haWxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIG9uY2Ugc2xpZGVyQXJyIGRvbmUsIGNyZWF0ZSBhIGxpLnNsaWRlX19pdGVtLFxuICAgICAgLy8gYXBwZW5kIHRoZSBpbWFnZSBpbnRvIHRoZSBsaSwgdGhlbiBhcHBlbmQgbGkgb250byAjc2xpZGVyXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2xpZGVyQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpbWcgID0gc2xpZGVyQXJyW2ldLmltYWdlO1xuICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaS8+Jywge1xuICAgICAgICAgICdjbGFzcyc6ICdzbGlkZXJfX2l0ZW0nLFxuICAgICAgICAgICdkYXRhLXRlc3RpbmcnOiBpXG4gICAgICAgIH0pXG5cbiAgICAgICAgaXRlbS5hcHBlbmQoaW1nKTtcbiAgICAgICAgJHNsaWRlci5hcHBlbmQoaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFsbCB3ZW50IHdlbGxcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgIH1cblxuICAgIC8vIHJldHVybnMgbmV3IGltZyBlbGVtZW50IHdpdGggc3JjPWltZ0xpbmtcbiAgICBmdW5jdGlvbiBuZXdJbWFnZShpbWdMaW5rLCBpc1RodW1ibmFpbCkge1xuICAgICAgLy8gdmFyIHdpZHRoICA9IGlzVGh1bWJuYWlsID8gJzQwcHgnIDogJzEwMCUnO1xuICAgICAgLy8gdmFyIGhlaWdodCA9IGlzVGh1bWJuYWlsID8gJzQwcHgnIDogJzEwMCUnO1xuICAgICAgLy8gdmFyIGtsYXNzICA9IGlzVGh1bWJuYWlsID8gJ3MtaW1nLXRodW1iJyA6ICdzLWltZyc7XG5cbiAgICAgIHJldHVybiAkKCc8aW1nLz4nLCB7XG4gICAgICAgICdzcmMnOiBpbWdMaW5rLFxuICAgICAgICAnY2xhc3MnOiAncy1pbWcnXG4gICAgICAgIC8vICdkYXRhLXRlc3QnOiBudW1cbiAgICAgICAgLy8gd2lkdGg6IHdpZHQsIGloLFxuICAgICAgICAvLyBoZWlnaHQ6IGhlaWdodCwgaSxcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgQXBwLnR3aXR0ZXJTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGluZGljYXRvcnNVbCA9ICQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJyk7XG4gICAgdmFyICRpbm5lckNhcm91c2VsID0gJCgnLmNhcm91c2VsLWlubmVyJyk7XG5cbiAgICB2YXIgdHdlZXRzID0gW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJzEgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJzIgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJzMgQ2xhcml0YXMgZXN0IGV0aWFtIHByb2Nlc3N1cyBkeW5hbWljdXMsIHF1aSBzZXF1aXR1ciBtdXRhdGlvbmVtIGNvbnN1ZXR1ZGl1bSBsZWN0b3J1bS4gTWlydW0gZXN0IG5vdGFyZSBxdWFtIC4uLicsXG4gICAgICAgIHVybDogJ2h0dHA6Ly90LmNvLzdGb1ZTUDB2SWYnXG4gICAgICB9XG4gICAgXVxuXG4gICAgZm9yICh2YXIgaT0wOyBpPHR3ZWV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRkYXRhID0gdHdlZXRzW2ldO1xuICAgICAgdmFyICRpbmRpY2F0b3IgPSBjcmVhdGVJbmRpY2F0b3IoaSk7XG4gICAgICB2YXIgJGl0ZW0gPSBjcmVhdGVJdGVtKHRkYXRhLnRpdGxlLCB0ZGF0YS51cmwsIGkpXG5cbiAgICAgICRpbmRpY2F0b3JzVWwuYXBwZW5kKCRpbmRpY2F0b3IpO1xuICAgICAgJGlubmVyQ2Fyb3VzZWwuYXBwZW5kKCRpdGVtKTtcbiAgICB9XG5cbiAgICAkKCcuY2Fyb3VzZWwnKS5jYXJvdXNlbCh7XG4gICAgICBpbnRlcnZhbDogMzAwMFxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3IoY291bnQpIHtcbiAgICAgIHZhciBpbmRpID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICdkYXRhLXRhcmdldCc6ICcjdHdpdHRlci1zbGlkZXInLFxuICAgICAgICAnZGF0YS1zbGlkZS10byc6IGNvdW50XG4gICAgICB9KVxuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaW5kaS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmRpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHdlZXRUZXh0LCB0d2VldFVybCwgY291bnQpIHtcbiAgICAgIHZhciBpdGVtID0gJCgnPGRpdi8+Jywge1xuICAgICAgICAnY2xhc3MnOiAnaXRlbSdcbiAgICAgIH0pO1xuICAgICAgdmFyIHBhcmEgPSAkKCc8cC8+JykudGV4dCh0d2VldFRleHQpO1xuICAgICAgdmFyIGFuY2ggPSAkKCc8YS8+Jywge1xuICAgICAgICAnaHJlZic6IHR3ZWV0VXJsXG4gICAgICB9KS50ZXh0KHR3ZWV0VXJsKTtcblxuICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbS5hcHBlbmQocGFyYSkuYXBwZW5kKGFuY2gpO1xuICAgIH1cbiAgfVxuXG4gIEFwcC5jb3VudFRvID0gZnVuY3Rpb24oZWxlbSkge1xuICAgIGVsZW0uY291bnRUbygndG9nZ2xlJyk7XG4gIH1cblxuICBBcHAuYWRtaW5QYWdlUmVuZGVyZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGFkbWluU2VjdGlvbnMgICA9ICQoJy5hZG1pbi1zZWN0aW9uJyk7XG4gICAgdmFyICRhZG1pbkFsbCAgICAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fYWxsJyk7XG4gICAgdmFyICRhZG1pbkJsb2dzICAgICAgPSAkKCcuYWRtaW4tc2VjdGlvbl9fYmxvZ3MnKTtcbiAgICB2YXIgJGFkbWluRXZlbnRzICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19ldmVudHMnKTtcbiAgICB2YXIgJGFkbWluU3VicyAgICAgICA9ICQoJy5hZG1pbi1zZWN0aW9uX19zdWJzY3JpYmVycycpO1xuICAgIHZhciAkYWRtaW5JbWFnZXMgICAgID0gJCgnLmFkbWluLXNlY3Rpb25fX2dhbGxlcnknKTtcblxuICAgIHZhciAkYWRtaW5MaW5rcyAgICAgID0gJCgnLmFkbWluLWxpbmsnKTtcbiAgICB2YXIgJGFkbWluTGlua0FsbCAgICA9ICQoJy5hZG1pbi1saW5rX19hbGwnKTtcbiAgICB2YXIgJGFkbWluTGlua0Jsb2dzICA9ICQoJy5hZG1pbi1saW5rX19ibG9ncycpO1xuICAgIHZhciAkYWRtaW5MaW5rRXZlbnRzID0gJCgnLmFkbWluLWxpbmtfX2V2ZW50cycpO1xuICAgIHZhciAkYWRtaW5MaW5rU3VicyAgID0gJCgnLmFkbWluLWxpbmtfX3N1YnNjcmliZXJzJyk7XG4gICAgdmFyICRhZG1pbkxpbmtJbWFnZXMgPSAkKCcuYWRtaW4tbGlua19fZ2FsbGVyeScpO1xuXG5cbiAgICAvLyBoYXZlIHRoZSBgYWxsYCBiZSB0aGUgaW5pdGlhbCBzdGF0ZVxuICAgICRhZG1pbkxpbmtBbGwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICRhZG1pbkFsbC5hZGRDbGFzcygnc2hvdycpO1xuXG5cbiAgICAkYWRtaW5MaW5rcy5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIC5hZG1pbi1saW5rX19YWFhcbiAgICAgIHZhciAkY2xpY2tlZCA9ICQodGhpcyk7XG5cbiAgICAgIC8vIHJlbW92ZSBhbGwgc2hvd2VkIGFuZCBhZGQgYGFjdGl2ZWBcbiAgICAgIC8vIHRvIHRoZSBjbGlja2VkIGxpbmtcbiAgICAgICRhZG1pblNlY3Rpb25zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAkYWRtaW5MaW5rcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkYWRtaW5TZWN0aW9ucy5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgJGNsaWNrZWQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cblxuICAgICAgaWYgKCRjbGlja2VkWzBdID09ICRhZG1pbkxpbmtBbGxbMF0pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIGJsb2dzIScpXG4gICAgICAgICRhZG1pbkFsbC5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0Jsb2dzWzBdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyBibG9ncyEnKVxuICAgICAgICAkYWRtaW5CbG9ncy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0V2ZW50c1swXSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gZXZlbnRzIScpXG4gICAgICAgICRhZG1pbkV2ZW50cy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua1N1YnNbMF0pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvIHN1YnMhJylcbiAgICAgICAgJGFkbWluU3Vicy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJGNsaWNrZWRbMF0gPT0gJGFkbWluTGlua0ltYWdlc1swXSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGVsbG8gaW1hZ2VzIScpXG4gICAgICAgICRhZG1pbkltYWdlcy5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfVxuXG4gIEFwcC5nb29nbGVNYXAgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBzZXQgeW91ciBnb29nbGUgbWFwcyBwYXJhbWV0ZXJzXG4gICAgICB2YXIgJGxhdGl0dWRlID0gNDIuMDkwMjk3LFxuICAgICAgICAkbG9uZ2l0dWRlID0gLTg4LjA3NTk4MjAwMDAwMDAxLFxuICAgICAgICAkbWFwX3pvb20gPSAxMjsgLyogWk9PTSBTRVRUSU5HICovXG5cbiAgICAgIC8vIGN1c3RvbSBtYXJrZXJcbiAgICAgIHZhciAkbWFya2VyX3VybCA9ICcuLi9pbWcvZ29vZ2xlLW1hcC1tYXJrZXIucG5nJztcblxuICAgICAgLy8gcGFzdGVkIHRoZSBzdHlsZWQgbWFwcyBkZWZpbml0aW9uXG4gICAgICB2YXIgc3R5bGUgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6XCIzOVwifSx7XCJsaWdodG5lc3NcIjpcIjExXCJ9LHtcImNvbG9yXCI6XCIjOTlkZWU5XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiaHVlXCI6XCIjN2QwMGZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOjM2fSx7XCJjb2xvclwiOlwiIzMzMzMzM1wifSx7XCJsaWdodG5lc3NcIjo0MH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmVmZWZlXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZlZmVmZVwifSx7XCJsaWdodG5lc3NcIjoxN30se1wid2VpZ2h0XCI6MS4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNjZDNjM2NcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNjEzNzM3XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjdjNzcwXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZS5tYW5fbWFkZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGUubmF0dXJhbFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzhlZDhlMVwifSx7XCJsaWdodG5lc3NcIjoyMX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzA4YjdiZVwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kubWVkaWNhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM1OWIxYjVcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pLm1lZGljYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyYmUzYlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2kucGFya1wiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjIxfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzcyM2Y4M1wifSx7XCJ3ZWlnaHRcIjpcIjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJ3ZWlnaHRcIjpcIjFcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJsaWdodG5lc3NcIjoxN30se1wiY29sb3JcIjpcIiNmMmJlM2JcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImxpZ2h0bmVzc1wiOjI5fSx7XCJ3ZWlnaHRcIjowLjJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxOH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5sb2NhbFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmZmZmZmXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn0se1wibGlnaHRuZXNzXCI6MTl9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wibGlnaHRuZXNzXCI6MTd9LHtcImNvbG9yXCI6XCIjZjVmNWY1XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzY0MWM3Y1wifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifV19XVxuXG4gICAgICAvLyBzZXQgZ29vZ2xlIG1hcCBvcHRpb25zXG4gICAgICB2YXIgbWFwX29wdGlvbnMgPSB7XG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgICB6b29tOiAkbWFwX3pvb20sXG4gICAgICAgIHBhbkNvbnRyb2w6IHRydWUsXG4gICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sOiB0cnVlLFxuICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgIHN0eWxlczogc3R5bGVcbiAgICAgIH07XG5cbiAgICAgIC8vIGluaXppYWxpemUgdGhlIG1hcFxuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2dsZS1jb250YWluZXInKSwgbWFwX29wdGlvbnMpO1xuXG4gICAgICAvL2FkZCBhIGN1c3RvbSBtYXJrZXIgdG8gdGhlIG1hcFxuICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZygkbGF0aXR1ZGUsICRsb25naXR1ZGUpLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogJG1hcmtlcl91cmxcbiAgICAgIH0pO1xuICAgIC8vIH0pXG4gIH1cblxuICByb290LkFwcCA9IEFwcDtcblxuICBBcHAudHlwZXIoJy5ubC10eXBlcicpO1xuICBBcHAudG9rZW5GaWVsZCgnI25ldy1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuICBBcHAuc2Nyb2xsRm9sbG93KCcjc2hvdy1ibG9nIC5vbi1yaWdodCwgI2Jsb2dzIC5vbi1yaWdodCcpO1xuICBBcHAubmF2YmFyKCk7XG4gIEFwcC5wdXNoTWVudSgpO1xuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCgpO1xuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuICBBcHAucHJvZ3JhbVNsaWRlcigpO1xuICBBcHAuaW1hZ2VHYWxsZXJ5KCk7XG4gIEFwcC5pbWFnZVNsaWRlcigpOyAvLyBmb3IgamFtZXMgaW5kZXhcbiAgQXBwLnR3aXR0ZXJTbGlkZXIoKTtcbiAgQXBwLmNvdW50VG8oJCgnLmFjaGl2ZW1lbnRzIC50aW1lcicpKTtcbiAgQXBwLmFkbWluUGFnZVJlbmRlcmVyKCk7XG4gIEFwcC5nb29nbGVNYXAoKTtcblxufSkoalF1ZXJ5KTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
