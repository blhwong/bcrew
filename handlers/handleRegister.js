const { addCat } = require('../db/helpers');

module.exports = (req, res) => {
  const {
    name,
    username,
    password,
    weight,
    birthdate = null,
    breed = null,
    imageUrl = null,
  } = req.body;
  if (!name) {
    return res.status(400).send('Missing name');
  }
  if (!username) {
    return res.status(400).send('Missing username');
  }
  if (!weight) {
    return res.status(400).send('Missing weight');
  }
  if (password.length < 8) {
    return res.status(400).send('Password is less than 8 characters');
  }
  return addCat({
    name,
    username,
    password,
    weight,
    birthdate,
    breed,
    imageUrl,
  })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
};
