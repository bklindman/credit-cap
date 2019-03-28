const express = require('express');

const config = require('./config/config');
const {mongoose} = require('./db/mongoose');
const port = process.env.PORT;

var app = express();


app.get('/', (req, res) => {
  res.send('Coming soon');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});