const { generateDocRef } = require('../generate');

module.exports = ({ collections, db, validate }) => async ({ entity, ids }) => {
  // no validation as different fields can be updated
  const docRef = generateDocRef({ collections, db, ids });
  if (db.atomic) {
    db.atomic.update(docRef, entity);
  } else {
    await docRef.update(entity);
  }
  return entity;
};
