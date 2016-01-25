
// ROUTER IF I WANT IT
// // initiate router
// var params = { format: 'html' };
// var router = new PathParser(params);

// // STATIC ROUTES
// router.add('/', function() {
//   console.log('hello index!');
// });


// // BLOG ROUTES
// router.add('/blog', function() {
//   console.log('hello blog!')
// });

// router.add('/blog/:slug', function() {
//   console.log('hello blog show! ' + params.slug)
// });


// // EVENT ROUTES
// router.add('/events', function() {
//   console.log('hello events!')
// });

// router.add('/events/:slug', function() {
//   console.log('hello events show! ' + params.slug)
// });


// // GALLERY ROUTES
// router.add('/gallery', function() {
//   console.log('hello gallery!')
// });


// // run the router with the current url
// router.run(window.location.pathname);


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
        $logo.css({ opacity: '0.8' });
      } else {
        $navbar.removeClass('with-bg');
        $menu.css({ color: '#999' })
        $logo.css({ opacity: '0' })
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

    function resetForm(wasSuccess) {
      if (wasSuccess) {
        $regSuccess.show();
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
        result ? resetForm(true) : resetForm(false);
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

})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIFJPVVRFUiBJRiBJIFdBTlQgSVRcbi8vIC8vIGluaXRpYXRlIHJvdXRlclxuLy8gdmFyIHBhcmFtcyA9IHsgZm9ybWF0OiAnaHRtbCcgfTtcbi8vIHZhciByb3V0ZXIgPSBuZXcgUGF0aFBhcnNlcihwYXJhbXMpO1xuXG4vLyAvLyBTVEFUSUMgUk9VVEVTXG4vLyByb3V0ZXIuYWRkKCcvJywgZnVuY3Rpb24oKSB7XG4vLyAgIGNvbnNvbGUubG9nKCdoZWxsbyBpbmRleCEnKTtcbi8vIH0pO1xuXG5cbi8vIC8vIEJMT0cgUk9VVEVTXG4vLyByb3V0ZXIuYWRkKCcvYmxvZycsIGZ1bmN0aW9uKCkge1xuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gYmxvZyEnKVxuLy8gfSk7XG5cbi8vIHJvdXRlci5hZGQoJy9ibG9nLzpzbHVnJywgZnVuY3Rpb24oKSB7XG4vLyAgIGNvbnNvbGUubG9nKCdoZWxsbyBibG9nIHNob3chICcgKyBwYXJhbXMuc2x1Zylcbi8vIH0pO1xuXG5cbi8vIC8vIEVWRU5UIFJPVVRFU1xuLy8gcm91dGVyLmFkZCgnL2V2ZW50cycsIGZ1bmN0aW9uKCkge1xuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gZXZlbnRzIScpXG4vLyB9KTtcblxuLy8gcm91dGVyLmFkZCgnL2V2ZW50cy86c2x1ZycsIGZ1bmN0aW9uKCkge1xuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gZXZlbnRzIHNob3chICcgKyBwYXJhbXMuc2x1Zylcbi8vIH0pO1xuXG5cbi8vIC8vIEdBTExFUlkgUk9VVEVTXG4vLyByb3V0ZXIuYWRkKCcvZ2FsbGVyeScsIGZ1bmN0aW9uKCkge1xuLy8gICBjb25zb2xlLmxvZygnaGVsbG8gZ2FsbGVyeSEnKVxuLy8gfSk7XG5cblxuLy8gLy8gcnVuIHRoZSByb3V0ZXIgd2l0aCB0aGUgY3VycmVudCB1cmxcbi8vIHJvdXRlci5ydW4od2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuXG4oZnVuY3Rpb24oJCkge1xuXG4gIHZhciByb290ID0gdGhpcztcbiAgQXBwID0gcm9vdC5BcHAgfHwge307XG5cbiAgQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudHlwZWQoe1xuICAgICAgc3RyaW5nczogW1xuICAgICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgICBdLFxuICAgICAgdHlwZVNwZWVkOiAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICAgIGJhY2tTcGVlZDogLTUsXG4gICAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnRva2VuRmllbGQgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50b2tlbmZpZWxkKHtcbiAgICAgIC8vIGF1dG9jb21wbGV0ZToge1xuICAgICAgLy8gICBzb3VyY2U6IFsncmVkJywnYmx1ZScsJ2dyZWVuJywneWVsbG93JywndmlvbGV0JywnYnJvd24nLCdwdXJwbGUnLCdibGFjaycsJ3doaXRlJ10sXG4gICAgICAvLyAgIGRlbGF5OiAxMDBcbiAgICAgIC8vIH0sXG4gICAgICBzaG93QXV0b2NvbXBsZXRlT25Gb2N1czogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBBcHAuY29udGVudFByZXZpZXdDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50TnVtO1xuICAgIHZhciBtYXhOdW0gICAgICAgICAgPSA2MDA7XG4gICAgdmFyICRjb250ZW50UHJldmlldyA9ICQoJy5jb250ZW50LXByZXZpZXctaW5wdXQnKTtcbiAgICB2YXIgJGN1cnJlbnRDb3VudCAgID0gJCgnLmN1cnJlbnQtY291bnQnKTtcbiAgICB2YXIgJG1heE51bSAgICAgICAgID0gJCgnLmN1cnJlbnQtY291bnRfX21heCcpO1xuICAgIHZhciAkY3VycmVudE51bSAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fY3VycmVudCcpO1xuXG4gICAgJGNvbnRlbnRQcmV2aWV3Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgY3VycmVudE51bSA9ICRjb250ZW50UHJldmlldy52YWwoKS5sZW5ndGg7XG4gICAgICAkY3VycmVudE51bS50ZXh0KGN1cnJlbnROdW0pO1xuICAgIH0pXG4gIH1cblxuICAvLyBwbHVnaW4gdXNlZCBpbiBibG9ncy9zaG93X2Jsb2cgc2lkZWJhclxuICBBcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5uYXZiYXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhciA9ICQoJ2hlYWRlcicpO1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHZhciAkbG9nbyA9ICQoJyNoZWFkZXItbG9nby1saW5rJyk7XG4gICAgdmFyICRtZW51ID0gJCgnI2hlYWRlci1tZW51LWxpbmsnKTtcblxuICAgICR3aW5kb3cub24oJ3Njcm9sbCBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykuc2Nyb2xsVG9wKCkpXG4gICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwKSB7XG4gICAgICAgICRuYXZiYXIuYWRkQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICAgJG1lbnUuY3NzKHsgY29sb3I6ICcjZGRkJyB9KVxuICAgICAgICAkbG9nby5jc3MoeyBvcGFjaXR5OiAnMC44JyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRuYXZiYXIucmVtb3ZlQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICAgJG1lbnUuY3NzKHsgY29sb3I6ICcjOTk5JyB9KVxuICAgICAgICAkbG9nby5jc3MoeyBvcGFjaXR5OiAnMCcgfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5wdXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkbmF2YmFyQnRuICA9ICQoJ2EjaGVhZGVyLW1lbnUtbGluaycpO1xuICAgIHZhciAkbWFpbkNvbnQgICA9ICQoJy5tYWluLWNvbnQnKTtcbiAgICB2YXIgJHNpdGVIZWFkZXIgPSAkKCdoZWFkZXIuc2l0ZS1oZWFkZXInKTtcbiAgICB2YXIgJG5hdk1lbnUgICAgPSAkKCcjbmF2LW1lbnUnKTtcblxuICAgIC8vIG1lbnUgbGluayBjbGlja2VkXG4gICAgJG5hdmJhckJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAvLyBpZiBtYWluLWNvbnQgaGFzIGNsYXNzIC5wdXNoLXJpZ2h0IHRoZW4gcmVtb3ZlIGl0XG4gICAgICBpZiAoJG1haW5Db250Lmhhc0NsYXNzKCdwdXNoLXJpZ2h0JykpIHtcbiAgICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjOTk5JyB9KTtcbiAgICAgICAgJG5hdk1lbnVcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMHB4JyB9LCAyMDApXG4gICAgICAgICRtYWluQ29udFxuICAgICAgICAgIC5yZW1vdmVDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnMHB4JyB9LCAyMDApXG4gICAgICB9XG4gICAgICAvLyBhZGQgaXQgaWYgdGhlcmUgaXNudCAucHVzaC1yaWdodFxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmICghJHNpdGVIZWFkZXIuaGFzQ2xhc3MoJ3dpdGgtYmcnKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyBiZycpXG4gICAgICAgICAgJHRoaXMuY3NzKHsgY29sb3I6ICcjNGRhZmNmJyB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICR0aGlzLmNzcyh7ICdjb2xvcic6ICcjZmZmJyB9KVxuICAgICAgICB9XG5cbiAgICAgICAgJG5hdk1lbnVcbiAgICAgICAgICAuc2hvdygpXG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzMwMHB4JyB9LCAyMDApXG4gICAgICAgICRtYWluQ29udFxuICAgICAgICAgIC5hZGRDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnLTMwMHB4JyB9LCAyMDApXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgICB2YXIgJGZOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmZpcnN0LW5hbWUnKTtcbiAgICB2YXIgJGxOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmxhc3QtbmFtZScpO1xuICAgIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgICB2YXIgJG1lc3NhZ2UgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLm1lc3NhZ2UnKTtcbiAgICB2YXIgJHNsdWcgICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmhpZGRlbi1zbHVnJyk7XG4gICAgdmFyICRyZWdTdWNjZXNzICAgPSAkKCcucmVnaXN0ZXItc3VjY2VzcycpO1xuICAgIHZhciAkcmVnRXJyb3IgICAgID0gJCgnLnJlZ2lzdGVyLWVycm9yJyk7XG5cbiAgICBmdW5jdGlvbiByZXNldEZvcm0od2FzU3VjY2Vzcykge1xuICAgICAgaWYgKHdhc1N1Y2Nlc3MpIHtcbiAgICAgICAgJHJlZ1N1Y2Nlc3Muc2hvdygpO1xuICAgICAgfVxuICAgICAgJGZOYW1lLnZhbCgnJyk7XG4gICAgICAkbE5hbWUudmFsKCcnKTtcbiAgICAgICRlbWFpbC52YWwoJycpO1xuICAgICAgJG1lc3NhZ2UudmFsKCcnKTtcbiAgICAgICRzbHVnLnZhbCgnJyk7XG4gICAgfVxuXG4gICAgJHJlZ2lzdGVyRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgZl9uYW1lOiAgICAkZk5hbWUudmFsKCksXG4gICAgICAgIGxfbmFtZTogICAgJGxOYW1lLnZhbCgpLFxuICAgICAgICBmdWxsX25hbWU6ICQudHJpbSgkZk5hbWUudmFsKCkpICsgJyAnICsgJC50cmltKCRsTmFtZS52YWwoKSksXG4gICAgICAgIGVtYWlsOiAgICAgJGVtYWlsLnZhbCgpLFxuICAgICAgICBtZXNzYWdlOiAgICRtZXNzYWdlLnZhbCgpLFxuICAgICAgICBzbHVnOiAgICAgICRzbHVnLnZhbCgpXG4gICAgICB9XG5cbiAgICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8vIGNhbGwgZnVuYyBiYXNlZCBvbiB3ZWF0aGVyIG9yIG5vdCByZXMuc2VuZCh0cnVlKVxuICAgICAgICByZXN1bHQgPyByZXNldEZvcm0odHJ1ZSkgOiByZXNldEZvcm0oZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRjcmVhdGVkQXQgPSAkKCcuYXR0ZW5kZWVfX2NyZWF0ZWQtYXQnKTtcbiAgICB2YXIgJGF0dGVuZGVlTWVzc2FnZSA9ICQoJy5hdHRlbmRlZV9fbWVzc2FnZScpO1xuICAgIHZhciAkdmlld0F0dGVuZGVlc0J0biA9ICQoJy5idG4tYXR0ZW5kZWVzJyk7XG4gICAgdmFyICRhdHRlbmRlZVJvdyA9ICQoJy5hdHRlbmRlZS1yb3cnKTtcbiAgICB2YXIgYXR0Um93U2hvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggYXR0ZW5kZWVcbiAgICAvLyB0YWtlIGVhY2ggZGF0YS1jcmVhdGVkYXQsIGNhbGwgdG9EYXRlU3RyaW5nXG4gICAgLy8gdGhlbiBhcHBlbmQgYmFjayBvbnRvIF9fY3JlYXRlZC1hdFxuICAgICRjcmVhdGVkQXQuZWFjaChmdW5jdGlvbihjYUVsZW0pIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgZGF0ZURhdGEgPSAkdGhpcy5kYXRhKCdjcmVhdGVkYXQnKTtcbiAgICAgIHZhciBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZURhdGEpO1xuICAgICAgJHRoaXMuYXBwZW5kKGRhdGVTdHJpbmcudG9EYXRlU3RyaW5nKCkpO1xuICAgIH0pO1xuXG4gICAgLy8gY2xpY2sgZXZlbnQgZm9yIHZpZXcgYXR0ZW5kZWVzXG4gICAgJHZpZXdBdHRlbmRlZXNCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoIWF0dFJvd1Nob3dpbmcpIHtcbiAgICAgICAgLy8gc2hvdyBhdHRSb3dcbiAgICAgICAgYXR0Um93U2hvd2luZyA9IHRydWU7XG4gICAgICAgICRhdHRlbmRlZVJvdy5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBoaWRlIGF0dFJvd1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAucHJvZ3JhbVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcFNsaWRlciAgPSAkKCcjcHJvZ3JhbXMtc2xpZGVyJyk7XG4gICAgdmFyICRwcm9nQWxsICA9ICRwU2xpZGVyLmZpbmQoJ2EucHJvZ3JhbScpO1xuICAgIHZhciAkcHJvZzEgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTEnKTtcbiAgICB2YXIgJHByb2cyICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0yJyk7XG4gICAgdmFyICRwcm9nMyAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMycpO1xuICAgIHZhciAkcHJvZzQgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTQnKTtcbiAgICB2YXIgJHByb2c1ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW01Jyk7XG4gICAgdmFyICRzYXRJbWcgICA9ICRwU2xpZGVyLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJyk7XG4gICAgdmFyICRkZXNhdEltZyA9ICRwU2xpZGVyLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKTtcblxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAvLyBzYW1lIGFjY3Jvc3MgYWxsIHByb2dyYW1zXG4gICAgICAvLyBoaWRlIGRlc2F0IGltZywgc2hvdyBzYXQgaW1nXG4gICAgICAkdGhpc1xuICAgICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuXG4gICAgICAvLyBpZiBzY2VuYXJpbyBwcm9ncmFtWFxuICAgICAgLy8gbWFrZSBjb250ZW50IHdpZHRoIDEwMCVcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTEnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAvLyBwdXNoIGFsbCBvdmVyIDQlXG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjQlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0NCUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzY0JScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODQlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0yJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzE4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gbGVmdCAtMiUgcHVzaCBhbGwgdG8gdGhlIHJpZ2h0IDIlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0zJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzM4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTQnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnNTglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczOCUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW01JykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzc2JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gcHVzaCBhbGwgdG8gdGhlIGxlZnQgLTQlXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTQlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxNiUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM2JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNTYlJyB9KTtcblxuICAgICAgfVxuICAgIH0pXG5cbiAgICAkcHJvZ0FsbC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gaGlkZSBhbGwgc2F0LWltZywgc2hvdyBhbGwgZGVzYXQtaW1nXG4gICAgICAkcHJvZ0FsbFxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnODAlJyB9KVxuXG4gICAgICAvLyByZXR1cm4gYWxsIHByb2dhbXMgdG8gdGhlaXJcbiAgICAgIC8vIG5vcm1hbCBzdGF0ZVxuICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICcwJScgfSk7XG4gICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzIwJScgfSk7XG4gICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQwJScgfSk7XG4gICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYwJScgfSk7XG4gICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgwJScgfSk7XG4gICAgfSlcbiAgfVxuXG4gIEFwcC5pbWFnZUdhbGxlcnkgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBvbmNlIGFsbCB0aGUgaW1hZ2VzIGFyZSBhbGwgbG9hZGVkIGluaXQgbWFzb25yeSB3aXRoIG9wdGlvbnNcbiAgICB2YXIgJGdyaWQgPSAkKCcjZ2FsbGVyaWVzIC5ncmlkJykuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgJGdyaWQubWFzb25yeSh7XG4gICAgICAgIGl0ZW1TZWxlY3RvcjogICAgJy5ncmlkLWl0ZW0nLFxuICAgICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICAgIGNvbHVtbldpZHRoOiAgICAgJy5ncmlkLXNpemVyJyxcbiAgICAgICAgZ3V0dGVyOiAgICAgICAgICA1XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJy5mYW5jeWJveCcpLmZhbmN5Ym94KHtcbiAgICAgIGZpdFRvVmlldzogdHJ1ZSxcbiAgICAgIGNsb3NlQnRuOiAgdHJ1ZSxcbiAgICAgIHBhZGRpbmc6ICAgJzYwcHggMHB4IDMwcHggMHB4JyxcbiAgICAgIC8vIHdpZHRoOiAgJzYwJScsXG4gICAgICAvLyBoZWlnaHQ6ICc2MCUnLFxuICAgICAgbWF4V2lkdGg6ICAxMjAwLFxuICAgICAgbWF4SGVpZ2h0OiA1NjBcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGFjY2VwdHMgYXJyYXkgb2YgaW1nIGxpbmtzIGFuZCBjcmVhdGVzXG4gIC8vIHNsaWRlciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgYmV0d2VlbiB0aGVtXG4gIEFwcC5pbWFnZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2xpZGVyID0gJCgndWwjc2xpZGVyJyk7XG5cbiAgICB2YXIgaW1nTGlua3MgPSBbXG4gICAgICAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9VSXJFTV85cXZaVS9tYXhyZXNkZWZhdWx0LmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5rbm93eW91cnByZXNpZGVudHMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzExL2dlb3JnZS13YXNoaW5ndG9uMS5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cudW5vb3NhLm9yZy9yZXMvdGltZWxpbmUvaW5kZXhfaHRtbC9zcGFjZS0yLmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5kb2dicmVlZHBsdXMuY29tL2ltYWdlcy9wdXJlZG9nc3MucG5nJ1xuICAgIF07XG5cbiAgICAvLyBidWlsZCBFc2xpZGVyIERPTSwgcGFzcyBhbmltYXRlU2xpZGVyIGFzXG4gICAgLy8gY2FsbGJhY2sgdG8gZG8gd2hlbiBhbmltYXRlU2xpZGVyIGlzIGRvbmVcbiAgICBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgYW5pbWF0ZVNsaWRlcik7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKGVycikge1xuICAgICAgdmFyICRzbGlkZUl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScpO1xuICAgICAgdmFyIHNsaWRlckxlbiA9ICRzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgICAgaXRlbTtcblxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGlmIGF0IGVuZCBvZiBhcnJheSwgcmV0dXJuIGNvdW50IHRvIDBcbiAgICAgICAgKGNvdW50ID09PSBzbGlkZXJMZW4gLSAxKSA/IGNvdW50ID0gMCA6IGNvdW50Kys7XG4gICAgICAgIC8vIHJlbW92ZSAuc2hvdyBmcm9tIGFsbCBzbGlkZV9faXRlbSdzXG4gICAgICAgICRzbGlkZUl0ZW1zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgIC8vIGZpbmQgZWxlbWVudCBiYXNlZCBvbiBpdHMgZGF0YS10ZXN0aW5nXG4gICAgICAgIC8vIGF0dHIgdGhlbiBhZGQgLnNob3csIHJlcGVhdCBzSVxuICAgICAgICBpdGVtID0gJChcImxpLnNsaWRlcl9faXRlbVtkYXRhLXRlc3Rpbmc9J1wiK2NvdW50K1wiJ11cIik7XG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3Nob3cnKTtcblxuICAgICAgfSwgMzAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2xpZGVyQXJyID0gW11cblxuICAgICAgLy8gcmV0dXJuIGVycm9yIGlmIG5vIGltZ0xpbmtzIG9yIGltZ0xpbmtzICE9PSBBcnJheVxuICAgICAgaWYgKCFpbWdMaW5rcyB8fCAhKGltZ0xpbmtzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIHZhciBlcnIgPSAndGhlcmUgd2FzIGFuIGVycm9yISc7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBsaXN0IGFuZCBjcmVhdGUgPGltZz5cbiAgICAgIC8vIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgdy9oICYgY2xhc3NcbiAgICAgIGZvciAodmFyIGk9MDsgaTxpbWdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGluayA9IGltZ0xpbmtzW2ldO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXdJbWFnZShsaW5rLCBmYWxzZSk7XG4gICAgICAgIHZhciB0aHVtYm5haWwgPSBuZXdJbWFnZShsaW5rLCB0cnVlKTtcblxuICAgICAgICAvLyB7IGltYWdlOiAkKC4uLiksIHRodW1ibmFpbDogJCguLi4pIH1cbiAgICAgICAgc2xpZGVyQXJyLnB1c2goe1xuICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gb25jZSBzbGlkZXJBcnIgZG9uZSwgY3JlYXRlIGEgbGkuc2xpZGVfX2l0ZW0sXG4gICAgICAvLyBhcHBlbmQgdGhlIGltYWdlIGludG8gdGhlIGxpLCB0aGVuIGFwcGVuZCBsaSBvbnRvICNzbGlkZXJcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzbGlkZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGltZyAgPSBzbGlkZXJBcnJbaV0uaW1hZ2U7XG4gICAgICAgIHZhciBpdGVtID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICAgJ2NsYXNzJzogJ3NsaWRlcl9faXRlbScsXG4gICAgICAgICAgJ2RhdGEtdGVzdGluZyc6IGlcbiAgICAgICAgfSlcblxuICAgICAgICBpdGVtLmFwcGVuZChpbWcpO1xuICAgICAgICAkc2xpZGVyLmFwcGVuZChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsIHdlbnQgd2VsbFxuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBuZXcgaW1nIGVsZW1lbnQgd2l0aCBzcmM9aW1nTGlua1xuICAgIGZ1bmN0aW9uIG5ld0ltYWdlKGltZ0xpbmssIGlzVGh1bWJuYWlsKSB7XG4gICAgICAvLyB2YXIgd2lkdGggID0gaXNUaHVtYm5haWwgPyAnNDBweCcgOiAnMTAwJSc7XG4gICAgICAvLyB2YXIgaGVpZ2h0ID0gaXNUaHVtYm5haWwgPyAnNDBweCcgOiAnMTAwJSc7XG4gICAgICAvLyB2YXIga2xhc3MgID0gaXNUaHVtYm5haWwgPyAncy1pbWctdGh1bWInIDogJ3MtaW1nJztcblxuICAgICAgcmV0dXJuICQoJzxpbWcvPicsIHtcbiAgICAgICAgJ3NyYyc6IGltZ0xpbmssXG4gICAgICAgICdjbGFzcyc6ICdzLWltZydcbiAgICAgICAgLy8gJ2RhdGEtdGVzdCc6IG51bVxuICAgICAgICAvLyB3aWR0aDogd2lkdCwgaWgsXG4gICAgICAgIC8vIGhlaWdodDogaGVpZ2h0LCBpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBBcHAudHdpdHRlclNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkaW5kaWNhdG9yc1VsID0gJCgnLmNhcm91c2VsLWluZGljYXRvcnMnKTtcbiAgICB2YXIgJGlubmVyQ2Fyb3VzZWwgPSAkKCcuY2Fyb3VzZWwtaW5uZXInKTtcblxuICAgIHZhciB0d2VldHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMSBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMiBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMyBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH1cbiAgICBdXG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dHdlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGRhdGEgPSB0d2VldHNbaV07XG4gICAgICB2YXIgJGluZGljYXRvciA9IGNyZWF0ZUluZGljYXRvcihpKTtcbiAgICAgIHZhciAkaXRlbSA9IGNyZWF0ZUl0ZW0odGRhdGEudGl0bGUsIHRkYXRhLnVybCwgaSlcblxuICAgICAgJGluZGljYXRvcnNVbC5hcHBlbmQoJGluZGljYXRvcik7XG4gICAgICAkaW5uZXJDYXJvdXNlbC5hcHBlbmQoJGl0ZW0pO1xuICAgIH1cblxuICAgICQoJy5jYXJvdXNlbCcpLmNhcm91c2VsKHtcbiAgICAgIGludGVydmFsOiAzMDAwXG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvcihjb3VudCkge1xuICAgICAgdmFyIGluZGkgPSAkKCc8bGkvPicsIHtcbiAgICAgICAgJ2RhdGEtdGFyZ2V0JzogJyN0d2l0dGVyLXNsaWRlcicsXG4gICAgICAgICdkYXRhLXNsaWRlLXRvJzogY291bnRcbiAgICAgIH0pXG5cbiAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICBpbmRpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluZGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbSh0d2VldFRleHQsIHR3ZWV0VXJsLCBjb3VudCkge1xuICAgICAgdmFyIGl0ZW0gPSAkKCc8ZGl2Lz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdpdGVtJ1xuICAgICAgfSk7XG4gICAgICB2YXIgcGFyYSA9ICQoJzxwLz4nKS50ZXh0KHR3ZWV0VGV4dCk7XG4gICAgICB2YXIgYW5jaCA9ICQoJzxhLz4nLCB7XG4gICAgICAgICdocmVmJzogdHdlZXRVcmxcbiAgICAgIH0pLnRleHQodHdlZXRVcmwpO1xuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtLmFwcGVuZChwYXJhKS5hcHBlbmQoYW5jaCk7XG4gICAgfVxuICB9XG5cbiAgcm9vdC5BcHAgPSBBcHA7XG5cbiAgQXBwLnR5cGVyKCcubmwtdHlwZXInKTtcbiAgQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG4gIEFwcC50b2tlbkZpZWxkKCcjZWRpdC1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQoKTtcbiAgQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbiAgQXBwLm5hdmJhcigpO1xuICBBcHAucHVzaE1lbnUoKTtcbiAgQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQoKTtcbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMoKTtcbiAgQXBwLnByb2dyYW1TbGlkZXIoKTtcbiAgQXBwLmltYWdlR2FsbGVyeSgpO1xuICBBcHAuaW1hZ2VTbGlkZXIoKTsgLy8gZm9yIGphbWVzIGluZGV4XG4gIEFwcC50d2l0dGVyU2xpZGVyKCk7XG5cbn0pKGpRdWVyeSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
