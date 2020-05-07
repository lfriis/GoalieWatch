//creating routes for users to send issues to dev team

const router = require('express').Router();
let Email = require('../models/email.devs.model.js');

// Setup request to pull all existing requests for reporting
router.route('/').get((req, res) => 
{
    Email.find()
      .then(emails => {
          return res.status(200).json('All issues filed: \n' + emails);
      })
      .catch(err => {
          return res.status(400).json('Unable to store email in database\n' + err);
      });
});

// Request for posting new issues by user
router.route('/add').post((req, res) =>
{
    const email   = req.body.email;
    const subject = req.body.subject;
    const body    = req.body.body;

    const newEmail = new Email ({
        email, 
        subject,
        body
    });

    newEmail.save()
      .then( () => {
        return res.status(201).json('Ticket filed, the dev team will be in contact shortly');
      })
      .catch((err => {
        return res.status(400).json('Error saving ticket into database \n' + err)
      }));
});

// Find all filed requests by users email and display in webpage
router.route('/:email').get((req, res) => 
{
    const email = req.params.email;

    Email.find( {email: email} ).sort( {createdAt: 1} )
      .then(emailDevs => {
        return res.status(200).json('Filed issues pulled: \n' + emailDevs);
      })
      .catch(err => {
          return res.status(400).json('No issues posted by user\n' + err);
      });
});

module.exports = router;