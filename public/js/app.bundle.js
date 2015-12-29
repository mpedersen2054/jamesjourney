

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

    })
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
    })
  }

  root.App = App;

  App.typer('.nl-typer');
  App.tokenField('#new-blog-tokenfield');
  App.tokenField('#edit-blog-tokenfield');
  App.scrollFollow('#show-blog .on-right, #blogs .on-right');
  App.navbar();
  App.pushMenu();



})(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuKGZ1bmN0aW9uKCQpIHtcblxuICB2YXIgcm9vdCA9IHRoaXM7XG4gIEFwcCA9IHJvb3QuQXBwIHx8IHt9O1xuXG4gIEFwcC50eXBlciA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnR5cGVkKHtcbiAgICAgIHN0cmluZ3M6IFtcbiAgICAgICAgJ3N1cHBvcnQgb3VyIGNhdXNlLicsXG4gICAgICAgICdyZWNpZXZlIHJlZ3VsYXIgdXBkYXRlcyBvbiBldmVudHMuJyxcbiAgICAgICAgJ2hlbHAgbWFrZSB0aGUgd29ybGQgYSBiZXR0ZXIgcGxhY2UuJ1xuICAgICAgXSxcbiAgICAgIHR5cGVTcGVlZDogMCxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBiYWNrRGVsYXk6IDMwMDAsXG4gICAgICBiYWNrU3BlZWQ6IC01LFxuICAgICAgc2hvd0N1cnNvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC50b2tlbkZpZWxkID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudG9rZW5maWVsZCh7XG4gICAgICAvLyBhdXRvY29tcGxldGU6IHtcbiAgICAgIC8vICAgc291cmNlOiBbJ3JlZCcsJ2JsdWUnLCdncmVlbicsJ3llbGxvdycsJ3Zpb2xldCcsJ2Jyb3duJywncHVycGxlJywnYmxhY2snLCd3aGl0ZSddLFxuICAgICAgLy8gICBkZWxheTogMTAwXG4gICAgICAvLyB9LFxuICAgICAgc2hvd0F1dG9jb21wbGV0ZU9uRm9jdXM6IHRydWVcbiAgICB9KVxuICB9XG5cbiAgQXBwLnNjcm9sbEZvbGxvdyA9IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAkKGVsZW0pLnNpbXBsZVNjcm9sbEZvbGxvdyh7XG4gICAgICBsaW1pdF9lbGVtOiAnLm9uLWxlZnQnXG4gICAgfSk7XG4gIH1cblxuICBBcHAubmF2YmFyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyICRuYXZiYXIgPSAkKCdoZWFkZXInKTtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICB2YXIgJGxvZ28gPSAkKCcjaGVhZGVyLWxvZ28tbGluaycpO1xuXG4gICAgJHdpbmRvdy5vbignc2Nyb2xsIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKS5zY3JvbGxUb3AoKSlcbiAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjApIHtcbiAgICAgICAgJG5hdmJhci5hZGRDbGFzcygnd2l0aC1iZycpO1xuICAgICAgICAvLyAkbG9nby5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkbmF2YmFyLnJlbW92ZUNsYXNzKCd3aXRoLWJnJyk7XG4gICAgICB9XG5cbiAgICB9KVxuICB9XG5cbiAgQXBwLnB1c2hNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdmFyICRuYXZNZW51ID0gJCgnI25hdicpXG4gICAgdmFyICRuYXZiYXJCdG4gPSAkKCdhI2hlYWRlci1tZW51LWxpbmsnKTtcbiAgICB2YXIgJG1haW5Db250ID0gJCgnLm1haW4tY29udCcpO1xuICAgIHZhciAkbmF2TWVudSA9ICQoJyNuYXYtbWVudScpO1xuXG4gICAgLy8gbWVudSBsaW5rIGNsaWNrZWRcbiAgICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gaWYgbWFpbi1jb250IGhhcyBjbGFzcyAucHVzaC1yaWdodCB0aGVuIHJlbW92ZSBpdFxuICAgICAgaWYgKCRtYWluQ29udC5oYXNDbGFzcygncHVzaC1yaWdodCcpKSB7XG4gICAgICAgICQodGhpcykuY3NzKCdjb2xvcicsICcjYWFhJyk7XG4gICAgICAgICRuYXZNZW51XG4gICAgICAgICAgLmFuaW1hdGUoeyB3aWR0aDogJzBweCcgfSwgMjAwKVxuICAgICAgICAkbWFpbkNvbnRcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3B1c2gtcmlnaHQnKVxuICAgICAgICAgIC5hbmltYXRlKHsgbGVmdDogJzBweCcgfSwgMjAwKVxuICAgICAgfVxuICAgICAgLy8gYWRkIGl0IGlmIHRoZXJlIGlzbnQgLnB1c2gtcmlnaHRcbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLmNzcygnY29sb3InLCAnI2ZmZicpO1xuICAgICAgICAkbmF2TWVudVxuICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAuYW5pbWF0ZSh7IHdpZHRoOiAnMzAwcHgnIH0sIDIwMClcbiAgICAgICAgJG1haW5Db250XG4gICAgICAgICAgLmFkZENsYXNzKCdwdXNoLXJpZ2h0JylcbiAgICAgICAgICAuYW5pbWF0ZSh7IGxlZnQ6ICctMzAwcHgnIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcm9vdC5BcHAgPSBBcHA7XG5cbiAgQXBwLnR5cGVyKCcubmwtdHlwZXInKTtcbiAgQXBwLnRva2VuRmllbGQoJyNuZXctYmxvZy10b2tlbmZpZWxkJyk7XG4gIEFwcC50b2tlbkZpZWxkKCcjZWRpdC1ibG9nLXRva2VuZmllbGQnKTtcbiAgQXBwLnNjcm9sbEZvbGxvdygnI3Nob3ctYmxvZyAub24tcmlnaHQsICNibG9ncyAub24tcmlnaHQnKTtcbiAgQXBwLm5hdmJhcigpO1xuICBBcHAucHVzaE1lbnUoKTtcblxuXG5cbn0pKGpRdWVyeSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
