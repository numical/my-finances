const { generateDocRef } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

module.exports = ({ collections, db }) => async (ids) => {
  assertNotAtomic('count', db);
  const documentReference = generateDocRef({ collections, db, ids });
  const snapshot = await documentReference.get();
  return snapshot.exists;
};
