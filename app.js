const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const {
  handleRegister,
  handleLogin,
  handleCats,
  handleRandom,
} = require('./handlers');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cat/register', handleRegister);
app.post('/cat/login', handleLogin);

app.get('/cats', jwtMiddleware({ secret: process.env.JWT_SECRET }), handleCats);
app.get('/cats/random', handleRandom);

app.get('*', (req, res) => {
  res.send('Hello world!');
});

module.exports = app;
