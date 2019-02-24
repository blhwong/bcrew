const { getCats } = require('../db/helpers');

module.exports = (req, res) => {
  return getCats({ ...req.query, orderByLastSeen: true })
    .then(([results]) => {
      return res.json(results.map(cat => ({
        birthdate: cat.birthdate,
        username: cat.username,
        imageUrl: cat.imageUrl,
        name: cat.name,
      })));
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
};
