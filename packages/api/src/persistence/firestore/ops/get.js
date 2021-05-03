const { generateDocRef } = require('../generate');
const assertNotAtomic = require('./assert-not-atomic');

module.exports = ({ collections, db, validate }) => async (ids) => {
  assertNotAtomic('count', db);
  const documentReference = generateDocRef({ collections, db, ids });
  const snapshot = await documentReference.get();
  if (snapshot.exists) {
    const entity = snapshot.data();
    entity.id = documentReference.id;
    return validate(entity);
  }
};
