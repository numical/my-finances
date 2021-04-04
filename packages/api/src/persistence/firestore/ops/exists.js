const { generateDocRef } = require('../generate');

module.exports = ({ collections, db }) => async (ids) => {
  const docRef = generateDocRef({ collections, db, ids });
  const snapshot = await docRef.get();
  return snapshot.exists;
};
