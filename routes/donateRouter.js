var donateRouter  = require('express').Router();
var stripeWrapper = require('../lib/stripeWrapper');
var sgWrapper     = require('../lib/sendgridWrapper');
var Subscriber    = require('../db/subscribers');
var Donation      = require('../db/donation');

donateRouter.route('/')
  .get(function(req, res) {
    res.render('donate');
  })

  .post(function(req, res) {
    var rb = req.body;
    Subscriber.findOne({ email: rb.emailAddress }, function(err, sub) {
      if (err) { console.log(err); }

      // to pass into stripeWrapper.charges.create
      var charge = {
        amount:   rb.donateAmt, // make dynamic
        currency: 'USD',
        card:     rb.stripeToken
      };

      stripeWrapper.charges.create(charge, function(err, charge) {
        if (err || !charge) { return console.log('error!', err); }

        // create charge object to save to db
        var dbCharge = {
          chid:      charge.id,
          email:     rb.emailAddress,
          full_name: rb.nameOnCard,
          type:      charge.object,
          category:  'donation',
          refundUrl: charge.refunds.url,
          status:    charge.status,
          amount:    +charge.amount
        }

        // console.log(dbCharge)
        var donationAmtFloat = (dbCharge.amount/100).toFixed(2);
        var msg = `Thank you <span class="text-lblue">${dbCharge.full_name}</span> for your donation of <span class="text-lblue">${donationAmtFloat}</span>`

        // sub found in db, create new donation & add to it
        if (sub) {
          dbCharge.uid = sub._id;
          var newDonation = new Donation(dbCharge);
          newDonation.save(function(err, don) {
            if (err) { console.log('error creating donation', err); }
            if (!err) {
              // var donationAmtFloat = (dbCharge.amount/100).toFixed(2);
              // var msg = `Thank you <span class="text-lblue">${dbCharge.full_name}</span> for your donation of <span class="text-lblue">${donationAmtFloat}</span>`

              console.log('new donation created!', don);
              sub.donations.push(don._id);

              sgWrapper.sendEmail({
                receps: [rb.email],
                subject: '--- Donation ---',
                content: `
                  Thank you for your donation! Here is your receipt.
                `
              }, function(err, data) {
                if (err) { console.log('there was an error!') }
                sub.save(function(err) {
                  if (err) { console.log(err) }
                  res.render('donated', {
                    success: true,
                    message: msg
                  });
                });
              })
            }
          })

        // sub not found in db, create new & add donation to it
        } else {
          var splitName = rb.nameOnCard.split(' ');
          var fName = splitName[0], lName = splitName[1];
          // get attrs from rb
          var subObj = {
            f_name: fName,
            l_name: lName,
            full_name: `${fName} ${lName}`,
            email: rb.emailAddress
          }
          var newSub = new Subscriber(subObj);
          newSub.save(function(err) {
            if (err) { console.log('error creating sub', err); }
            if (!err) {
              // console.log('new sub created!', newSub);
              dbCharge.uid = newSub._id;
              var newDonation = new Donation(dbCharge);
              newDonation.save(function(err) {
                if (err) { console.log(err); }
                newSub.donations.push({ donate_id: newDonation._id, amount: +charge.amount, category: 'donation' });
                newSub.save(function(err) {
                  if (err) { console.log('error!', err); }
                  console.log('donation saved onto sub');

                  sgWrapper.sendEmail({
                    receps: [rb.email],
                    subject: '--- Donation ---',
                    content: `
                      Thank you for your donation! Here is your receipt.
                    `
                  }, function(err, data) {
                    if (err) { console.log('there was an error!') }
                    sub.save(function(err) {
                      if (err) { console.log(err) }
                      res.render('donated', {
                        success: true,
                        message: msg
                      });
                    });
                  })

                });
              })
            }
          })
        }

      })
    })

  })

module.exports = donateRouter;