const express = require('express');
const cookieParser = require('cookie-parser');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');

var auth = require('./controllers/authController');
var link_handler = require('./controllers/plaidController');
var userRoute = require('./controllers/userController');

const port = process.env.PORT;



var app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.use('/auth', auth);
app.use('/plaid', link_handler);
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {
  app
}