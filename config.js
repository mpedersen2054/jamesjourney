
module.exports = {

  dbUrl:               process.env.MONGOLAB_URI || 'mongodb://localhost/james',
  sessionSecret:       process.env.SESSION_SECRET || 'secret',

  s3AccessKey:         'AKIAI5RTSCA4OXAPD6RA',
  s3SecretAccessKey:   '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',
  s3BucketUrl:         'https://s3.amazonaws.com/jamesbucket123/',

  mailchimpApiKey:     'a6eec20e3398ba1010f1243598ee34cb-us11',
  mailchimpListUrl:    'https://us11.api.mailchimp.com/3.0/lists/cb90ef9f1e/members',
  mailchimpAuthHeader: 'apikey a6eec20e3398ba1010f1243598ee34cb-us11',

  stripeSkTest:        'sk_test_PPR8iCJxNTmdpRcLOkBReTE9',
  stripePkTest:        'pk_test_vdduCMCVf723Y1E0HpG43j32',
  stripeSkLive:        'sk_live_5NLkT5N2XAq706WFSOWhqdsP',
  stripePkLive:        'pk_live_2dk81qWEapK2BJ8WrDi0uM8Z',

  sendgridUsername:    'app44851703@heroku.com',
  sendgridPassword:    'cvgpzapp0330'

}