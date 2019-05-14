const express = require('express');
const { auth } = require('../middleware/auth');
const { User } = require('../db/models/user');
const { CreditCard } = require('../db/models/credit_card');
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
  getPurchases(req.userId, getCategoryProportions).then((proportions)=> {
    return res.send(proportions);
  });
});

router.get('/recommend', auth, (req, res) => {
  getPurchases(req.userId, getCards).then((cards) => {
    return res.send(cards);
  });
});

function getPurchases(userId, callback){
  let nonPurchaseCategories = ['Bank Fees', 'Cash Advance' , 'Interest',  'Payment', 'Tax' ,'Transfer'];
  return User.findById(userId).then((user) => {
    var transactions = [];
    let promises = [];
    for (let item of user.items) {
      promises.push(client.getAllTransactions(item.access_token, '1970-01-01', moment().format('YYYY-MM-DD')).then((result) => {
        transactions = transactions.concat(result.filter((purchase) => {
          return !nonPurchaseCategories.includes(purchase.category[0])
        }));
      }).catch((err) => {
        console.log(err);
      }));
    };
    return Promise.all(promises).then(() => { return callback(transactions)});
  });
}

function getCategoryProportions(purchases){
  purchases = purchases.map((purchase) => [purchase.category[0], purchase.amount])
    .reduce((acc, val) => {
      val[0] in  acc ? acc[val[0]] += val[1] : acc[val[0]] = val[1];
      return acc;
    }, {});
  return Object.entries(purchases).map(([key, value])=> ({name: key, value}));
}

