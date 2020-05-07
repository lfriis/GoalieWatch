// creating routes to pull goalies

const router = require('express').Router();
let Goalies  = require('../models/goalie.model.js');

// pull all scraped goalies from database
router.route('/').get((req, res) =>
{
    Goalies.find().sort( {goalie_name: 1} )
       .then(goalies => {
           return res.status(200).json(goalies);
        })
       .catch((err => {
           return res.status(400).json('Unable to pull goalies ' + err)
        }));
});

module.exports = router;