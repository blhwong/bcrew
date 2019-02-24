const { getCats } = require('../db/helpers');

module.exports = (req, res) => {
  const options = {
    random: true,
    limit: 1,
  };
  return getCats({ options })
    .then(([results]) => {
      if (!results || !results[0]) {
        return res.sendStatus(404);
      }
      return res.json({
        imageUrl: results[0].imageUrl,
        name: results[0].name,
        breed: results[0].breed,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.sendStatus(500);
    });
};
