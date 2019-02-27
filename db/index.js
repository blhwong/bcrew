global.Promise = require('bluebird');
const mysql = require('mysql');

let connection = mysql.createConnection(process.env.DB);

const handleDisconnect = (client) => {
  client.on('error', (err) => {
    if (!err.fatal) {
      return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.error('> Reconnecting lost MySQL connection: ', err.stack);

    connection = mysql.createConnection(process.env.DB);
    handleDisconnect(connection);
    connection.connect();
  });
};

handleDisconnect(connection);

connection.config.queryFormat = function queryFormat(query, values) {
  if (!values) return query;
  return query.replace(/:(\w+)/g, (txt, key) => {
    if (values[key] !== undefined) {
      return this.escape(values[key]);
    }
    return txt;
  });
};

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = db;
