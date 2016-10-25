module.exports = {

  dbUrl:               process.env.MONGOLAB_URI || 'mongodb://localhost/james',
  sessionSecret:       process.env.SESSION_SECRET || 'secret',

  s3AccessKey:         '',
  s3SecretAccessKey:   '',
  s3BucketUrl:         '',
  s3BucketName:        '',

  mailchimpApiKey:     '',
  mailchimpListUrl:    '',
  mailchimpAuthHeader: '',

  stripeSkTest:        '',
  stripePkTest:        '',
  stripeSkLive:        '',
  stripePkLive:        '',

  sendgridUsername:    '',
  sendgridPassword:    ''

}
