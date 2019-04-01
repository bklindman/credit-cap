const express = require('express');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');

var auth = require('./controllers/authController');

const port = process.env.PORT;



var app = express();


app.use(bodyParser.json());


app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Coming soon');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = {
  app
}