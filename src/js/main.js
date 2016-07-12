
// Normally would import $ here, but running into problems with
// attaching other libraries onto the imported $

import * as globals   from './controllers/global_controller';
import * as statics   from './controllers/statics_controller';
import * as forms     from './controllers/form_controller';
import * as admins    from './controllers/admin_controller';
import * as galleries from './controllers/galleries_controller';
import * as events    from './controllers/events_controller';
import * as emails    from './controllers/emails_controller';
import * as utils     from './controllers/utils_controller';

const currentPath = window.location.pathname.split('/')[1];

$(document).ready(function() {

  $('.lazy').lazy();

  // all pages
  globals.navbar();
  globals.pushMenu();

  if (currentPath === 'contact-us') {
    console.log('loading js for /contact-us');
    statics.googleMap();
  }

  else if (currentPath === 'events') {
    console.log('loading js for /events/*');
    events.eventLocationMap();
    events.eventAffix();
    events.adjustHeight();
    forms.handleRegisterSubmit();
    forms.bootstrapSelect();
    forms.showTotalFee();
    forms.registerOptionsSelect();
  }

  else if (currentPath === 'donate') {
    console.log('loading js for /donate');
    forms.handleDonateSubmit();
    forms.handleDonateSelectDifferentAmt()
  }
  else if (currentPath === 'admin') {
    console.log('loading js for /admin');
    admins.adminPageRenderer();
    admins.handleAdminEventAttendees();
    admins.handleAdminEventAttendeesMessages();
    admins.formatDate();
    admins.formatDonation();
    admins.editGalleryImageName();
  }

  else if (currentPath === 'gallery') {
    console.log('loading js for /gallery');
    galleries.imageGallery();
  }

  else if (currentPath === 'blog') {
    console.log('loading js for /blog');
    admins.contentPreviewCount();
  }

  else if (currentPath === 'emails') {
    console.log('loading js for emails')
    emails.handleMassEmailSubmit();
    emails.handleEventEmailSubmit();
  }

  else if (currentPath === 'utils') {
    utils.getBrowserDems();
  }

  else if (currentPath === '') {
    console.log('loading js for /');
    statics.programSlider();
    statics.slideShow();
  }

  else {
    console.log('no js to run')
  }



  statics.scrollspyInstructions();
});

