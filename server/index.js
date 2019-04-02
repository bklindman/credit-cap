const express = require('express');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const path = require('path');

var auth = require('./controllers/authController');

const port = process.env.PORT;



var app = express();


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {
  app
}