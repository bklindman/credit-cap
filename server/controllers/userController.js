const express = require('express');
const { auth } = require('../middleware/auth');
const { User } = require('../db/models/user');
const { getPurchases, mapBanksToAccounts, getCategoryProportions } = require('../utils/user-util');

var router = express.Router();

router.get('/accounts', auth, (req, res) => {
  User.findById(req.userId).then((user) => {
    let accountsPerBank = mapBanksToAccounts(user);
    return res.status(200).send(accountsPerBank);
  }).catch((err) => {
    return res.status(400).send(err);
  });
});

router.get('/expenses/categories', auth, (req, res) => {
  getPurchases(req.userId).then((purchases)=> {
    return getCategoryProportions(purchases);
  }).then((proportions) => {
    res.send(proportions);
  });
});

module.exports = router;
