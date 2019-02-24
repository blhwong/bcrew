global.Promise = require('bluebird');
require('dotenv').config();
require('./db');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});
