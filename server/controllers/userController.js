const express = require('express');
const { auth } = require('../middleware/auth');
const { User } = require('../db/models/user');
var router = express.Router();


router.get('/accounts', auth, (req, res) => {
  User.findById(req.userId).then((user) => {
    let accountsPerBank = mapBanksToAccounts(user);
    return res.status(200).send(accountsPerBank);
  }).catch((err) => {
    return res.status(400).send(err);
  });
});


module.exports = router;

function mapBanksToAccounts(user) {
  throw new Error('Ooops');
  return user.items.reduce((obj, item) => {
    obj[item.institution_name] = item.accounts;
    return obj;
  }, {});
}