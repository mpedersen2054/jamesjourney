
import * as globals from './parts/global';
import * as statics from './parts/staticPages';
import * as forms from './parts/form_controller'

const currentPath = window.location.pathname;

$(document).ready(function() {

  // all pages
  globals.navbar();
  globals.pushMenu();

  // index
  statics.programSlider();
  statics.slideShow();

  // contact-us
  statics.googleMap();

  // show_event
  forms.handleDonateSubmit();

  // donate
  forms.handleRegisterSubmit();

})



var App = App || {};


// PAGE >>> new_blog, edit_blog
App.tokenField = function(elem) {
  $(elem).tokenfield({
    // autocomplete: {
    //   source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
    //   delay: 100
    // },
    showAutocompleteOnFocus: true
  })
}

// PAGE >>> new_blog, edit_blog
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

// PAGE >>> admin_page
App.handleAdminEventAttendees = function() {
  var $createdAt = $('.attendee__created-at');
  var $attendeeMessage = $('.attendee__message');
  var $viewAttendeesBtn = $('.btn-attendees');
  var $attendeeRow = $('.attendee-row, .attendee-meta-row');
  var attRowShowing = false;

  // iterate over each attendee
  // take each data-createdat, call toDateString
  // then append back onto __created-at
  $createdAt.each(function(caElem) {
    var $this = $(this);
    var dateData = $this.data('createdat');
    console.log(dateData)
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

// ADMIN
App.handleAdminEventAttendeesMessage = function() {
  var $popovers = $('[data-toggle="popover"]');
  $popovers.on('click', function(e) {
    $popovers.popover('hide');
    var $this = $(this);
    e.preventDefault();
    $this.popover('show');
  })
}


// PAGE >>> /gallery
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
    closeBtn:  true,
    padding:   '60px 0px 30px 0px',
    // width:  '60%',
    // height: '60%',
    maxWidth:  1200,
    maxHeight: 560
  });
}

// PAGE >>> admin_page
App.adminPageRenderer = function() {
  var $adminSections      = $('.admin-section');
  var $adminAll           = $('.admin-section__all');
  var $adminBlogs         = $('.admin-section__blogs');
  var $adminEvents        = $('.admin-section__events');
  var $adminSubs          = $('.admin-section__subscribers');
  var $adminImages        = $('.admin-section__gallery');
  var $adminDonations     = $('.admin-section__donations');
  var $adminLinks         = $('.admin-link');
  var $adminLinkAll       = $('.admin-link__all');
  var $adminLinkBlogs     = $('.admin-link__blogs');
  var $adminLinkEvents    = $('.admin-link__events');
  var $adminLinkSubs      = $('.admin-link__subscribers');
  var $adminLinkImages    = $('.admin-link__gallery');
  var $adminLinkDonations = $('.admin-link__donations');


  // have the `all` be the initial state
  $adminLinkAll.addClass('active');
  $adminAll.addClass('show');


  $adminLinks.on('click', function(e) {
    e.preventDefault();

    // .admin-link__XXX
    var $clicked = $(this);

    // remove all showed and add `active`
    // to the clicked link
    $adminSections.removeClass('show');
    $adminLinks.removeClass('active');
    $adminSections.removeClass('show');
    $clicked.addClass('active')


    if ($clicked[0] == $adminLinkAll[0]) {
      $adminAll.addClass('show');
    }
    else if ($clicked[0] == $adminLinkBlogs[0]) {
      $adminBlogs.addClass('show');
    }
    else if ($clicked[0] == $adminLinkEvents[0]) {
      $adminEvents.addClass('show');
    }
    else if ($clicked[0] == $adminLinkSubs[0]) {
      $adminSubs.addClass('show');
    }
    else if ($clicked[0] == $adminLinkImages[0]) {
      $adminImages.addClass('show');
    }
    else if ($clicked[0] == $adminLinkDonations[0]) {
      $adminDonations.addClass('show');
    }
  })

}


App.tokenField('#new-blog-tokenfield');
App.tokenField('#edit-blog-tokenfield');
App.contentPreviewCount();

App.adminPageRenderer();
App.handleAdminEventAttendees();
App.handleAdminEventAttendeesMessage();

App.imageGallery();

App.countTo($('.achivements .timer'));



