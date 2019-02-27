global.Promise = require('bluebird');
const bcrypt = require('bcrypt');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { getCats, setLastSeen } = require('../db/helpers');

const buildToken = ({ id, name, username }) => (
  jwt.signAsync({ id, name, username }, process.env.JWT_SECRET, { expiresIn: '24h' })
);

module.exports = (req, res) => {
  const { username, password } = req.body;
  return getCats({ username })
    .then(([results]) => {
      if (results.length === 0) {
        return res.sendStatus(401);
      }
      const user = results[0];
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return res.sendStatus(401);
          }
          return Promise.all([
            buildToken(user),
            setLastSeen({ id: user.id }),
          ])
            .spread(authToken => res.json({ authToken }));
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    })
    .catch(() => res.sendStatus(500));
};
