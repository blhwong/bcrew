const db = require('./index');

module.exports = (replacements) => {
  const query = `
    UPDATE cats SET lastSeenAt=now() WHERE id=:id;
  `;
  return db.beginTransactionAsync()
    .then(() => db.queryAsync(query, replacements))
    .then((results) => {
      console.log(results);
    })
    .then(() => db.commitAsync())
    .catch((error) => {
      return db.rollbackAsync()
        .then(() => {
          return Promise.reject(error);
        });
    });
};
