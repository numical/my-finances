const { generateSearchQuery } = require('../generate');

module.exports = ({ collections, db }) => async ({ parentIds, criteria }) => {
  const query = generateSearchQuery({
    collections,
    criteria,
    db,
    parentIds,
  });
  const querySnapshot = await query.get();
  return querySnapshot.size;
};
