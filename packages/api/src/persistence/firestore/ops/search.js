const { generateSearchQuery } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

const noOp = (d) => d;

module.exports = ({ collections, db, validate }) => {
  assertNotAtomic('count', db);
  const read = (documentSnapshot) => {
    const entity = { ...documentSnapshot.data(), id: documentSnapshot.id };
    return validate(entity);
  };

  return async ({ criteria, hydrateResults = true, parentIds }) => {
    const query = generateSearchQuery({
      collections,
      criteria,
      db,
      parentIds,
    });
    const querySnapshot = await query.get();
    const mapFunction = hydrateResults ? read : noOp;
    return querySnapshot.size === 0
      ? undefined
      : querySnapshot.docs.map(mapFunction);
  };
};
