const db = require('./index');

module.exports = (replacements) => {
  console.log({ replacements });
  const query = `
    SELECT * FROM cats WHERE username=:username;
  `;
  return db.queryAsync(query, replacements);
};
