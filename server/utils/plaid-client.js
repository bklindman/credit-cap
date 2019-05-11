const plaid = require('plaid');
var client_id = process.env["CLIENT_ID"];
var plaid_secret = process.env["PLAID_SECRET"];
var plaid_public = process.env["PLAID_PUBLIC"];


var client = new plaid.Client(
  client_id,
  plaid_secret,
  plaid_public,
  plaid.environments.sandbox
);

module.exports = {
  client
}
