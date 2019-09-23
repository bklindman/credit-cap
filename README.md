# CreditCap
[![Codeship Status for amauris-f/credit-cap](https://app.codeship.com/projects/a89d9100-33b3-0137-1cef-0217ed8d145d/status?branch=master)](https://app.codeship.com/projects/332454)
[![Maintainability](https://api.codeclimate.com/v1/badges/833cb958cdec82589434/maintainability)](https://codeclimate.com/github/amauris-f/credit-cap/maintainability)


CreditCap is a web app that aims to help users in finding their next rewards credit card. By using a user's purchase history data from their multiple accounts, CreditCap will recommend credit cards that are bound to give users the most points/cashback.

[View Demo](https://creditcap.herokuapp.com/ "CreditCap")

## How does it work?
CreditCap works with the Plaid API. Plaid is a financial technology platform that allows applications to retrieve a user's bank account information securely. Plaid is used by many apps, such as Venmo and Robinhood. CreditCap only retrieves a user's transaction history, and from that history only looks at a transaction's category (e.g., Travel, Restaurant) as well as the amount of that transaction. CreditCap never stores any transaction history information.


## Built With:
* Node.js with Express.js web framework
* Plaid API to retrieve transaction history
* MongoDB and Mongoose to store user credentials and credit cards
* Angular 7 with Angular Material for the frontend
* Mocha and Jest for testing
* Codeship and Heroku for CI/CD