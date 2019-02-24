const db = require('./index');

module.exports = ({
  username,
  name,
  id,
  orderByLastSeen,
}) => {
  const replacements = {};
  const filters = [];
  let order = '';

  if (username) {
    replacements.username = username;
    filters.push('username=:username');
  }

  if (name) {
    replacements.name = name;
    filters.push('name=:name');
  }

  if (id) {
    replacements.id = id;
    filters.push('id=:id');
  }

  if (orderByLastSeen) {
    order = 'ORDER BY lastSeenAt desc';
  }

  const query = `
    SELECT * FROM cats WHERE ${filters.join(' AND ')} ${order};
  `;
  return db.queryAsync(query, replacements);
};
