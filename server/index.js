const express = require('express');

const config = require('./config/config');

const port = process.env.PORT;

var app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});