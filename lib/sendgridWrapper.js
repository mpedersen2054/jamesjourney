const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridUsername, config.sendgridPassword);

// receps, subject, content,
const sendEmail = function(opts, callback) {
  const receps = opts.receps, subject = opts.subject, content = opts.content;

  sendgrid.send({
    to:      receps,
    // bcc:     receps,
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