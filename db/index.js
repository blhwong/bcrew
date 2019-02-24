const mysql = require('mysql');

const connection = mysql.createConnection(process.env.DB);

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
