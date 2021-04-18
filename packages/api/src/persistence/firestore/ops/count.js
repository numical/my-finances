const { generateSearchQuery } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

module.exports = ({ collections, db }) => async ({ parentIds, criteria }) => {
  assertNotAtomic('count', db);
  const query = generateSearchQuery({
    collections,
    criteria,
    db,
    parentIds,
  });
  const querySnapshot = await query.get();
  return querySnapshot.size;
};
