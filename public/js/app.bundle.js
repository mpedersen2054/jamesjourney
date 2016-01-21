

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

  App.imageSlider = function() {
    var self = this;
    var $slider = $('#slider');

    self.sliderArr = [];

    var imgLinks = [
      'http://i.imgur.com/6csh4ip.jpg',
      'http://www.knowyourpresidents.com/wp-content/uploads/2015/11/george-washington1.jpg'
    ];

    populateSliderArr(imgLinks, function(err, arr) {
      var $sliderUl = $('<ul/>', { class: 'slider__list' });

      $slider.append($sliderUl);

      for (var i=0; i<arr.length; i++) {
        var list = [];
        var img  = arr[i].image;
        var item = $('<li/>', { class: 'slider__item' });

        item.append(img);
        $sliderUl.append(item);
      }
    });

    function populateSliderArr(imgLinks, callback) {
      // return error if no imgLinks or imgLinks !== Array
      if (!imgLinks || !(imgLinks instanceof Array)) callback('error!', null);

      // iterate over list and create <img>
      // image and thumbnail have different w/h & class
      for (var i=0; i<imgLinks.length; i++) {
        var link = imgLinks[i];
        var image = createImageElem(link, false);
        var thumbnail = createImageElem(link, true);

        // push pair into object then into sliderArr
        self.sliderArr.push({
          image: image,
          thumbnail: thumbnail
        });
      }
      callback(null, self.sliderArr);
    }

    function createImageElem(imgLink, isThumbnail) {
      var width  = isThumbnail ? '40px' : '100%';
      var height = isThumbnail ? '40px' : '100%';
      var klass  = isThumbnail ? 's-img-thumb' : 's-img';

      return $('<img/>', {
        src: imgLink,
        width: width,
        height: height,
        class: klass
      });
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

})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuKGZ1bmN0aW9uKCQpIHtcblxuICB2YXIgcm9vdCA9IHRoaXM7XG4gIEFwcCA9IHJvb3QuQXBwIHx8IHt9O1xuXG4gIEFwcC50eXBlciA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnR5cGVkKHtcbiAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgJ3N1cHBvcnQgb3VyIGNhdXNlLicsXG4gICAgICAgICdyZWNpZXZlIHJlZ3VsYXIgdXBkYXRlcyBvbiBldmVudHMuJyxcbiAgICAgICAgJ2hlbHAgbWFrZSB0aGUgd29ybGQgYSBiZXR0ZXIgcGxhY2UuJ1xuICAgICAgXSxcbiAgICAgIHR5cGVTcGVlZDogMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBiYWNrRGVsYXk6IDMwMDAsXG4gICAgICBiYWNrU3BlZWQ6IC01LFxuICAgICAgc2hvd0N1cnNvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC50b2tlbkZpZWxkID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudG9rZW5maWVsZCh7XG4gICAgICAvLyBhdXRvY29tcGxldGU6IHtcbiAgICAgIC8vICAgc291cmNlOiBbJ3JlZCcsJ2JsdWUnLCdncmVlbicsJ3llbGxvdycsJ3Zpb2xldCcsJ2Jyb3duJywncHVycGxlJywnYmxhY2snLCd3aGl0ZSddLFxuICAgICAgLy8gICBkZWxheTogMTAwXG4gICAgICAvLyB9LFxuICAgICAgc2hvd0F1dG9jb21wbGV0ZU9uRm9jdXM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VycmVudE51bTtcbiAgICB2YXIgbWF4TnVtICAgICAgICAgID0gNjAwO1xuICAgIHZhciAkY29udGVudFByZXZpZXcgPSAkKCcuY29udGVudC1wcmV2aWV3LWlucHV0Jyk7XG4gICAgdmFyICRjdXJyZW50Q291bnQgICA9ICQoJy5jdXJyZW50LWNvdW50Jyk7XG4gICAgdmFyICRtYXhOdW0gICAgICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19tYXgnKTtcbiAgICB2YXIgJGN1cnJlbnROdW0gICAgID0gJCgnLmN1cnJlbnQtY291bnRfX2N1cnJlbnQnKTtcblxuICAgICRjb250ZW50UHJldmlldy5vbigna2V5dXAnLCBmdW5jdGlvbigpIHtcbiAgICAgIGN1cnJlbnROdW0gPSAkY29udGVudFByZXZpZXcudmFsKCkubGVuZ3RoO1xuICAgICAgJGN1cnJlbnROdW0udGV4dChjdXJyZW50TnVtKTtcbiAgICB9KVxuICB9XG5cbiAgLy8gcGx1Z2luIHVzZWQgaW4gYmxvZ3Mvc2hvd19ibG9nIHNpZGViYXJcbiAgQXBwLnNjcm9sbEZvbGxvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnNpbXBsZVNjcm9sbEZvbGxvdyh7XG4gICAgICBsaW1pdF9lbGVtOiAnLm9uLWxlZnQnXG4gICAgfSk7XG4gIH1cblxuICBBcHAubmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXIgPSAkKCdoZWFkZXInKTtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICB2YXIgJGxvZ28gPSAkKCcjaGVhZGVyLWxvZ28tbGluaycpO1xuICAgIHZhciAkbWVudSA9ICQoJyNoZWFkZXItbWVudS1saW5rJyk7XG5cbiAgICAkd2luZG93Lm9uKCdzY3JvbGwgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNjcm9sbFRvcCgpKVxuICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMCkge1xuICAgICAgICAkbmF2YmFyLmFkZENsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnI2RkZCcgfSlcbiAgICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAuOCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgICRtZW51LmNzcyh7IGNvbG9yOiAnIzk5OScgfSlcbiAgICAgICAgJGxvZ28uY3NzKHsgb3BhY2l0eTogJzAnIH0pXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAucHVzaE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhckJ0biAgPSAkKCdhI2hlYWRlci1tZW51LWxpbmsnKTtcbiAgICB2YXIgJG1haW5Db250ICAgPSAkKCcubWFpbi1jb250Jyk7XG4gICAgdmFyICRzaXRlSGVhZGVyID0gJCgnaGVhZGVyLnNpdGUtaGVhZGVyJyk7XG4gICAgdmFyICRuYXZNZW51ICAgID0gJCgnI25hdi1tZW51Jyk7XG5cbiAgICAvLyBtZW51IGxpbmsgY2xpY2tlZFxuICAgICRuYXZiYXJCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgLy8gaWYgbWFpbi1jb250IGhhcyBjbGFzcyAucHVzaC1yaWdodCB0aGVuIHJlbW92ZSBpdFxuICAgICAgaWYgKCRtYWluQ29udC5oYXNDbGFzcygncHVzaC1yaWdodCcpKSB7XG4gICAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzk5OScgfSk7XG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJzBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgICAgLy8gYWRkIGl0IGlmIHRoZXJlIGlzbnQgLnB1c2gtcmlnaHRcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoISRzaXRlSGVhZGVyLmhhc0NsYXNzKCd3aXRoLWJnJykpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnbm8gYmcnKVxuICAgICAgICAgICR0aGlzLmNzcyh7IGNvbG9yOiAnIzRkYWZjZicgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkdGhpcy5jc3MoeyAnY29sb3InOiAnI2ZmZicgfSlcbiAgICAgICAgfVxuXG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLnNob3coKVxuICAgICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICczMDBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAuYWRkQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJy0zMDBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHJlZ2lzdGVyRm9ybSA9ICQoJyNldmVudC1yZWdpc3Rlci1mb3JtJyk7XG4gICAgdmFyICRmTmFtZSAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5maXJzdC1uYW1lJyk7XG4gICAgdmFyICRsTmFtZSAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5sYXN0LW5hbWUnKTtcbiAgICB2YXIgJGVtYWlsICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmVtYWlsJyk7XG4gICAgdmFyICRtZXNzYWdlICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5tZXNzYWdlJyk7XG4gICAgdmFyICRzbHVnICAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5oaWRkZW4tc2x1ZycpO1xuICAgIHZhciAkcmVnU3VjY2VzcyAgID0gJCgnLnJlZ2lzdGVyLXN1Y2Nlc3MnKTtcbiAgICB2YXIgJHJlZ0Vycm9yICAgICA9ICQoJy5yZWdpc3Rlci1lcnJvcicpO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRGb3JtKHdhc1N1Y2Nlc3MpIHtcbiAgICAgIGlmICh3YXNTdWNjZXNzKSB7XG4gICAgICAgICRyZWdTdWNjZXNzLnNob3coKTtcbiAgICAgIH1cbiAgICAgICRmTmFtZS52YWwoJycpO1xuICAgICAgJGxOYW1lLnZhbCgnJyk7XG4gICAgICAkZW1haWwudmFsKCcnKTtcbiAgICAgICRtZXNzYWdlLnZhbCgnJyk7XG4gICAgICAkc2x1Zy52YWwoJycpO1xuICAgIH1cblxuICAgICRyZWdpc3RlckZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGZfbmFtZTogICAgJGZOYW1lLnZhbCgpLFxuICAgICAgICBsX25hbWU6ICAgICRsTmFtZS52YWwoKSxcbiAgICAgICAgZnVsbF9uYW1lOiAkLnRyaW0oJGZOYW1lLnZhbCgpKSArICcgJyArICQudHJpbSgkbE5hbWUudmFsKCkpLFxuICAgICAgICBlbWFpbDogICAgICRlbWFpbC52YWwoKSxcbiAgICAgICAgbWVzc2FnZTogICAkbWVzc2FnZS52YWwoKSxcbiAgICAgICAgc2x1ZzogICAgICAkc2x1Zy52YWwoKVxuICAgICAgfVxuXG4gICAgICAkLnBvc3QoJy9ldmVudHMvJytkYXRhLnNsdWcrJy9yZWdpc3RlcicsIGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAvLyBjYWxsIGZ1bmMgYmFzZWQgb24gd2VhdGhlciBvciBub3QgcmVzLnNlbmQodHJ1ZSlcbiAgICAgICAgcmVzdWx0ID8gcmVzZXRGb3JtKHRydWUpIDogcmVzZXRGb3JtKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG4gIH1cblxuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkY3JlYXRlZEF0ID0gJCgnLmF0dGVuZGVlX19jcmVhdGVkLWF0Jyk7XG4gICAgdmFyICRhdHRlbmRlZU1lc3NhZ2UgPSAkKCcuYXR0ZW5kZWVfX21lc3NhZ2UnKTtcbiAgICB2YXIgJHZpZXdBdHRlbmRlZXNCdG4gPSAkKCcuYnRuLWF0dGVuZGVlcycpO1xuICAgIHZhciAkYXR0ZW5kZWVSb3cgPSAkKCcuYXR0ZW5kZWUtcm93Jyk7XG4gICAgdmFyIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBlYWNoIGF0dGVuZGVlXG4gICAgLy8gdGFrZSBlYWNoIGRhdGEtY3JlYXRlZGF0LCBjYWxsIHRvRGF0ZVN0cmluZ1xuICAgIC8vIHRoZW4gYXBwZW5kIGJhY2sgb250byBfX2NyZWF0ZWQtYXRcbiAgICAkY3JlYXRlZEF0LmVhY2goZnVuY3Rpb24oY2FFbGVtKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIGRhdGVEYXRhID0gJHRoaXMuZGF0YSgnY3JlYXRlZGF0Jyk7XG4gICAgICB2YXIgZGF0ZVN0cmluZyA9IG5ldyBEYXRlKGRhdGVEYXRhKTtcbiAgICAgICR0aGlzLmFwcGVuZChkYXRlU3RyaW5nLnRvRGF0ZVN0cmluZygpKTtcbiAgICB9KTtcblxuICAgIC8vIGNsaWNrIGV2ZW50IGZvciB2aWV3IGF0dGVuZGVlc1xuICAgICR2aWV3QXR0ZW5kZWVzQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKCFhdHRSb3dTaG93aW5nKSB7XG4gICAgICAgIC8vIHNob3cgYXR0Um93XG4gICAgICAgIGF0dFJvd1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICAkYXR0ZW5kZWVSb3cuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGlkZSBhdHRSb3dcbiAgICAgICAgYXR0Um93U2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAkYXR0ZW5kZWVSb3cuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnByb2dyYW1TbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHBTbGlkZXIgID0gJCgnI3Byb2dyYW1zLXNsaWRlcicpO1xuICAgIHZhciAkcHJvZ0FsbCAgPSAkcFNsaWRlci5maW5kKCdhLnByb2dyYW0nKTtcbiAgICB2YXIgJHByb2cxICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0xJyk7XG4gICAgdmFyICRwcm9nMiAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMicpO1xuICAgIHZhciAkcHJvZzMgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTMnKTtcbiAgICB2YXIgJHByb2c0ICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW00Jyk7XG4gICAgdmFyICRwcm9nNSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNScpO1xuICAgIHZhciAkc2F0SW1nICAgPSAkcFNsaWRlci5maW5kKCcuc2F0dXJhdGVkLWltZycpO1xuICAgIHZhciAkZGVzYXRJbWcgPSAkcFNsaWRlci5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJyk7XG5cblxuICAgICRwcm9nQWxsLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgLy8gc2FtZSBhY2Nyb3NzIGFsbCBwcm9ncmFtc1xuICAgICAgLy8gaGlkZSBkZXNhdCBpbWcsIHNob3cgc2F0IGltZ1xuICAgICAgJHRoaXNcbiAgICAgICAgLmZpbmQoJy5kZXNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcblxuICAgICAgLy8gaWYgc2NlbmFyaW8gcHJvZ3JhbVhcbiAgICAgIC8vIG1ha2UgY29udGVudCB3aWR0aCAxMDAlXG4gICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0xJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgLy8gcHVzaCBhbGwgb3ZlciA0JVxuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzI0JScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDQlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2NCUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzg0JScgfSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMicpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICcxOCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgIC8vIGxlZnQgLTIlIHB1c2ggYWxsIHRvIHRoZSByaWdodCAyJVxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDIlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMycpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICczOCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzYyJScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW00JykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzU4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnMzglJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtNScpKSB7XG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICc3NiUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgIC8vIHB1c2ggYWxsIHRvIHRoZSBsZWZ0IC00JVxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy00JScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTYlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczNiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzU2JScgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIGhpZGUgYWxsIHNhdC1pbWcsIHNob3cgYWxsIGRlc2F0LWltZ1xuICAgICAgJHByb2dBbGxcbiAgICAgICAgLmZpbmQoJy5zYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpXG4gICAgICAgICAgLmNzcyh7IGRpc3BsYXk6ICdibG9jaycgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgIC5jc3MoeyB3aWR0aDogJzgwJScgfSlcblxuICAgICAgLy8gcmV0dXJuIGFsbCBwcm9nYW1zIHRvIHRoZWlyXG4gICAgICAvLyBub3JtYWwgc3RhdGVcbiAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnMCUnIH0pO1xuICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyMCUnIH0pO1xuICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICc0MCUnIH0pO1xuICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MCUnIH0pO1xuICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MCUnIH0pO1xuICAgIH0pXG4gIH1cblxuICBBcHAuaW1hZ2VHYWxsZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gb25jZSBhbGwgdGhlIGltYWdlcyBhcmUgYWxsIGxvYWRlZCBpbml0IG1hc29ucnkgd2l0aCBvcHRpb25zXG4gICAgdmFyICRncmlkID0gJCgnI2dhbGxlcmllcyAuZ3JpZCcpLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICRncmlkLm1hc29ucnkoe1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICAgICcuZ3JpZC1pdGVtJyxcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICBjb2x1bW5XaWR0aDogICAgICcuZ3JpZC1zaXplcicsXG4gICAgICAgIGd1dHRlcjogICAgICAgICAgNVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKCcuZmFuY3lib3gnKS5mYW5jeWJveCh7XG4gICAgICBmaXRUb1ZpZXc6IHRydWUsXG4gICAgICBjbG9zZUJ0bjogdHJ1ZSxcbiAgICAgIHBhZGRpbmc6ICc2MHB4IDBweCAzMHB4IDBweCcsXG4gICAgICAvLyB3aWR0aDogJzYwJScsXG4gICAgICAvLyBoZWlnaHQ6ICc2MCUnLFxuICAgICAgbWF4V2lkdGg6IDEyMDAsXG4gICAgICBtYXhIZWlnaHQ6IDU2MFxuICAgIH0pO1xuICB9XG5cbiAgQXBwLmltYWdlU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciAkc2xpZGVyID0gJCgnI3NsaWRlcicpO1xuXG4gICAgc2VsZi5zbGlkZXJBcnIgPSBbXTtcblxuICAgIHZhciBpbWdMaW5rcyA9IFtcbiAgICAgICdodHRwOi8vaS5pbWd1ci5jb20vNmNzaDRpcC5qcGcnLFxuICAgICAgJ2h0dHA6Ly93d3cua25vd3lvdXJwcmVzaWRlbnRzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNS8xMS9nZW9yZ2Utd2FzaGluZ3RvbjEuanBnJ1xuICAgIF07XG5cbiAgICBwb3B1bGF0ZVNsaWRlckFycihpbWdMaW5rcywgZnVuY3Rpb24oZXJyLCBhcnIpIHtcbiAgICAgIHZhciAkc2xpZGVyVWwgPSAkKCc8dWwvPicsIHsgY2xhc3M6ICdzbGlkZXJfX2xpc3QnIH0pO1xuXG4gICAgICAkc2xpZGVyLmFwcGVuZCgkc2xpZGVyVWwpO1xuXG4gICAgICBmb3IgKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgIHZhciBpbWcgID0gYXJyW2ldLmltYWdlO1xuICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaS8+JywgeyBjbGFzczogJ3NsaWRlcl9faXRlbScgfSk7XG5cbiAgICAgICAgaXRlbS5hcHBlbmQoaW1nKTtcbiAgICAgICAgJHNsaWRlclVsLmFwcGVuZChpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlU2xpZGVyQXJyKGltZ0xpbmtzLCBjYWxsYmFjaykge1xuICAgICAgLy8gcmV0dXJuIGVycm9yIGlmIG5vIGltZ0xpbmtzIG9yIGltZ0xpbmtzICE9PSBBcnJheVxuICAgICAgaWYgKCFpbWdMaW5rcyB8fCAhKGltZ0xpbmtzIGluc3RhbmNlb2YgQXJyYXkpKSBjYWxsYmFjaygnZXJyb3IhJywgbnVsbCk7XG5cbiAgICAgIC8vIGl0ZXJhdGUgb3ZlciBsaXN0IGFuZCBjcmVhdGUgPGltZz5cbiAgICAgIC8vIGltYWdlIGFuZCB0aHVtYm5haWwgaGF2ZSBkaWZmZXJlbnQgdy9oICYgY2xhc3NcbiAgICAgIGZvciAodmFyIGk9MDsgaTxpbWdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGluayA9IGltZ0xpbmtzW2ldO1xuICAgICAgICB2YXIgaW1hZ2UgPSBjcmVhdGVJbWFnZUVsZW0obGluaywgZmFsc2UpO1xuICAgICAgICB2YXIgdGh1bWJuYWlsID0gY3JlYXRlSW1hZ2VFbGVtKGxpbmssIHRydWUpO1xuXG4gICAgICAgIC8vIHB1c2ggcGFpciBpbnRvIG9iamVjdCB0aGVuIGludG8gc2xpZGVyQXJyXG4gICAgICAgIHNlbGYuc2xpZGVyQXJyLnB1c2goe1xuICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICB0aHVtYm5haWw6IHRodW1ibmFpbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKG51bGwsIHNlbGYuc2xpZGVyQXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbWFnZUVsZW0oaW1nTGluaywgaXNUaHVtYm5haWwpIHtcbiAgICAgIHZhciB3aWR0aCAgPSBpc1RodW1ibmFpbCA/ICc0MHB4JyA6ICcxMDAlJztcbiAgICAgIHZhciBoZWlnaHQgPSBpc1RodW1ibmFpbCA/ICc0MHB4JyA6ICcxMDAlJztcbiAgICAgIHZhciBrbGFzcyAgPSBpc1RodW1ibmFpbCA/ICdzLWltZy10aHVtYicgOiAncy1pbWcnO1xuXG4gICAgICByZXR1cm4gJCgnPGltZy8+Jywge1xuICAgICAgICBzcmM6IGltZ0xpbmssXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIGNsYXNzOiBrbGFzc1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICByb290LkFwcCA9IEFwcDtcblxuICBBcHAudHlwZXIoJy5ubC10eXBlcicpO1xuICBBcHAudG9rZW5GaWVsZCgnI25ldy1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuICBBcHAuc2Nyb2xsRm9sbG93KCcjc2hvdy1ibG9nIC5vbi1yaWdodCwgI2Jsb2dzIC5vbi1yaWdodCcpO1xuICBBcHAubmF2YmFyKCk7XG4gIEFwcC5wdXNoTWVudSgpO1xuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCgpO1xuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuICBBcHAucHJvZ3JhbVNsaWRlcigpO1xuICBBcHAuaW1hZ2VHYWxsZXJ5KCk7XG4gIEFwcC5pbWFnZVNsaWRlcigpOyAvLyBmb3IgamFtZXMgaW5kZXhcblxufSkoalF1ZXJ5KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
