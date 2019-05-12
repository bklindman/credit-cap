const express = require('express');
const { auth } = require('../middleware/auth');
const { User } = require('../db/models/user');
var router = express.Router();
const moment = require('moment');
const { client } = require('../utils/plaid-client');


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
  return user.items.map((item) => {
    return {
      name: item.institution_name, 
      accounts: item.accounts
    }
  });
}

router.get('/expenses/categories', auth, (req, res) => {
  User.findById(req.userId).then((user) => {
    var transactions = [];
    let promises = [];
    for (let item of user.items) {
      promises.push(client.getAllTransactions(item.access_token, '1970-01-01', moment().format('YYYY-MM-DD')).then((result) => {
        transactions = transactions.concat(result);
      }).catch((err) => {
        console.log(err);
      }));
    };
    Promise.all(promises).then(()=> {return transactions}).then((transactions) => {
      transactions = transactions.filter((transaction) => {
        return !['Bank Fees', 'Cash Advance' , 'Interest',  'Payment', 'Tax' ,'Transfer'].includes(transaction.category[0])
      }).map((transaction) => [transaction.category[0], transaction.amount])
        .reduce((acc, val) => {
          val[0] in  acc ? acc[val[0]] += val[1] : acc[val[0]] = val[1];
          return acc;
        }, {});
      return res.send(Object.entries(transactions).map(([key, value])=> ({name: key, value})));
    });
  });
});