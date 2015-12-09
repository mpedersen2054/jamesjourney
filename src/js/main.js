

;(function($) {

  var root = this;

  App = root.App || {};

  App.typer = (function() {

    $('.pooptype').typed({
      strings: ['hello there santa', 'goodbye guns', 'why obama?'],
      typeSpeed: 50,
      loop: true,
      backDelay: 5000,
      backSpeed: 50,
      cursorChar: "",
      showCursor: false
    })

  })()

})(jQuery);