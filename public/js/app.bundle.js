

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

  App.scrollFollow = function(elem) {
    $(elem).simpleScrollFollow({
      limit_elem: '.on-left'
    });
  }

  App.navbar = function() {
    var $navbar = $('header');
    var $window = $(window);
    var $logo = $('#header-logo-link');

    $window.on('scroll change', function() {
      // console.log($(this).scrollTop())
      if ($(this).scrollTop() > 20) {
        $navbar.addClass('with-bg');
        // $logo.show();
      } else {
        $navbar.removeClass('with-bg');
      }
    });
  }

  App.pushMenu = function() {
    // var $navMenu = $('#nav')
    var $navbarBtn = $('a#header-menu-link');
    var $mainCont = $('.main-cont');
    var $navMenu = $('#nav-menu');

    // menu link clicked
    $navbarBtn.on('click', function(e) {
      e.preventDefault();

      // if main-cont has class .push-right then remove it
      if ($mainCont.hasClass('push-right')) {
        $(this).css('color', '#aaa');
        $navMenu
          .animate({ width: '0px' }, 200)
        $mainCont
          .removeClass('push-right')
          .animate({ left: '0px' }, 200)
      }
      // add it if there isnt .push-right
      else {
        $(this).css('color', '#fff');
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

    console.log($progAll)

    $progAll.on('mouseenter', function(e) {
      e.preventDefault();
      var $this = $(this);

      $this
        .find('.desaturated-img')
          .css({ display: 'none' })
        .end()
        .find('.saturated-img')
          .css({ display: 'block' })
        .end()

      if ($this.hasClass('program1')) {
        $this
          .find('.content')
          .css({ width: '100%' })

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

        $prog1.css({ left: '-4%' });
        $prog2.css({ left: '16%' });
        $prog3.css({ left: '36%' });
        $prog4.css({ left: '56%' });

      }
    })

    $progAll.on('mouseleave', function(e) {
      e.preventDefault();
      $progAll
        .find('.saturated-img')
          .css({ display: 'none' })
        .end()
        .find('.desaturated-img')
          .css({ display: 'block' })
        .end()
        .find('.content')
        .css({ width: '80%' })

      $prog1.css({ left: '0%' });
      $prog2.css({ left: '20%' });
      $prog3.css({ left: '40%' });
      $prog4.css({ left: '60%' });
      $prog5.css({ left: '80%' });
    })
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



})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuICBBcHAgPSByb290LkFwcCB8fCB7fTtcblxuICBBcHAudHlwZXIgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50eXBlZCh7XG4gICAgICBzdHJpbmdzOiBbXG4gICAgICAgICdzdXBwb3J0IG91ciBjYXVzZS4nLFxuICAgICAgICAncmVjaWV2ZSByZWd1bGFyIHVwZGF0ZXMgb24gZXZlbnRzLicsXG4gICAgICAgICdoZWxwIG1ha2UgdGhlIHdvcmxkIGEgYmV0dGVyIHBsYWNlLidcbiAgICAgIF0sXG4gICAgICB0eXBlU3BlZWQ6IDAsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgYmFja0RlbGF5OiAzMDAwLFxuICAgICAgYmFja1NwZWVkOiAtNSxcbiAgICAgIHNob3dDdXJzb3I6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBBcHAudG9rZW5GaWVsZCA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnRva2VuZmllbGQoe1xuICAgICAgLy8gYXV0b2NvbXBsZXRlOiB7XG4gICAgICAvLyAgIHNvdXJjZTogWydyZWQnLCdibHVlJywnZ3JlZW4nLCd5ZWxsb3cnLCd2aW9sZXQnLCdicm93bicsJ3B1cnBsZScsJ2JsYWNrJywnd2hpdGUnXSxcbiAgICAgIC8vICAgZGVsYXk6IDEwMFxuICAgICAgLy8gfSxcbiAgICAgIHNob3dBdXRvY29tcGxldGVPbkZvY3VzOiB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIEFwcC5jb250ZW50UHJldmlld0NvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnROdW07XG4gICAgdmFyIG1heE51bSAgICAgICAgICA9IDYwMDtcbiAgICB2YXIgJGNvbnRlbnRQcmV2aWV3ID0gJCgnLmNvbnRlbnQtcHJldmlldy1pbnB1dCcpO1xuICAgIHZhciAkY3VycmVudENvdW50ICAgPSAkKCcuY3VycmVudC1jb3VudCcpO1xuICAgIHZhciAkbWF4TnVtICAgICAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fbWF4Jyk7XG4gICAgdmFyICRjdXJyZW50TnVtICAgICA9ICQoJy5jdXJyZW50LWNvdW50X19jdXJyZW50Jyk7XG5cbiAgICAkY29udGVudFByZXZpZXcub24oJ2tleXVwJywgZnVuY3Rpb24oKSB7XG4gICAgICBjdXJyZW50TnVtID0gJGNvbnRlbnRQcmV2aWV3LnZhbCgpLmxlbmd0aDtcbiAgICAgICRjdXJyZW50TnVtLnRleHQoY3VycmVudE51bSk7XG4gICAgfSlcbiAgfVxuXG4gIEFwcC5zY3JvbGxGb2xsb3cgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS5zaW1wbGVTY3JvbGxGb2xsb3coe1xuICAgICAgbGltaXRfZWxlbTogJy5vbi1sZWZ0J1xuICAgIH0pO1xuICB9XG5cbiAgQXBwLm5hdmJhciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkbmF2YmFyID0gJCgnaGVhZGVyJyk7XG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdmFyICRsb2dvID0gJCgnI2hlYWRlci1sb2dvLWxpbmsnKTtcblxuICAgICR3aW5kb3cub24oJ3Njcm9sbCBjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykuc2Nyb2xsVG9wKCkpXG4gICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDIwKSB7XG4gICAgICAgICRuYXZiYXIuYWRkQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgICAgLy8gJGxvZ28uc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnB1c2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdmFyICRuYXZNZW51ID0gJCgnI25hdicpXG4gICAgdmFyICRuYXZiYXJCdG4gPSAkKCdhI2hlYWRlci1tZW51LWxpbmsnKTtcbiAgICB2YXIgJG1haW5Db250ID0gJCgnLm1haW4tY29udCcpO1xuICAgIHZhciAkbmF2TWVudSA9ICQoJyNuYXYtbWVudScpO1xuXG4gICAgLy8gbWVudSBsaW5rIGNsaWNrZWRcbiAgICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gaWYgbWFpbi1jb250IGhhcyBjbGFzcyAucHVzaC1yaWdodCB0aGVuIHJlbW92ZSBpdFxuICAgICAgaWYgKCRtYWluQ29udC5oYXNDbGFzcygncHVzaC1yaWdodCcpKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdjb2xvcicsICcjYWFhJyk7XG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJzBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgICAgLy8gYWRkIGl0IGlmIHRoZXJlIGlzbnQgLnB1c2gtcmlnaHRcbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmNzcygnY29sb3InLCAnI2ZmZicpO1xuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMzAwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLmFkZENsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5zdWJtaXRSZWdpc3RlckV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRyZWdpc3RlckZvcm0gPSAkKCcjZXZlbnQtcmVnaXN0ZXItZm9ybScpO1xuICAgIHZhciAkZk5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZmlyc3QtbmFtZScpO1xuICAgIHZhciAkbE5hbWUgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubGFzdC1uYW1lJyk7XG4gICAgdmFyICRlbWFpbCAgICAgICAgPSAkcmVnaXN0ZXJGb3JtLmZpbmQoJy5lbWFpbCcpO1xuICAgIHZhciAkbWVzc2FnZSAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcubWVzc2FnZScpO1xuICAgIHZhciAkc2x1ZyAgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuaGlkZGVuLXNsdWcnKTtcbiAgICB2YXIgJHJlZ1N1Y2Nlc3MgICA9ICQoJy5yZWdpc3Rlci1zdWNjZXNzJyk7XG4gICAgdmFyICRyZWdFcnJvciAgICAgPSAkKCcucmVnaXN0ZXItZXJyb3InKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSh3YXNTdWNjZXNzKSB7XG4gICAgICBpZiAod2FzU3VjY2Vzcykge1xuICAgICAgICAkcmVnU3VjY2Vzcy5zaG93KCk7XG4gICAgICB9XG4gICAgICAkZk5hbWUudmFsKCcnKTtcbiAgICAgICRsTmFtZS52YWwoJycpO1xuICAgICAgJGVtYWlsLnZhbCgnJyk7XG4gICAgICAkbWVzc2FnZS52YWwoJycpO1xuICAgICAgJHNsdWcudmFsKCcnKTtcbiAgICB9XG5cbiAgICAkcmVnaXN0ZXJGb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBmX25hbWU6ICAgICRmTmFtZS52YWwoKSxcbiAgICAgICAgbF9uYW1lOiAgICAkbE5hbWUudmFsKCksXG4gICAgICAgIGZ1bGxfbmFtZTogJC50cmltKCRmTmFtZS52YWwoKSkgKyAnICcgKyAkLnRyaW0oJGxOYW1lLnZhbCgpKSxcbiAgICAgICAgZW1haWw6ICAgICAkZW1haWwudmFsKCksXG4gICAgICAgIG1lc3NhZ2U6ICAgJG1lc3NhZ2UudmFsKCksXG4gICAgICAgIHNsdWc6ICAgICAgJHNsdWcudmFsKClcbiAgICAgIH1cblxuICAgICAgJC5wb3N0KCcvZXZlbnRzLycrZGF0YS5zbHVnKycvcmVnaXN0ZXInLCBkYXRhLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgLy8gY2FsbCBmdW5jIGJhc2VkIG9uIHdlYXRoZXIgb3Igbm90IHJlcy5zZW5kKHRydWUpXG4gICAgICAgIHJlc3VsdCA/IHJlc2V0Rm9ybSh0cnVlKSA6IHJlc2V0Rm9ybShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuICB9XG5cbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJGNyZWF0ZWRBdCA9ICQoJy5hdHRlbmRlZV9fY3JlYXRlZC1hdCcpO1xuICAgIHZhciAkYXR0ZW5kZWVNZXNzYWdlID0gJCgnLmF0dGVuZGVlX19tZXNzYWdlJyk7XG4gICAgdmFyICR2aWV3QXR0ZW5kZWVzQnRuID0gJCgnLmJ0bi1hdHRlbmRlZXMnKTtcbiAgICB2YXIgJGF0dGVuZGVlUm93ID0gJCgnLmF0dGVuZGVlLXJvdycpO1xuICAgIHZhciBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBhdHRlbmRlZVxuICAgIC8vIHRha2UgZWFjaCBkYXRhLWNyZWF0ZWRhdCwgY2FsbCB0b0RhdGVTdHJpbmdcbiAgICAvLyB0aGVuIGFwcGVuZCBiYWNrIG9udG8gX19jcmVhdGVkLWF0XG4gICAgJGNyZWF0ZWRBdC5lYWNoKGZ1bmN0aW9uKGNhRWxlbSkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciBkYXRlRGF0YSA9ICR0aGlzLmRhdGEoJ2NyZWF0ZWRhdCcpO1xuICAgICAgdmFyIGRhdGVTdHJpbmcgPSBuZXcgRGF0ZShkYXRlRGF0YSk7XG4gICAgICAkdGhpcy5hcHBlbmQoZGF0ZVN0cmluZy50b0RhdGVTdHJpbmcoKSk7XG4gICAgfSk7XG5cbiAgICAvLyBjbGljayBldmVudCBmb3IgdmlldyBhdHRlbmRlZXNcbiAgICAkdmlld0F0dGVuZGVlc0J0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICghYXR0Um93U2hvd2luZykge1xuICAgICAgICAvLyBzaG93IGF0dFJvd1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgJGF0dGVuZGVlUm93LnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGhpZGUgYXR0Um93XG4gICAgICAgIGF0dFJvd1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgJGF0dGVuZGVlUm93LmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5wcm9ncmFtU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRwU2xpZGVyICA9ICQoJyNwcm9ncmFtcy1zbGlkZXInKTtcbiAgICB2YXIgJHByb2dBbGwgID0gJHBTbGlkZXIuZmluZCgnYS5wcm9ncmFtJyk7XG4gICAgdmFyICRwcm9nMSAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtMScpO1xuICAgIHZhciAkcHJvZzIgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTInKTtcbiAgICB2YXIgJHByb2czICAgID0gJHBTbGlkZXIuZmluZCgnLnByb2dyYW0zJyk7XG4gICAgdmFyICRwcm9nNCAgICA9ICRwU2xpZGVyLmZpbmQoJy5wcm9ncmFtNCcpO1xuICAgIHZhciAkcHJvZzUgICAgPSAkcFNsaWRlci5maW5kKCcucHJvZ3JhbTUnKTtcbiAgICB2YXIgJHNhdEltZyAgID0gJHBTbGlkZXIuZmluZCgnLnNhdHVyYXRlZC1pbWcnKTtcbiAgICB2YXIgJGRlc2F0SW1nID0gJHBTbGlkZXIuZmluZCgnLmRlc2F0dXJhdGVkLWltZycpO1xuXG4gICAgY29uc29sZS5sb2coJHByb2dBbGwpXG5cbiAgICAkcHJvZ0FsbC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICR0aGlzXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAgIC5lbmQoKVxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5lbmQoKVxuXG4gICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0xJykpIHtcbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcyNCUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzQ0JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjQlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4NCUnIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW0yJykpIHtcblxuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnMTglJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy0yJScgfSk7XG4gICAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDIlJyB9KTtcbiAgICAgICAgJHByb2c0LmNzcyh7IGxlZnQ6ICc2MiUnIH0pO1xuICAgICAgICAkcHJvZzUuY3NzKHsgbGVmdDogJzgyJScgfSk7XG5cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwcm9ncmFtMycpKSB7XG5cbiAgICAgICAgJHRoaXNcbiAgICAgICAgICAuY3NzKHsgbGVmdDogJzM4JScgfSlcbiAgICAgICAgICAuZmluZCgnLmNvbnRlbnQnKVxuICAgICAgICAgIC5jc3MoeyB3aWR0aDogJzEwMCUnIH0pXG5cbiAgICAgICAgJHByb2cxLmNzcyh7IGxlZnQ6ICctMiUnIH0pO1xuICAgICAgICAkcHJvZzIuY3NzKHsgbGVmdDogJzE4JScgfSk7XG4gICAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjIlJyB9KTtcbiAgICAgICAgJHByb2c1LmNzcyh7IGxlZnQ6ICc4MiUnIH0pO1xuXG4gICAgICB9XG4gICAgICBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncHJvZ3JhbTQnKSkge1xuXG4gICAgICAgICR0aGlzXG4gICAgICAgICAgLmNzcyh7IGxlZnQ6ICc1OCUnIH0pXG4gICAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgICAuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KVxuXG4gICAgICAgICRwcm9nMS5jc3MoeyBsZWZ0OiAnLTIlJyB9KTtcbiAgICAgICAgJHByb2cyLmNzcyh7IGxlZnQ6ICcxOCUnIH0pO1xuICAgICAgICAkcHJvZzMuY3NzKHsgbGVmdDogJzM4JScgfSk7XG4gICAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODIlJyB9KTtcblxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3Byb2dyYW01JykpIHtcblxuICAgICAgICAkdGhpc1xuICAgICAgICAgIC5jc3MoeyBsZWZ0OiAnNzYlJyB9KVxuICAgICAgICAgIC5maW5kKCcuY29udGVudCcpXG4gICAgICAgICAgLmNzcyh7IHdpZHRoOiAnMTAwJScgfSlcblxuICAgICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJy00JScgfSk7XG4gICAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMTYlJyB9KTtcbiAgICAgICAgJHByb2czLmNzcyh7IGxlZnQ6ICczNiUnIH0pO1xuICAgICAgICAkcHJvZzQuY3NzKHsgbGVmdDogJzU2JScgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgJHByb2dBbGwub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkcHJvZ0FsbFxuICAgICAgICAuZmluZCgnLnNhdHVyYXRlZC1pbWcnKVxuICAgICAgICAgIC5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSlcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCcuZGVzYXR1cmF0ZWQtaW1nJylcbiAgICAgICAgICAuY3NzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJy5jb250ZW50JylcbiAgICAgICAgLmNzcyh7IHdpZHRoOiAnODAlJyB9KVxuXG4gICAgICAkcHJvZzEuY3NzKHsgbGVmdDogJzAlJyB9KTtcbiAgICAgICRwcm9nMi5jc3MoeyBsZWZ0OiAnMjAlJyB9KTtcbiAgICAgICRwcm9nMy5jc3MoeyBsZWZ0OiAnNDAlJyB9KTtcbiAgICAgICRwcm9nNC5jc3MoeyBsZWZ0OiAnNjAlJyB9KTtcbiAgICAgICRwcm9nNS5jc3MoeyBsZWZ0OiAnODAlJyB9KTtcbiAgICB9KVxuICB9XG5cbiAgcm9vdC5BcHAgPSBBcHA7XG5cbiAgQXBwLnR5cGVyKCcubmwtdHlwZXInKTtcbiAgQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG4gIEFwcC50b2tlbkZpZWxkKCcjZWRpdC1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLmNvbnRlbnRQcmV2aWV3Q291bnQoKTtcbiAgQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbiAgQXBwLm5hdmJhcigpO1xuICBBcHAucHVzaE1lbnUoKTtcbiAgQXBwLnN1Ym1pdFJlZ2lzdGVyRXZlbnQoKTtcbiAgQXBwLmhhbmRsZUFkbWluRXZlbnRBdHRlbmRlZXMoKTtcbiAgQXBwLnByb2dyYW1TbGlkZXIoKTtcblxuXG5cbn0pKGpRdWVyeSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
