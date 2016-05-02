
// handleRegisterSubmit variables
const $registerForm = $('#event-register-form');
const $fName        = $registerForm.find('.first-name');
const $lName        = $registerForm.find('.last-name');
const $email        = $registerForm.find('.email');
const $message      = $registerForm.find('.message');
const $slug         = $registerForm.find('.hidden-slug');
const $tshirtSize   = $registerForm.find("select[name='tShirtSize']");
const $nameOnCard   = $registerForm.find('#nameOnCard');
const $cardNumber   = $registerForm.find('#cardNumber');
const $expMonth     = $registerForm.find('#expMonth');
const $expYear      = $registerForm.find('#expYear');
const $cvcCode      = $registerForm.find('#cvcCode');

const $regSuccess   = $('.register-success');
const $regError     = $('.register-error');

// handleDonateSubmit variables
const $spinner          = $('<i/>'   , { class: 'fa fa-circle-o-notch fa-spin fa-2x fa-fw' });
const $srOnly           = $('<span/>', { class: 'sr-only' });
const $donateForm       = $('#donate-form');
const $spinnerContainer = $('.spinner-container');


Stripe.setPublishableKey('pk_test_vdduCMCVf723Y1E0HpG43j32');

export function handleRegisterSubmit() {

  $registerForm.on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);

    $spinnerContainer.append($spinner).append($srOnly);
    $form.find('.btn').prop('disabled', true);

    Stripe.card.createToken($form, function(status, response) {
      if (response.error) {
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
    });

  });
}

export function handleDonateSubmit() {
  // need to set the publishable key

  // handle the submission of the donate form
  // append spinner & disable button until finished
  $donateForm.on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    $spinnerContainer.append($spinner).append($srOnly);
    $form.find('.btn').prop('disabled', true);

    console.log($form)

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

export function bootstrapSelect() {
  $('.selectpicker').selectpicker();
}

export function showTotalFee() {
  var $totalAmt = $('.show-total-amt');
  $totalAmt.text('$35.00');

  $("input[name='registerOptions']").on('click', function(e) {
    var radioVal = $(this).val();
    if (radioVal === '20') {
      $totalAmt.text('$20.00');
    }
    if (radioVal === '35') {
      $totalAmt.text('$35.00');
    }
  })
}