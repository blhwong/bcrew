const { getCats } = require('../db/helpers');

module.exports = (req, res) => {
  const options = {
    orderByLastSeen: true,
  };
  return getCats({ ...req.query, options })
    .then(([results]) => {
      if (!results || !results[0]) {
        return res.sendStatus(404);
      }
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
