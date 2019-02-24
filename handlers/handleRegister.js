const { addCat } = require('../db/helpers');

module.exports = (req, res) => {
  const { name, username, password } = req.body;
  if (!name) {
    return res.status(400).send('Missing name');
  }
  // TODO: what is invalid username?
  if (password.length < 8) {
    return res.status(400).send('Password is less than 8 characters');
  }
  return addCat(req.body)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};
