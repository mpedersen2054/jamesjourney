
import $ from 'jquery';

// handleRegisterSubmit variables
const $registerForm = $('#event-register-form');
const $fName        = $registerForm.find('.first-name');
const $lName        = $registerForm.find('.last-name');
const $email        = $registerForm.find('.email');
const $message      = $registerForm.find('.message');
const $slug         = $registerForm.find('.hidden-slug');
const $tshirtSize   = $registerForm.find("select[name='tShirtSize']");
const $regSuccess   = $('.register-success');
const $regError     = $('.register-error');

// handleDonateSubmit variables
const $spinner          = $('<i/>'   , { class: 'fa fa-circle-o-notch fa-spin fa-2x fa-fw' });
const $srOnly           = $('<span/>', { class: 'sr-only' });
const $donateForm       = $('#donate-form');
const $spinnerContainer = $('.spinner-container');



export function handleRegisterSubmit() {

  function resetForm(result) {
    if (result.success) {
      $regSuccess.append('<div>'+result.message+'</div>');
      $regSuccess.show();
    }
    else {
      $regError.append('<div>'+result.message+'</div>');
      $regError.show();
    }
    $fName.val('');
    $lName.val('');
    $email.val('');
    $message.val('');
    $slug.val('');
  }

  $registerForm.on('submit', function(e) {
    e.preventDefault();

    var data = {
      f_name:    $fName.val(),
      l_name:    $lName.val(),
      full_name: $.trim($fName.val()) + ' ' + $.trim($lName.val()),
      email:     $email.val(),
      message:   $message.val(),
      slug:      $slug.val(),
      tshirt:    $tshirtSize.val()
    }

    $.post('/events/'+data.slug+'/register', data, function(result) {
      // call func based on weather or not res.send(true)
      result ? resetForm(result) : resetForm(result);
    });

  });
}

export function handleDonateSubmit() {

  // need to set the publishable key
  Stripe.setPublishableKey('pk_test_vdduCMCVf723Y1E0HpG43j32');

  // handle the submission of the donate form
  // append spinner & disable button until finished
  $donateForm.on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    $spinnerContainer.append($spinner).append($srOnly);
    $form.find('.btn').prop('disabled', true);

    // create the stripeToken
    Stripe.card.createToken($form, stripeResponseHandler);
  })

  // callback handler that either inserts errors or attaches
  // stripeToken to hidden input, then submits form
  function stripeResponseHandler(status, response) {
    var $form = $donateForm;

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };
}