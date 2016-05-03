
// for adminPageRenderer
const $adminSections      = $('.admin-section');
const $adminAll           = $('.admin-section__all');
const $adminBlogs         = $('.admin-section__blogs');
const $adminEvents        = $('.admin-section__events');
const $adminSubs          = $('.admin-section__subscribers');
const $adminImages        = $('.admin-section__gallery');
const $adminDonations     = $('.admin-section__donations');
const $adminLinks         = $('.admin-link');
const $adminLinkAll       = $('.admin-link__all');
const $adminLinkBlogs     = $('.admin-link__blogs');
const $adminLinkEvents    = $('.admin-link__events');
const $adminLinkSubs      = $('.admin-link__subscribers');
const $adminLinkImages    = $('.admin-link__gallery');
const $adminLinkDonations = $('.admin-link__donations');

// for handleAdminEventAttendees && ...Messages
const $createdAt = $('.attendee__created-at');
const $attendeeMessage = $('.attendee__message');
const $viewAttendeesBtn = $('.btn-attendees');
const $attendeeRow = $('.attendee-row, .attendee-meta-row');


/*
/admin
handles showing hbs for whichever link is selected,
hides all other hbs tmpls, shows selected
*/
export function adminPageRenderer() {
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


export function handleAdminEventAttendees() {
  var attRowShowing = false;

  // iterate over each attendee
  // take each data-createdat, call toDateString
  // then append back onto __created-at
  $createdAt.each(function(caElem) {
    var $this = $(this);
    var dateData = $this.data('createdat');
    // console.log(dateData)
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

export function handleAdminEventAttendeesMessages() {
  var $popovers = $('[data-toggle="popover"]');
  // console.log($popovers)
  $popovers.on('click', function(e) {
    console.log()
    $popovers.popover('hide');
    var $this = $(this);
    e.preventDefault();
    $this.popover('show');
  })
}

/*
new_blog, edit_blog
bootstrap-tokenfield allows you to add tags
into input field
*/
export function tokenField(elem) {
  const $newBlogTokenField = $('#new-blog-tokenfield');

  console.log('hello tokenfield')
  // $newBlogTokenField.tokenfield()
  // $(elem).tokenfield({
  //   autocomplete: {
  //     source: ['red','blue','green','yellow','violet','brown','purple','black','white'],
  //     delay: 100
  //   },
  //   showAutocompleteOnFocus: true
  // })
}

/*
new_blog, edit_blog
shows number of characters in blog.contentPreview
*/
export function contentPreviewCount() {
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


/*
/admin
grabs node date obj from data attr on element, formats the date
*/

export function formatDate() {
  var $unformattedDates = $('.jdate');
  $unformattedDates.each(function() {
    var $this        = $(this);
    var dateOrigVal  = $this.data('dateorig');
    var newDate      = new Date(dateOrigVal);
    var localDateStr = newDate.toLocaleDateString();

    if (localDateStr && localDateStr.length) {
      $this.text(localDateStr);
    }
  })
}

export function formatDonation() {
  var $unformattedAmts = $('.jDonationAmt');
  $unformattedAmts.each(function() {
    var $this = $(this);
    var amtOrigVal = $this.data('donationamt');
    var amtFormatted = (amtOrigVal / 100).toFixed(2);

    // handle when donationAmt == 0 ( this shouldnt happen )
    if (amtFormatted[0] == 0) {
      amtFormatted = 'None Specified';
    }

    $this.text(amtFormatted)
  })

}

export function editGalleryImageName() {
  const $editImgBtn = $('.edit-img-btn');

  $editImgBtn.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var imgId = $this.data('imgref');
    // var $imgNameTd = $this.parent().parent().find('.admin-img__name');
    var $imgNameTd = $this.parent().parent().find('.admin-img__name');

    console.log('clicked!!!', imgId, $imgNameTd.text())
  })
}