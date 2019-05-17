const express = require('express');
const { auth } = require('../middleware/auth');
const { CreditCard } = require('../db/models/credit_card');
var router = express.Router();



module.exports = router;

router.get('/', auth, (req, res) => {
  CreditCard.find().then((cards) => {
    return res.send(cards);  
  }).catch((err)=> {
    console.log(err);
  });
});