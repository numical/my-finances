const { generateSearchQuery } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

const noOp = (d) => d;

module.exports = ({ collections, db, validate }) => {
  assertNotAtomic('count', db);
  const read = (docSnapshot) => {
    const entity = { ...docSnapshot.data(), id: docSnapshot.id };
    return validate(entity);
  };

  return async ({ parentIds, criteria, hydrateResults = true }) => {
    const query = generateSearchQuery({
      collections,
      criteria,
      db,
      parentIds,
    });
    const querySnapshot = await query.get();
    const mapFn = hydrateResults ? read : noOp;
    return querySnapshot.size === 0 ? null : querySnapshot.docs.map(mapFn);
  };
};
