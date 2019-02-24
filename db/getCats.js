const db = require('./index');

module.exports = ({
  username,
  name,
  id,
  options = {},
}) => {
  const replacements = {};
  const filters = [];
  let order = '';
  let limit = '';

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

  if (options.orderByLastSeen) {
    order = 'ORDER BY lastSeenAt desc';
  } else if (options.random) {
    order = 'ORDER BY rand()';
  }

  if (options.limit) {
    limit = `LIMIT ${options.limit}`;
  }

  const joined = filters.join(' AND ');
  const filterQuery = joined ? ` WHERE ${joined}` : '';

  const query = `
    SELECT * FROM cats ${filterQuery} ${order} ${limit};
  `;
  return db.queryAsync(query, replacements);
};
