const markdown = require('markdown').markdown;

export function handleMassEmailSubmit() {

  var $form = $('#new-mass-email-form');

  console.log('hello handlemassemailsub')
  $form.on('submit', function(e) {
    e.preventDefault();
    var $this    = $(this);
    var $subject = $this.find('#subject');
    var $content = $this.find('#content');
    var content  = markdown.toHTML($content.val().trim());

    $content.val(content);

    $this.get(0).submit();
    console.log('submitted!!!', $subject.val(), $content.val());
    window.location = 'https://james4eds.com/emails/sent?success=true&recepsLen=3'
  })
}

export function handleEventEmailSubmit() {
  var $radios = $("input[name='eventId']");
  var $hidden = $("input[name='hiddenCheckedEventId']");
  var $form   = $('#new-event-email-form');

  var firstRadioVal = $radios.first().val();
  $hidden.val(firstRadioVal)

  // console.log($hidden.val())

  $radios.on('change', function(e) {
    e.preventDefault();
    var $this = $(this);
    var thisRadioVal = $this.val();

    $hidden.val(thisRadioVal);
    console.log('hiddens val: ', $hidden.val());
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    var $this         = $(this);
    var subject       = $this.find('#subject').val().trim();
    var content       = $this.find('#content').val().trim();
    var hiddenChecked = $this.find('#hiddenCheckedEventId').val();

    $this.get(0).submit();
  })
}