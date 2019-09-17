const { client } = require('../utils/plaid-client');

var { User } = require('../db/models/user');
var moment = require('moment');

// Get user purchases from Plaid API
function getPurchases(userId){
  // Ignore purchases in the following categories
  let nonPurchaseCategories = ['Bank Fees', 'Cash Advance' , 'Interest',  'Payment', 'Tax' ,'Transfer'];
  return User.findById(userId).then((user) => {
    var transactions = [];
    let promises = [];
    for (let item of user.items) {
      promises.push(client.getAllTransactions(item.access_token, '1970-01-01', moment().format('YYYY-MM-DD')).then((result) => {
        transactions = transactions.concat(result.filter((purchase) => {
          return !nonPurchaseCategories.includes(purchase.category[0]);
        }));
      }).catch((err) => {
        console.log(err);
      }));
    };
    return Promise.all(promises).then(() => { return transactions});
  });
}

// Map institution name to the user's bank accounts associated with that institution
function mapBanksToAccounts(user) {
  return user.items.map((item) => {
    return {
      name: item.institution_name, 
      accounts: item.accounts
    }
  });
}

// Create a Map where the key is a category and the value is the amount a user 
// has spent on that category over x time 
function getCategoryProportions(purchases){
  purchases = purchases.map((purchase) => [purchase.category[0], purchase.amount])
    .reduce((acc, val) => {
      val[0] in  acc ? acc[val[0]] += val[1] : acc[val[0]] = val[1];
      return acc;
    }, {});
  return Object.entries(purchases).map(([key, value])=> ({name: key, value}));
}


module.exports = {
  getPurchases,
  mapBanksToAccounts,
  getCategoryProportions
}