const express = require('express');
const plaid = require('plaid');

const { User } = require('../db/models/user');
const { auth } = require('../middleware/auth');



var router = express.Router();

var client_id = process.env["CLIENT_ID"];
var plaid_secret = process.env["PLAID_SECRET"];
var plaid_public = process.env["PLAID_PUBLIC"];


var client = new plaid.Client(
  client_id,
  plaid_secret,
  plaid_public,
  plaid.environments.sandbox
);


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
    ['depository', 'credit'].includes(account.type)
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