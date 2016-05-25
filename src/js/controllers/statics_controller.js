
const $pSlider  = $('#programs-slider');
const $progAll  = $pSlider.find('a.program');
const $prog1    = $pSlider.find('.program1');
const $prog2    = $pSlider.find('.program2');
const $prog3    = $pSlider.find('.program3');
const $prog4    = $pSlider.find('.program4');
const $prog5    = $pSlider.find('.program5');
const $satImg   = $pSlider.find('.saturated-img');
const $desatImg = $pSlider.find('.desaturated-img');

/*
INDEX PAGE
 */

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


/*
builds the dom and then
animates it
[ <imageLinks> ]
 */
export function slideShow() {

  // images for slideshow
  var imgLinks = [
    'http://i.imgur.com/9aMTBwU.jpg',
    'http://i.imgur.com/U4JfOrb.jpg',
    'http://i.imgur.com/W30xBsL.jpg',
    'http://i.imgur.com/x69A8GD.jpg'
  ];

  // build Eslider DOM, pass animateSlider as
  // callback to do when animateSlider is done

  function animateSlider(err) {
    var count = 0;
    var item;

    var sliderArr   = [];
    var $slider     = $('ul#slider');
    var $slideItems = $('.slider__item');
    var sliderLen   = $slideItems.length;

    setInterval(function() {
      // if at end of array, return count to 0
      (count === sliderLen - 1) ? count = 0 : count++;
      // remove .show from all slide__item's
      $slideItems.removeClass('show');
      // find element based on its data-testing
      // attr then add .show, repeat sI
      item = $("li.slider__item[data-position='"+count+"']");
      item.addClass('show');

    }, 6000);
  }

  function buildSliderDom(imgLinks, callback) {
    var sliderArr   = []
    var $slider     = $('ul#slider');
    var $slideItems = $('.slider__item');
    var sliderLen   = $slideItems.length;

    // return error if no imgLinks or imgLinks !== Array
    if (!imgLinks || !(imgLinks instanceof Array)) {
      var err = 'there was an error!';
      callback(err);
    }

    // iterate over list and create <img>
    // image and thumbnail have different w/h & class
    for (var i = 0; i < imgLinks.length; i++) {
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
    // append the image into the li
    // then append li onto #slider
    for (var i=0; i < sliderArr.length; i++) {
      var img  = sliderArr[i].image;
      var isFirst = i === 0 ? 'show' : '';
      var item = $('<li/>', {
        'class': `slider__item ${isFirst}`,
        'data-position': i
      })

      item.append(img);
      $slider.append(item);
    }

    // null for no err
    callback(null);
  }

  // returns new img element with src=imgLink
  function newImage(imgLink, isThumbnail) {
    return $('<img/>', {
      'src': imgLink,
      'class': 's-img'
    });
  }

  buildSliderDom(imgLinks, animateSlider);

}


/*
Adds a custom google map to /contact-us
 */


export function googleMap() {
  // required so error doesnt show, should eventually
  // put all calls to App inside .load
  $(window).load(function() {

    // set your google maps parameters
    var $latitude = 42.090297,
      $longitude = -88.07598200000001,
      $map_zoom = 12; /* ZOOM SETTING */

    // custom marker
    var $marker_url = '../img/google-map-marker.png';

    // pasted the styled maps definition
    var style = [{"featureType":"all","elementType":"all","stylers":[{"saturation":"39"},{"lightness":"11"},{"color":"#99dee9"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"hue":"#7d00ff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#cd3c3c"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"color":"#613737"}]},{"featureType":"landscape","elementType":"labels.icon","stylers":[{"color":"#f7c770"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"color":"#8ed8e1"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#8ed8e1"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#8ed8e1"},{"lightness":21}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#08b7be"}]},{"featureType":"poi.medical","elementType":"labels.text.fill","stylers":[{"color":"#59b1b5"}]},{"featureType":"poi.medical","elementType":"labels.icon","stylers":[{"color":"#f2be3b"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#723f83"},{"weight":"2"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":"1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"lightness":17},{"color":"#f2be3b"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":17},{"color":"#f5f5f5"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#641c7c"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]

    // set google map options
    var map_options = {
      center:            new google.maps.LatLng($latitude, $longitude),
      zoom:              $map_zoom,
      panControl:        true,
      zoomControl:       true,
      mapTypeControl:    false,
      streetViewControl: true,
      mapTypeId:         google.maps.MapTypeId.ROADMAP,
      scrollwheel:       false,
      styles:            style
    };

    // inizialize the map
    var map = new google.maps.Map(document.getElementById("google-container"), map_options);

    //add a custom marker to the map
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng($latitude, $longitude),
      map:      map,
      visible:  true,
      icon:     $marker_url
    });
  })
}


export function scrollspyInstructions() {
  $('#sidebar').affix({
    offset: { top: 350 }
  });

  $('body').scrollspy({
    target: '#instr-left-col',
    offset: 100
  });

}