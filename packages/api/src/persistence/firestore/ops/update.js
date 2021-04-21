const { generateDocRef } = require('../generate');

const allowPartialDoc = true;

module.exports = ({ collections, db, validate }) => async ({ entity, ids }) => {
  validate(entity, allowPartialDoc);
  const docRef = generateDocRef({ collections, db, ids });
  if (db.atomic) {
    db.atomic.update(docRef, entity);
  } else {
    await docRef.update(entity);
  }
  return entity;
};
