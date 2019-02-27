const db = require('./index');

module.exports = (replacements) => {
  const query = `
    UPDATE cats SET lastSeenAt=now() WHERE id=:id;
  `;
  return db.beginTransactionAsync()
    .then(() => db.queryAsync(query, replacements))
    .then(() => db.commitAsync())
    .catch(error => db.rollbackAsync()
      .then(() => Promise.reject(error)));
};
