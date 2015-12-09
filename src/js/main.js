

;(function($) {

  var root = this;
  App = root.App || {};

  App.typer = function(element) {
    $(element).typed({
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

  root.App = App;

  App.typer('.nl-typer');

})(jQuery);