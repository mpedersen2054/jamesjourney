

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
      closeBtn: true,
      padding: '60px 0px 30px 0px',
      // width: '60%',
      // height: '60%',
      maxWidth: 1200,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuICBBcHAgPSByb290LkFwcCB8fCB7fTtcblxuICBBcHAudHlwZXIgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50eXBlZCh7XG4gICAgICBzdHJpbmdzOiBbXG4gICAgICAgICdzdXBwb3J0IG91ciBjYXVzZS4nLFxuICAgICAgICAncmVjaWV2ZSByZWd1bGFyIHVwZGF0ZXMgb24gZXZlbnRzLicsXG4gICAgICAgICdoZWxwIG1ha2UgdGhlIHdvcmxkIGEgYmV0dGVyIHBsYWNlLidcbiAgICAgIF0sXG4gICAgICB0eXBlU3BlZWQ6IDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgYmFja0RlbGF5OiAzMDAwLFxuICAgICAgYmFja1NwZWVkOiAtNSxcbiAgICAgIHNob3dDdXJzb3I6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBBcHAudG9rZW5GaWVsZCA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnRva2VuZmllbGQoe1xuICAgICAgLy8gYXV0b2NvbXBsZXRlOiB7XG4gICAgICAvLyAgIHNvdXJjZTogWydyZWQnLCdibHVlJywnZ3JlZW4nLCd5ZWxsb3cnLCd2aW9sZXQnLCdicm93bicsJ3B1cnBsZScsJ2JsYWNrJywnd2hpdGUnXSxcbiAgICAgIC8vICAgZGVsYXk6IDEwMFxuICAgICAgLy8gfSxcbiAgICAgIHNob3dBdXRvY29tcGxldGVPbkZvY3VzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIEFwcC5jb250ZW50UHJldmlld0NvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnROdW07XG4gICAgdmFyIG1heE51bSAgICAgICAgICA9IDYwMDtcbiAgICB2YXIgJGNvbnRlbnRQcmV2aWV3ID0gJCgnLmNvbnRlbnQtcHJldmlldy1pbnB1dCcpO1xuICAgIHZhciAkY3VycmVudENvdW50ICAgPSAkKCcuY3VycmVudC1jb3VudCcpO1xuICAgIHZhciAkbWF4TnVtICAgICAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fbWF4Jyk7XG4gICAgdmFyICRjdXJyZW50TnVtICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19jdXJyZW50Jyk7XG5cbiAgICAkY29udGVudFByZXZpZXcub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICBjdXJyZW50TnVtID0gJGNvbnRlbnRQcmV2aWV3LnZhbCgpLmxlbmd0aDtcbiAgICAgICRjdXJyZW50TnVtLnRleHQoY3VycmVudE51bSk7XG4gICAgfSlcbiAgfVxuXG4gIC8vIHBsdWdpbiB1c2VkIGluIGJsb2dzL3Nob3dfYmxvZyBzaWRlYmFyXG4gIEFwcC5zY3JvbGxGb2xsb3cgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS5zaW1wbGVTY3JvbGxGb2xsb3coe1xuICAgICAgbGltaXRfZWxlbTogJy5vbi1sZWZ0J1xuICAgIH0pO1xuICB9XG5cbiAgQXBwLm5hdmJhciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkbmF2YmFyID0gJCgnaGVhZGVyJyk7XG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdmFyICRsb2dvID0gJCgnI2hlYWRlci1sb2dvLWxpbmsnKTtcbiAgICB2YXIgJG1lbnUgPSAkKCcjaGVhZGVyLW1lbnUtbGluaycpO1xuXG4gICAgJHdpbmRvdy5vbignc2Nyb2xsIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKS5zY3JvbGxUb3AoKSlcbiAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjApIHtcbiAgICAgICAgJG5hdmJhci5hZGRDbGFzcygnd2l0aC1iZycpO1xuICAgICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyNkZGQnIH0pXG4gICAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwLjgnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgICAkbWVudS5jc3MoeyBjb2xvcjogJyM5OTknIH0pXG4gICAgICAgICRsb2dvLmNzcyh7IG9wYWNpdHk6ICcwJyB9KVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnB1c2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXJCdG4gID0gJCgnYSNoZWFkZXItbWVudS1saW5rJyk7XG4gICAgdmFyICRtYWluQ29udCAgID0gJCgnLm1haW4tY29udCcpO1xuICAgIHZhciAkc2l0ZUhlYWRlciA9ICQoJ2hlYWRlci5zaXRlLWhlYWRlcicpO1xuICAgIHZhciAkbmF2TWVudSAgICA9ICQoJyNuYXYtbWVudScpO1xuXG4gICAgLy8gbWVudSBsaW5rIGNsaWNrZWRcbiAgICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgIC8vIGlmIG1haW4tY29udCBoYXMgY2xhc3MgLnB1c2gtcmlnaHQgdGhlbiByZW1vdmUgaXRcbiAgICAgIGlmICgkbWFpbkNvbnQuaGFzQ2xhc3MoJ3B1c2gtcmlnaHQnKSkge1xuICAgICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM5OTknIH0pO1xuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICcwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLnJlbW92ZUNsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICcwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBpdCBpZiB0aGVyZSBpc250IC5wdXNoLXJpZ2h0XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKCEkc2l0ZUhlYWRlci5oYXNDbGFzcygnd2l0aC1iZycpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ25vIGJnJylcbiAgICAgICAgICAkdGhpcy5jc3MoeyBjb2xvcjogJyM0ZGFmY2YnIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJHRoaXMuY3NzKHsgJ2NvbG9yJzogJyNmZmYnIH0pXG4gICAgICAgIH1cblxuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMzAwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLmFkZENsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5zdWJtaXRSZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyZWdpc3RlckZvcm0gPSAkKCcjZXZlbnQtcmVnaXN0ZXItZm9ybScpO1xuICAgIHZhciAkZk5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZmlyc3QtbmFtZScpO1xuICAgIHZhciAkbE5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubGFzdC1uYW1lJyk7XG4gICAgdmFyICRlbWFpbCAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5lbWFpbCcpO1xuICAgIHZhciAkbWVzc2FnZSAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubWVzc2FnZScpO1xuICAgIHZhciAkc2x1ZyAgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuaGlkZGVuLXNsdWcnKTtcbiAgICB2YXIgJHJlZ1N1Y2Nlc3MgICA9ICQoJy5yZWdpc3Rlci1zdWNjZXNzJyk7XG4gICAgdmFyICRyZWdFcnJvciAgICAgPSAkKCcucmVnaXN0ZXItZXJyb3InKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSh3YXNTdWNjZXNzKSB7XG4gICAgICBpZiAod2FzU3VjY2Vzcykge1xuICAgICAgICAkcmVnU3VjY2Vzcy5zaG93KCk7XG4gICAgICB9XG4gICAgICAkZk5hbWUudmFsKCcnKTtcbiAgICAgICRsTmFtZS52YWwoJycpO1xuICAgICAgJGVtYWlsLnZhbCgnJyk7XG4gICAgICAkbWVzc2FnZS52YWwoJycpO1xuICAgICAgJHNsdWcudmFsKCcnKTtcbiAgICB9XG5cbiAgICAkcmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBmX25hbWU6ICAgICRmTmFtZS52YWwoKSxcbiAgICAgICAgbF9uYW1lOiAgICAkbE5hbWUudmFsKCksXG4gICAgICAgIGZ1bGxfbmFtZTogJC50cmltKCRmTmFtZS52YWwoKSkgKyAnICcgKyAkLnRyaW0oJGxOYW1lLnZhbCgpKSxcbiAgICAgICAgZW1haWw6ICAgICAkZW1haWwudmFsKCksXG4gICAgICAgIG1lc3NhZ2U6ICAgJG1lc3NhZ2UudmFsKCksXG4gICAgICAgIHNsdWc6ICAgICAgJHNsdWcudmFsKClcbiAgICAgIH1cblxuICAgICAgJC5wb3N0KCcvZXZlbnRzLycrZGF0YS5zbHVnKycvcmVnaXN0ZXInLCBkYXRhLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jIGJhc2VkIG9uIHdlYXRoZXIgb3Igbm90IHJlcy5zZW5kKHRydWUpXG4gICAgICAgIHJlc3VsdCA/IHJlc2V0Rm9ybSh0cnVlKSA6IHJlc2V0Rm9ybShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNyZWF0ZWRBdCA9ICQoJy5hdHRlbmRlZV9fY3JlYXRlZC1hdCcpO1xuICAgIHZhciAkYXR0ZW5kZWVNZXNzYWdlID0gJCgnLmF0dGVuZGVlX19tZXNzYWdlJyk7XG4gICAgdmFyICR2aWV3QXR0ZW5kZWVzQnRuID0gJCgnLmJ0bi1hdHRlbmRlZXMnKTtcbiAgICB2YXIgJGF0dGVuZGVlUm93ID0gJCgnLmF0dGVuZGVlLXJvdycpO1xuICAgIHZhciBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBhdHRlbmRlZVxuICAgIC8vIHRha2UgZWFjaCBkYXRhLWNyZWF0ZWRhdCwgY2FsbCB0b0RhdGVTdHJpbmdcbiAgICAvLyB0aGVuIGFwcGVuZCBiYWNrIG9udG8gX19jcmVhdGVkLWF0XG4gICAgJGNyZWF0ZWRBdC5lYWNoKGZ1bmN0aW9uKGNhRWxlbSkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBkYXRlRGF0YSA9ICR0aGlzLmRhdGEoJ2NyZWF0ZWRhdCcpO1xuICAgICAgdmFyIGRhdGVTdHJpbmcgPSBuZXcgRGF0ZShkYXRlRGF0YSk7XG4gICAgICAkdGhpcy5hcHBlbmQoZGF0ZVN0cmluZy50b0RhdGVTdHJpbmcoKSk7XG4gICAgfSk7XG5cbiAgICAvLyBjbGljayBldmVudCBmb3IgdmlldyBhdHRlbmRlZXNcbiAgICAkdmlld0F0dGVuZGVlc0J0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICghYXR0Um93U2hvd2luZykge1xuICAgICAgICAvLyBzaG93IGF0dFJvd1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgJGF0dGVuZGVlUm93LnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGhpZGUgYXR0Um93XG4gICAgICAgIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgJGF0dGVuZGVlUm93LmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5wcm9ncmFtU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRwU2xpZGVyICA9ICQoJyNwcm9ncmFtcy1zbGlkZXInKTtcbiAgICB2YXIgJHByb2dBbGwgID0gJHBTbGlkZXIuZmluZCgnYS5wcm9ncmFtJyk7XG4gICAgdmFyICRwcm9nMSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMScpO1xuICAgIHZhciAkcHJvZzIgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTInKTtcbiAgICB2YXIgJHByb2czICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0zJyk7XG4gICAgdmFyICRwcm9nNCAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNCcpO1xuICAgIHZhciAkcHJvZzUgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTUnKTtcbiAgICB2YXIgJHNhdEltZyAgID0gJHBTbGlkZXIuZmluZCgnLnNhdHVyYXRlZC1pbWcnKTtcbiAgICB2YXIgJGRlc2F0SW1nID0gJHBTbGlkZXIuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpO1xuXG5cbiAgICAkcHJvZ0FsbC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgIC8vIHNhbWUgYWNjcm9zcyBhbGwgcHJvZ3JhbXNcbiAgICAgIC8vIGhpZGUgZGVzYXQgaW1nLCBzaG93IHNhdCBpbWdcbiAgICAgICR0aGlzXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pXG5cbiAgICAgIC8vIGlmIHNjZW5hcmlvIHByb2dyYW1YXG4gICAgICAvLyBtYWtlIGNvbnRlbnQgd2lkdGggMTAwJVxuICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMScpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgIC8vIHB1c2ggYWxsIG92ZXIgNCVcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyNCUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQ0JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjQlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4NCUnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTInKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnMTglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAvLyBsZWZ0IC0yJSBwdXNoIGFsbCB0byB0aGUgcmlnaHQgMiVcbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQyJScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTMnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnMzglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTglJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtNCcpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICc1OCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM4JScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcblxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTUnKSkge1xuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnNzYlJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAvLyBwdXNoIGFsbCB0byB0aGUgbGVmdCAtNCVcbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctNCUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE2JScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnMzYlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc1NiUnIH0pO1xuXG4gICAgICB9XG4gICAgfSlcblxuICAgICRwcm9nQWxsLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBoaWRlIGFsbCBzYXQtaW1nLCBzaG93IGFsbCBkZXNhdC1pbWdcbiAgICAgICRwcm9nQWxsXG4gICAgICAgIC5maW5kKCcuc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAuY3NzKHsgd2lkdGg6ICc4MCUnIH0pXG5cbiAgICAgIC8vIHJldHVybiBhbGwgcHJvZ2FtcyB0byB0aGVpclxuICAgICAgLy8gbm9ybWFsIHN0YXRlXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJzAlJyB9KTtcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjAlJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDAlJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjAlJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODAlJyB9KTtcbiAgICB9KVxuICB9XG5cbiAgQXBwLmltYWdlR2FsbGVyeSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIG9uY2UgYWxsIHRoZSBpbWFnZXMgYXJlIGFsbCBsb2FkZWQgaW5pdCBtYXNvbnJ5IHdpdGggb3B0aW9uc1xuICAgIHZhciAkZ3JpZCA9ICQoJyNnYWxsZXJpZXMgLmdyaWQnKS5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAkZ3JpZC5tYXNvbnJ5KHtcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAgICAnLmdyaWQtaXRlbScsXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgY29sdW1uV2lkdGg6ICAgICAnLmdyaWQtc2l6ZXInLFxuICAgICAgICBndXR0ZXI6ICAgICAgICAgIDVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJCgnLmZhbmN5Ym94JykuZmFuY3lib3goe1xuICAgICAgZml0VG9WaWV3OiB0cnVlLFxuICAgICAgY2xvc2VCdG46IHRydWUsXG4gICAgICBwYWRkaW5nOiAnNjBweCAwcHggMzBweCAwcHgnLFxuICAgICAgLy8gd2lkdGg6ICc2MCUnLFxuICAgICAgLy8gaGVpZ2h0OiAnNjAlJyxcbiAgICAgIG1heFdpZHRoOiAxMjAwLFxuICAgICAgbWF4SGVpZ2h0OiA1NjBcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGFjY2VwdHMgYXJyYXkgb2YgaW1nIGxpbmtzIGFuZCBjcmVhdGVzXG4gIC8vIHNsaWRlciBlbGVtZW50cyBhbmQgYW5pbWF0ZXMgYmV0d2VlbiB0aGVtXG4gIEFwcC5pbWFnZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkc2xpZGVyID0gJCgndWwjc2xpZGVyJyk7XG5cbiAgICB2YXIgaW1nTGlua3MgPSBbXG4gICAgICAnaHR0cHM6Ly9pLnl0aW1nLmNvbS92aS9VSXJFTV85cXZaVS9tYXhyZXNkZWZhdWx0LmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5rbm93eW91cnByZXNpZGVudHMuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE1LzExL2dlb3JnZS13YXNoaW5ndG9uMS5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cudW5vb3NhLm9yZy9yZXMvdGltZWxpbmUvaW5kZXhfaHRtbC9zcGFjZS0yLmpwZycsXG4gICAgICAnaHR0cDovL3d3dy5kb2dicmVlZHBsdXMuY29tL2ltYWdlcy9wdXJlZG9nc3MucG5nJ1xuICAgIF07XG5cbiAgICAvLyBidWlsZCBFc2xpZGVyIERPTSwgcGFzcyBhbmltYXRlU2xpZGVyIGFzXG4gICAgLy8gY2FsbGJhY2sgdG8gZG8gd2hlbiBhbmltYXRlU2xpZGVyIGlzIGRvbmVcbiAgICBidWlsZFNsaWRlckRvbShpbWdMaW5rcywgYW5pbWF0ZVNsaWRlcik7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKGVycikge1xuICAgICAgdmFyICRzbGlkZUl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScpO1xuICAgICAgdmFyIHNsaWRlckxlbiA9ICRzbGlkZUl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgICAgaXRlbTtcblxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGlmIGF0IGVuZCBvZiBhcnJheSwgcmV0dXJuIGNvdW50IHRvIDBcbiAgICAgICAgKGNvdW50ID09PSBzbGlkZXJMZW4gLSAxKSA/IGNvdW50ID0gMCA6IGNvdW50Kys7XG4gICAgICAgIC8vIHJlbW92ZSAuc2hvdyBmcm9tIGFsbCBzbGlkZV9faXRlbSdzXG4gICAgICAgICRzbGlkZUl0ZW1zLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgIC8vIGZpbmQgZWxlbWVudCBiYXNlZCBvbiBpdHMgZGF0YS10ZXN0aW5nXG4gICAgICAgIC8vIGF0dHIgdGhlbiBhZGQgLnNob3csIHJlcGVhdCBzSVxuICAgICAgICBpdGVtID0gJChcImxpLnNsaWRlcl9faXRlbVtkYXRhLXRlc3Rpbmc9J1wiK2NvdW50K1wiJ11cIik7XG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3Nob3cnKTtcblxuICAgICAgfSwgMzAwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRTbGlkZXJEb20oaW1nTGlua3MsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2xpZGVyQXJyID0gW11cblxuICAgICAgLy8gcmV0dXJuIGVycm9yIGlmIG5vIGltZ0xpbmtzIG9yIGltZ0xpbmtzICE9PSBBcnJheVxuICAgICAgaWYgKCFpbWdMaW5rcyB8fCAhKGltZ0xpbmtzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIHZhciBlcnIgPSAndGhlcmUgd2FzIGFuIGVycm9yISc7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICB9XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBsaXN0IGFuZCBjcmVhdGUgPGltZz5cbiAgICAgIC8vIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgdy9oICYgY2xhc3NcbiAgICAgIGZvciAodmFyIGk9MDsgaTxpbWdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGluayA9IGltZ0xpbmtzW2ldO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXdJbWFnZShsaW5rLCBmYWxzZSk7XG4gICAgICAgIHZhciB0aHVtYm5haWwgPSBuZXdJbWFnZShsaW5rLCB0cnVlKTtcblxuICAgICAgICAvLyB7IGltYWdlOiAkKC4uLiksIHRodW1ibmFpbDogJCguLi4pIH1cbiAgICAgICAgc2xpZGVyQXJyLnB1c2goe1xuICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gb25jZSBzbGlkZXJBcnIgZG9uZSwgY3JlYXRlIGEgbGkuc2xpZGVfX2l0ZW0sXG4gICAgICAvLyBhcHBlbmQgdGhlIGltYWdlIGludG8gdGhlIGxpLCB0aGVuIGFwcGVuZCBsaSBvbnRvICNzbGlkZXJcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzbGlkZXJBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGltZyAgPSBzbGlkZXJBcnJbaV0uaW1hZ2U7XG4gICAgICAgIHZhciBpdGVtID0gJCgnPGxpLz4nLCB7XG4gICAgICAgICAgJ2NsYXNzJzogJ3NsaWRlcl9faXRlbScsXG4gICAgICAgICAgJ2RhdGEtdGVzdGluZyc6IGlcbiAgICAgICAgfSlcblxuICAgICAgICBpdGVtLmFwcGVuZChpbWcpO1xuICAgICAgICAkc2xpZGVyLmFwcGVuZChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsIHdlbnQgd2VsbFxuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJucyBuZXcgaW1nIGVsZW1lbnQgd2l0aCBzcmM9aW1nTGlua1xuICAgIGZ1bmN0aW9uIG5ld0ltYWdlKGltZ0xpbmssIGlzVGh1bWJuYWlsKSB7XG4gICAgICAvLyB2YXIgd2lkdGggID0gaXNUaHVtYm5haWwgPyAnNDBweCcgOiAnMTAwJSc7XG4gICAgICAvLyB2YXIgaGVpZ2h0ID0gaXNUaHVtYm5haWwgPyAnNDBweCcgOiAnMTAwJSc7XG4gICAgICAvLyB2YXIga2xhc3MgID0gaXNUaHVtYm5haWwgPyAncy1pbWctdGh1bWInIDogJ3MtaW1nJztcblxuICAgICAgcmV0dXJuICQoJzxpbWcvPicsIHtcbiAgICAgICAgJ3NyYyc6IGltZ0xpbmssXG4gICAgICAgICdjbGFzcyc6ICdzLWltZydcbiAgICAgICAgLy8gJ2RhdGEtdGVzdCc6IG51bVxuICAgICAgICAvLyB3aWR0aDogd2lkdCwgaWgsXG4gICAgICAgIC8vIGhlaWdodDogaGVpZ2h0LCBpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBBcHAudHdpdHRlclNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkaW5kaWNhdG9yc1VsID0gJCgnLmNhcm91c2VsLWluZGljYXRvcnMnKTtcbiAgICB2YXIgJGlubmVyQ2Fyb3VzZWwgPSAkKCcuY2Fyb3VzZWwtaW5uZXInKTtcblxuICAgIHZhciB0d2VldHMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMSBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMiBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnMyBDbGFyaXRhcyBlc3QgZXRpYW0gcHJvY2Vzc3VzIGR5bmFtaWN1cywgcXVpIHNlcXVpdHVyIG11dGF0aW9uZW0gY29uc3VldHVkaXVtIGxlY3RvcnVtLiBNaXJ1bSBlc3Qgbm90YXJlIHF1YW0gLi4uJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3QuY28vN0ZvVlNQMHZJZidcbiAgICAgIH1cbiAgICBdXG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dHdlZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGRhdGEgPSB0d2VldHNbaV07XG4gICAgICB2YXIgJGluZGljYXRvciA9IGNyZWF0ZUluZGljYXRvcihpKTtcbiAgICAgIHZhciAkaXRlbSA9IGNyZWF0ZUl0ZW0odGRhdGEudGl0bGUsIHRkYXRhLnVybCwgaSlcblxuICAgICAgJGluZGljYXRvcnNVbC5hcHBlbmQoJGluZGljYXRvcik7XG4gICAgICAkaW5uZXJDYXJvdXNlbC5hcHBlbmQoJGl0ZW0pO1xuICAgIH1cblxuICAgICQoJy5jYXJvdXNlbCcpLmNhcm91c2VsKHtcbiAgICAgIGludGVydmFsOiAzMDAwXG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvcihjb3VudCkge1xuICAgICAgdmFyIGluZGkgPSAkKCc8bGkvPicsIHtcbiAgICAgICAgJ2RhdGEtdGFyZ2V0JzogJyN0d2l0dGVyLXNsaWRlcicsXG4gICAgICAgICdkYXRhLXNsaWRlLXRvJzogY291bnRcbiAgICAgIH0pXG5cbiAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICBpbmRpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGluZGk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSXRlbSh0d2VldFRleHQsIHR3ZWV0VXJsLCBjb3VudCkge1xuICAgICAgdmFyIGl0ZW0gPSAkKCc8ZGl2Lz4nLCB7XG4gICAgICAgICdjbGFzcyc6ICdpdGVtJ1xuICAgICAgfSk7XG4gICAgICB2YXIgcGFyYSA9ICQoJzxwLz4nKS50ZXh0KHR3ZWV0VGV4dCk7XG4gICAgICB2YXIgYW5jaCA9ICQoJzxhLz4nLCB7XG4gICAgICAgICdocmVmJzogdHdlZXRVcmxcbiAgICAgIH0pLnRleHQodHdlZXRVcmwpO1xuXG4gICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgaXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtLmFwcGVuZChwYXJhKS5hcHBlbmQoYW5jaCk7XG4gICAgfVxuICB9XG5cbiAgcm9vdC5BcHAgPSBBcHA7XG5cbiAgQXBwLnR5cGVyKCcubmwtdHlwZXInKTtcbiAgQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG4gIEFwcC50b2tlbkZpZWxkKCcjZWRpdC1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQoKTtcbiAgQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbiAgQXBwLm5hdmJhcigpO1xuICBBcHAucHVzaE1lbnUoKTtcbiAgQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQoKTtcbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMoKTtcbiAgQXBwLnByb2dyYW1TbGlkZXIoKTtcbiAgQXBwLmltYWdlR2FsbGVyeSgpO1xuICBBcHAuaW1hZ2VTbGlkZXIoKTsgLy8gZm9yIGphbWVzIGluZGV4XG4gIEFwcC50d2l0dGVyU2xpZGVyKCk7XG5cbn0pKGpRdWVyeSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
