const { generateDocRef } = require('../generate');

const allowPartialDocument = true;

module.exports = ({ collections, db, validate }) => async ({ entity, ids }) => {
  validate(entity, allowPartialDocument);
  const documentReference = generateDocRef({ collections, db, ids });
  if (db.atomic) {
    db.atomic.update(documentReference, entity);
  } else {
    await documentReference.update(entity);
  }
  return entity;
};
