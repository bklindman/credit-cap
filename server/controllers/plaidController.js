const express = require('express');
const { client } = require('../utils/plaid-client');
const { User } = require('../db/models/user');
const { auth } = require('../middleware/auth');



var router = express.Router();


router.post('/get_access_token', auth, (req, res) => {
  getTokenResponse(req.body.public_token).then((tokRes) => {
    return storeBankInfo(req.userId, tokRes.item_id, tokRes.access_token, req.body.metadata).then(() => {
      res.status(200).send();
    });
  })
  .catch((e) => {
    return res.status(400).send(e);
  });
});

module.exports = router;


function storeBankInfo(userId, item_id, access_token, metadata) {
  return new Promise((resolve, reject) => {
    User.findById(userId).then((user) => {
      user.items.push(createItem(item_id, access_token, metadata));
      user.linked = true;
      user.save((err) => { if (err) reject(err)});
      resolve();
    }).catch((e) => { 
      reject(e);
    });
  });
}

function createItem(item_id, access_token, metadata){
  let item = {item_id, access_token, institution_name: metadata.institution.name}
  item.accounts = metadata.accounts.filter((account) => {
    return ['depository', 'credit'].includes(account.type)
  }).map(account => account.name);
  return item;
}

function getTokenResponse(public_token) {
  return new Promise((resolve, reject) => {
    client.exchangePublicToken(public_token, (err, tokenResponse) => {
      if (err) reject('Could not exchange public token');
      resolve(tokenResponse);
    });
  });
}