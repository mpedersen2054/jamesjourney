const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridUsername, config.sendgridPassword);

// receps, subject, content,
const sendEmail = function(opts, callback) {
  console.log('beginning of sgWrapper: ', opts)
  const receps  = opts.receps,
        subject = opts.subject,
        content = opts.content,
        topic   = opts.topic || '',
        slug    = opts.slug || ''

  console.log('from sgwrapper')
  console.log(receps, subject, content, topic, slug)

  sendgrid.send({
    // to:      receps,
    to: [receps[0]],
    bcc:     receps,
    from:    'noreply@james4eds.com',
    subject: subject,
    text:    content
  }, function(err, json) {
    if (err) callback(err, null);
    return callback(null, json);
  });

}

module.exports = {
  sendEmail: sendEmail
};