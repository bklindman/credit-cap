const express = require('express');
const { auth } = require('../middleware/auth');
const { CreditCard } = require('../db/models/credit_card');
const { getAllCards, calculateRewards, createRewardsMap } = require('../utils/card-util');
const { getPurchases } = require('../utils/user-util');

var router = express.Router();


router.get('/', auth, (req, res) => {
  CreditCard.find().then((cards) => {
    return res.send(cards);  
  }).catch((err)=> {
    console.log(err);
  });
});

router.get('/recommend', auth, (req, res) => {
  getAllCards().then((cards) => {
    for (let card of cards){
      createRewardsMap(card);
    }
    return Promise.all([getPurchases(req.userId), cards]);
  }).then((data) => {
    let cards = data[1];
    for(let card of cards) calculateRewards(card, data[0]);
    res.send(cards.sort((cardA, cardB) => cardB.total - cardA.total));
  });
});

module.exports = router;