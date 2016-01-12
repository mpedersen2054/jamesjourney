

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
      $(this).append(dateString.toDateString());
    });

    // click event for view attendees
    $viewAttendeesBtn.on('click', function(e) {
      e.preventDefault();

      if (!attRowShowing) {
        attRowShowing = true;
        $attendeeRow.show();
      }
      else {
        attRowShowing = false;
        $attendeeRow.hide();
      }

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



})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4oZnVuY3Rpb24oJCkge1xuXG4gIHZhciByb290ID0gdGhpcztcbiAgQXBwID0gcm9vdC5BcHAgfHwge307XG5cbiAgQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudHlwZWQoe1xuICAgICAgc3RyaW5nczogW1xuICAgICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgICBdLFxuICAgICAgdHlwZVNwZWVkOiAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICAgIGJhY2tTcGVlZDogLTUsXG4gICAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnRva2VuRmllbGQgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50b2tlbmZpZWxkKHtcbiAgICAgIC8vIGF1dG9jb21wbGV0ZToge1xuICAgICAgLy8gICBzb3VyY2U6IFsncmVkJywnYmx1ZScsJ2dyZWVuJywneWVsbG93JywndmlvbGV0JywnYnJvd24nLCdwdXJwbGUnLCdibGFjaycsJ3doaXRlJ10sXG4gICAgICAvLyAgIGRlbGF5OiAxMDBcbiAgICAgIC8vIH0sXG4gICAgICBzaG93QXV0b2NvbXBsZXRlT25Gb2N1czogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBBcHAuY29udGVudFByZXZpZXdDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50TnVtO1xuICAgIHZhciBtYXhOdW0gICAgICAgICAgPSA2MDA7XG4gICAgdmFyICRjb250ZW50UHJldmlldyA9ICQoJy5jb250ZW50LXByZXZpZXctaW5wdXQnKTtcbiAgICB2YXIgJGN1cnJlbnRDb3VudCAgID0gJCgnLmN1cnJlbnQtY291bnQnKTtcbiAgICB2YXIgJG1heE51bSAgICAgICAgID0gJCgnLmN1cnJlbnQtY291bnRfX21heCcpO1xuICAgIHZhciAkY3VycmVudE51bSAgICAgPSAkKCcuY3VycmVudC1jb3VudF9fY3VycmVudCcpO1xuXG4gICAgJGNvbnRlbnRQcmV2aWV3Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgY3VycmVudE51bSA9ICRjb250ZW50UHJldmlldy52YWwoKS5sZW5ndGg7XG4gICAgICAkY3VycmVudE51bS50ZXh0KGN1cnJlbnROdW0pO1xuICAgIH0pXG4gIH1cblxuICBBcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5uYXZiYXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhciA9ICQoJ2hlYWRlcicpO1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHZhciAkbG9nbyA9ICQoJyNoZWFkZXItbG9nby1saW5rJyk7XG5cbiAgICAkd2luZG93Lm9uKCdzY3JvbGwgY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygkKHRoaXMpLnNjcm9sbFRvcCgpKVxuICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAyMCkge1xuICAgICAgICAkbmF2YmFyLmFkZENsYXNzKCd3aXRoLWJnJyk7XG4gICAgICAgIC8vICRsb2dvLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRuYXZiYXIucmVtb3ZlQ2xhc3MoJ3dpdGgtYmcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5wdXNoTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHZhciAkbmF2TWVudSA9ICQoJyNuYXYnKVxuICAgIHZhciAkbmF2YmFyQnRuID0gJCgnYSNoZWFkZXItbWVudS1saW5rJyk7XG4gICAgdmFyICRtYWluQ29udCA9ICQoJy5tYWluLWNvbnQnKTtcbiAgICB2YXIgJG5hdk1lbnUgPSAkKCcjbmF2LW1lbnUnKTtcblxuICAgIC8vIG1lbnUgbGluayBjbGlja2VkXG4gICAgJG5hdmJhckJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIGlmIG1haW4tY29udCBoYXMgY2xhc3MgLnB1c2gtcmlnaHQgdGhlbiByZW1vdmUgaXRcbiAgICAgIGlmICgkbWFpbkNvbnQuaGFzQ2xhc3MoJ3B1c2gtcmlnaHQnKSkge1xuICAgICAgICAkKHRoaXMpLmNzcygnY29sb3InLCAnI2FhYScpO1xuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5hbmltYXRlKHsgd2lkdGg6ICcwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLnJlbW92ZUNsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICcwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICAgIC8vIGFkZCBpdCBpZiB0aGVyZSBpc250IC5wdXNoLXJpZ2h0XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2NvbG9yJywgJyNmZmYnKTtcbiAgICAgICAgJG5hdk1lbnVcbiAgICAgICAgICAuc2hvdygpXG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzMwMHB4JyB9LCAyMDApXG4gICAgICAgICRtYWluQ29udFxuICAgICAgICAgIC5hZGRDbGFzcygncHVzaC1yaWdodCcpXG4gICAgICAgICAgLmFuaW1hdGUoeyBsZWZ0OiAnLTMwMHB4JyB9LCAyMDApXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcmVnaXN0ZXJGb3JtID0gJCgnI2V2ZW50LXJlZ2lzdGVyLWZvcm0nKTtcbiAgICB2YXIgJGZOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmZpcnN0LW5hbWUnKTtcbiAgICB2YXIgJGxOYW1lICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmxhc3QtbmFtZScpO1xuICAgIHZhciAkZW1haWwgICAgICAgID0gJHJlZ2lzdGVyRm9ybS5maW5kKCcuZW1haWwnKTtcbiAgICB2YXIgJG1lc3NhZ2UgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLm1lc3NhZ2UnKTtcbiAgICB2YXIgJHNsdWcgICAgICAgICA9ICRyZWdpc3RlckZvcm0uZmluZCgnLmhpZGRlbi1zbHVnJyk7XG4gICAgdmFyICRyZWdTdWNjZXNzICAgPSAkKCcucmVnaXN0ZXItc3VjY2VzcycpO1xuICAgIHZhciAkcmVnRXJyb3IgICAgID0gJCgnLnJlZ2lzdGVyLWVycm9yJyk7XG5cbiAgICBmdW5jdGlvbiByZXNldEZvcm0od2FzU3VjY2Vzcykge1xuICAgICAgaWYgKHdhc1N1Y2Nlc3MpIHtcbiAgICAgICAgJHJlZ1N1Y2Nlc3Muc2hvdygpO1xuICAgICAgfVxuICAgICAgJGZOYW1lLnZhbCgnJyk7XG4gICAgICAkbE5hbWUudmFsKCcnKTtcbiAgICAgICRlbWFpbC52YWwoJycpO1xuICAgICAgJG1lc3NhZ2UudmFsKCcnKTtcbiAgICAgICRzbHVnLnZhbCgnJyk7XG4gICAgfVxuXG4gICAgJHJlZ2lzdGVyRm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgZl9uYW1lOiAgICAkZk5hbWUudmFsKCksXG4gICAgICAgIGxfbmFtZTogICAgJGxOYW1lLnZhbCgpLFxuICAgICAgICBmdWxsX25hbWU6ICQudHJpbSgkZk5hbWUudmFsKCkpICsgJyAnICsgJC50cmltKCRsTmFtZS52YWwoKSksXG4gICAgICAgIGVtYWlsOiAgICAgJGVtYWlsLnZhbCgpLFxuICAgICAgICBtZXNzYWdlOiAgICRtZXNzYWdlLnZhbCgpLFxuICAgICAgICBzbHVnOiAgICAgICRzbHVnLnZhbCgpXG4gICAgICB9XG5cbiAgICAgICQucG9zdCgnL2V2ZW50cy8nK2RhdGEuc2x1ZysnL3JlZ2lzdGVyJywgZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIC8vIGNhbGwgZnVuYyBiYXNlZCBvbiB3ZWF0aGVyIG9yIG5vdCByZXMuc2VuZCh0cnVlKVxuICAgICAgICByZXN1bHQgPyByZXNldEZvcm0odHJ1ZSkgOiByZXNldEZvcm0oZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5oYW5kbGVBZG1pbkV2ZW50QXR0ZW5kZWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRjcmVhdGVkQXQgPSAkKCcuYXR0ZW5kZWVfX2NyZWF0ZWQtYXQnKTtcbiAgICB2YXIgJGF0dGVuZGVlTWVzc2FnZSA9ICQoJy5hdHRlbmRlZV9fbWVzc2FnZScpO1xuICAgIHZhciAkdmlld0F0dGVuZGVlc0J0biA9ICQoJy5idG4tYXR0ZW5kZWVzJyk7XG4gICAgdmFyICRhdHRlbmRlZVJvdyA9ICQoJy5hdHRlbmRlZS1yb3cnKTtcbiAgICB2YXIgYXR0Um93U2hvd2luZyA9IGZhbHNlO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGVhY2ggYXR0ZW5kZWVcbiAgICAvLyB0YWtlIGVhY2ggZGF0YS1jcmVhdGVkYXQsIGNhbGwgdG9EYXRlU3RyaW5nXG4gICAgLy8gdGhlbiBhcHBlbmQgYmFjayBvbnRvIF9fY3JlYXRlZC1hdFxuICAgICRjcmVhdGVkQXQuZWFjaChmdW5jdGlvbihjYUVsZW0pIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB2YXIgZGF0ZURhdGEgPSAkdGhpcy5kYXRhKCdjcmVhdGVkYXQnKTtcbiAgICAgIHZhciBkYXRlU3RyaW5nID0gbmV3IERhdGUoZGF0ZURhdGEpO1xuICAgICAgJCh0aGlzKS5hcHBlbmQoZGF0ZVN0cmluZy50b0RhdGVTdHJpbmcoKSk7XG4gICAgfSk7XG5cbiAgICAvLyBjbGljayBldmVudCBmb3IgdmlldyBhdHRlbmRlZXNcbiAgICAkdmlld0F0dGVuZGVlc0J0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmICghYXR0Um93U2hvd2luZykge1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgJGF0dGVuZGVlUm93LnNob3coKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhdHRSb3dTaG93aW5nID0gZmFsc2U7XG4gICAgICAgICRhdHRlbmRlZVJvdy5oaWRlKCk7XG4gICAgICB9XG5cbiAgICB9KVxuXG4gIH1cblxuICByb290LkFwcCA9IEFwcDtcblxuICBBcHAudHlwZXIoJy5ubC10eXBlcicpO1xuICBBcHAudG9rZW5GaWVsZCgnI25ldy1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnRva2VuRmllbGQoJyNlZGl0LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAuY29udGVudFByZXZpZXdDb3VudCgpO1xuICBBcHAuc2Nyb2xsRm9sbG93KCcjc2hvdy1ibG9nIC5vbi1yaWdodCwgI2Jsb2dzIC5vbi1yaWdodCcpO1xuICBBcHAubmF2YmFyKCk7XG4gIEFwcC5wdXNoTWVudSgpO1xuICBBcHAuc3VibWl0UmVnaXN0ZXJFdmVudCgpO1xuICBBcHAuaGFuZGxlQWRtaW5FdmVudEF0dGVuZGVlcygpO1xuXG5cblxufSkoalF1ZXJ5KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
