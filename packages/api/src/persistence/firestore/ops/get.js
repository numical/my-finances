const { generateDocRef } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

module.exports = ({ collections, db, validate }) => async (ids) => {
  assertNotAtomic('count', db);
  const docRef = generateDocRef({ collections, db, ids });
  const snapshot = await docRef.get();
  if (snapshot.exists) {
    const entity = snapshot.data();
    entity.id = docRef.id;
    return validate(entity);
  } else {
    return null;
  }
};
