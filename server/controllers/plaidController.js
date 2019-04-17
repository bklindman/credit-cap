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
  var PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, (err, tokRes) => {
    if(err){
      console.log('Could not exchange public token');
      return res.status(400).send({error: err.message});
    }
    var ACCESS_TOKEN = tokRes.access_token;
    var ITEM_ID = tokRes.item_id;
    User.findById(req.userId).then((user) => {
      user.items.push({item_id: ITEM_ID, access_token: ACCESS_TOKEN});
      user.save((err) => {if(err)console.log(err)});
    }).catch((e) =>{
      console.log(e);
      return res.status(400).send();
    });
    return res.status(200).send();
  });
});

module.exports = router;
