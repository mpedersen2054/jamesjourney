
// Normally would import $ here, but running into problems with
// attaching other libraries onto the imported $

import * as globals   from './controllers/global_controller';
import * as statics   from './controllers/statics_controller';
import * as forms     from './controllers/form_controller';
import * as admins    from './controllers/admin_controller';
import * as blogs     from './controllers/blogs_controller';
import * as galleries from './controllers/galleries_controller';
import * as events    from './controllers/events_controller';

const currentPath = window.location.pathname.split('/')[1];

$(document).ready(function() {

  if (currentPath === 'contact-us') {
    console.log('contact-us page!');
  } else if (currentPath === 'events') {
    console.log('eventszzz page!!');
  } else if (currentPath === 'donate') {
    console.log('donate pagezz!!');
  } else if (currentPath === 'admin') {
    console.log('addddddmin page');
  } else if (currentPath === 'gallery') {
    console.log('gallery page!!!');
  } else if (currentPath === 'blog') {
    console.log('blog page!!')
  } else if (currentPath === '') {
    console.log('index page???')
  } else {
    console.log('no js to run')
  }

  // all pages
  globals.navbar();
  globals.pushMenu();

  // index
  statics.programSlider();
  statics.slideShow();

  // contact-us
  statics.googleMap();

  events.eventLocationMap();
  events.eventAffix();

  // show_event
  forms.handleRegisterSubmit();
  forms.bootstrapSelect();
  forms.showTotalFee();
  forms.registerOptionsSelect();

  // donate
  forms.handleDonateSubmit();

  // new_blog, new_event?
  admins.contentPreviewCount();

  // admin_page
  admins.adminPageRenderer();
  admins.handleAdminEventAttendees();
  admins.handleAdminEventAttendeesMessages();
  admins.formatDate();
  admins.formatDonation();
  admins.editGalleryImageName();

  // gallery
  galleries.imageGallery();

  statics.scrollspyInstructions();
});

