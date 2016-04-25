
import $ from 'jquery';

var $pSlider  = $('#programs-slider');
var $progAll  = $pSlider.find('a.program');
var $prog1    = $pSlider.find('.program1');
var $prog2    = $pSlider.find('.program2');
var $prog3    = $pSlider.find('.program3');
var $prog4    = $pSlider.find('.program4');
var $prog5    = $pSlider.find('.program5');
var $satImg   = $pSlider.find('.saturated-img');
var $desatImg = $pSlider.find('.desaturated-img');


export function programSlider() {

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