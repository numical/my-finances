const { generateDocRef } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

module.exports = ({ collections, db }) => async (ids) => {
  assertNotAtomic('count', db);
  const docRef = generateDocRef({ collections, db, ids });
  const snapshot = await docRef.get();
  return snapshot.exists;
};
