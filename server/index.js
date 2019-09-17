const express = require('express');
const cookieParser = require('cookie-parser');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');

var auth = require('./controllers/authController');
var link_handler = require('./controllers/plaidController');
var userRoute = require('./controllers/userController');
var cardRoute = require('./controllers/cardController');

const port = process.env.PORT;



var app = express();

app.set('json spaces', 2);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.use('/api/auth', auth);
app.use('/api/plaid', link_handler);
app.use('/api/user', userRoute);
app.use('/api/cards', cardRoute);


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {
  app
}