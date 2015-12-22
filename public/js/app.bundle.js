

;(function($) {

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

    $window.on('scroll change', function() {
      // console.log($(this).scrollTop())
      if ($(this).scrollTop() > 20) {
        $navbar.addClass('with-bg');
      } else {
        $navbar.removeClass('with-bg');
      }

    }).scroll();
  }

  App.pushMenu = function() {
    var $navbarBtn = $('#header-menu-link');

    $navbarBtn.on('click', function(e) {
      e.preventDefault();
      console.log('hello there')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbjsoZnVuY3Rpb24oJCkge1xuXG4gIHZhciByb290ID0gdGhpcztcbiAgQXBwID0gcm9vdC5BcHAgfHwge307XG5cbiAgQXBwLnR5cGVyID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkudHlwZWQoe1xuICAgICAgc3RyaW5nczogW1xuICAgICAgICAnc3VwcG9ydCBvdXIgY2F1c2UuJyxcbiAgICAgICAgJ3JlY2lldmUgcmVndWxhciB1cGRhdGVzIG9uIGV2ZW50cy4nLFxuICAgICAgICAnaGVscCBtYWtlIHRoZSB3b3JsZCBhIGJldHRlciBwbGFjZS4nXG4gICAgICBdLFxuICAgICAgdHlwZVNwZWVkOiAwLFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGJhY2tEZWxheTogMzAwMCxcbiAgICAgIGJhY2tTcGVlZDogLTUsXG4gICAgICBzaG93Q3Vyc29yOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgQXBwLnRva2VuRmllbGQgPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgJChlbGVtKS50b2tlbmZpZWxkKHtcbiAgICAgIC8vIGF1dG9jb21wbGV0ZToge1xuICAgICAgLy8gICBzb3VyY2U6IFsncmVkJywnYmx1ZScsJ2dyZWVuJywneWVsbG93JywndmlvbGV0JywnYnJvd24nLCdwdXJwbGUnLCdibGFjaycsJ3doaXRlJ10sXG4gICAgICAvLyAgIGRlbGF5OiAxMDBcbiAgICAgIC8vIH0sXG4gICAgICBzaG93QXV0b2NvbXBsZXRlT25Gb2N1czogdHJ1ZVxuICAgIH0pXG4gIH1cblxuICBBcHAuc2Nyb2xsRm9sbG93ID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICQoZWxlbSkuc2ltcGxlU2Nyb2xsRm9sbG93KHtcbiAgICAgIGxpbWl0X2VsZW06ICcub24tbGVmdCdcbiAgICB9KTtcbiAgfVxuXG4gIEFwcC5uYXZiYXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhciA9ICQoJ2hlYWRlcicpO1xuICAgIHZhciAkd2luZG93ID0gJCh3aW5kb3cpO1xuXG4gICAgJHdpbmRvdy5vbignc2Nyb2xsIGNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJCh0aGlzKS5zY3JvbGxUb3AoKSlcbiAgICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMjApIHtcbiAgICAgICAgJG5hdmJhci5hZGRDbGFzcygnd2l0aC1iZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5hdmJhci5yZW1vdmVDbGFzcygnd2l0aC1iZycpO1xuICAgICAgfVxuXG4gICAgfSkuc2Nyb2xsKCk7XG4gIH1cblxuICBBcHAucHVzaE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJG5hdmJhckJ0biA9ICQoJyNoZWFkZXItbWVudS1saW5rJyk7XG5cbiAgICAkbmF2YmFyQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyB0aGVyZScpXG4gICAgfSlcbiAgfVxuXG4gIHJvb3QuQXBwID0gQXBwO1xuXG4gIEFwcC50eXBlcignLm5sLXR5cGVyJyk7XG4gIEFwcC50b2tlbkZpZWxkKCcjbmV3LWJsb2ctdG9rZW5maWVsZCcpO1xuICBBcHAudG9rZW5GaWVsZCgnI2VkaXQtYmxvZy10b2tlbmZpZWxkJyk7XG4gIEFwcC5zY3JvbGxGb2xsb3coJyNzaG93LWJsb2cgLm9uLXJpZ2h0LCAjYmxvZ3MgLm9uLXJpZ2h0Jyk7XG4gIEFwcC5uYXZiYXIoKTtcbiAgQXBwLnB1c2hNZW51KCk7XG5cblxuXG59KShqUXVlcnkpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
