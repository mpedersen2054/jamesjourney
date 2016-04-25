var donateRouter  = require('express').Router();
var stripeWrapper = require('../lib/stripeWrapper');
var Subscriber    = require('../db/subscribers');
var Donation      = require('../db/donation');

donateRouter.route('/')
  .get(function(req, res) {
    res.render('donate');
  })

  .post(function(req, res) {
    Subscriber.findOne({ email: req.body.emailAddress }, function(err, sub) {
      if (err) { console.log(err); }

      // to pass into stripeWrapper.charges.create
      var charge = {
        amount:   req.body.donateAmt, // make dynamic
        currency: 'USD',
        card:     req.body.stripeToken
      };

      stripeWrapper.charges.create(charge, function(err, charge) {
        if (err || !charge) { return console.log('error!', err); }

        // create charge object to save to db
        var dbCharge = {
          chid:      charge.id,
          email:     req.body.emailAddress,
          full_name: req.body.nameOnCard,
          type:      charge.object,
          refundUrl: charge.refunds.url,
          status:    charge.status,
          amount:    +charge.amount
        }

        console.log(dbCharge)

        // sub found in db, create new donation & add to it
        if (sub) {
          dbCharge.uid = sub._id;
          var newDonation = new Donation(dbCharge);
          newDonation.save(function(err, don) {
            if (err) { console.log('error creating donation', err); }
            if (!err) {
              var donationAmtFloat = (dbCharge.amount/100).toFixed(2);
              var msg = `Thank you <span class="text-lblue">${dbCharge.full_name} for your donation of <span class="text-lblue">${donationAmtFloat}</span>`

              console.log('new donation created!', don);
              sub.donations.push(don._id);
              sub.save(function(err) {
                if (err) { console.log(err) }
                res.render('donated', {
                  success: true,
                  message: msg
                });
              });
            }
          })

        // sub not found in db, create new & add donation to it
        } else {
          var splitName = req.body.nameOnCard.split(' ');
          var fName = splitName[0], lName = splitName[1];
          // get attrs from req.body
          var subObj = {
            f_name: fName,
            l_name: lName,
            email: req.body.emailAddress
          }
          var newSub = new Subscriber(subObj);
          newSub.save(function(err) {
            if (err) { console.log('error creating sub', err); }
            if (!err) {
              console.log('new sub created!', newSub);
              dbCharge.uid = newSub._id;
              var newDonation = new Donation(dbCharge);
              newDonation.save(function(err) {
                if (err) { console.log(err); }
                newSub.donations.push(newDonation._id);
                newSub.save(function(err) {
                  if (err) { console.log('error!', err); }
                  console.log('donation saved onto sub');
                  res.render('donated', {
                    success: true,
                    message: 'Thank you '+dbCharge.full_name+' for your donation of $'+(dbCharge.amount/100).toFixed(2)+'.'
                  });
                });
              })
            }
          })
        }

      })
    })

  })

module.exports = donateRouter;