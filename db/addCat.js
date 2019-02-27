const bcrypt = require('bcrypt');
const db = require('./index');

module.exports = ({ password, ...rest }) => {
  const query = `
    INSERT INTO cats (
      birthdate,
      breed,
      imageUrl,
      name,
      password,
      username,
      weight,
      lastSeenAt,
      addedAt
    )
    VALUES (
      :birthdate,
      :breed,
      :imageUrl,
      :name,
      :password,
      :username,
      :weight,
      :lastSeenAt,
      :addedAt
    );
  `;
  return bcrypt.genSalt()
    .then(salt => bcrypt.hash(password, salt))
    .then((hash) => {
      const now = new Date();
      const replacements = {
        ...rest,
        password: hash,
        lastSeenAt: now,
        addedAt: now,
      };
      return db.beginTransactionAsync()
        .then(() => db.queryAsync(query, replacements))
        .then(() => db.commitAsync())
        .catch(error => db.rollbackAsync()
          .then(() => Promise.reject(error)));
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
