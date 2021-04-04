const { generateDocRef } = require('../generate');

module.exports = ({ collections, db, validate }) => async ({ entity, ids }) => {
  validate(entity);
  const docRef = generateDocRef({ collections, db, ids });
  await docRef.update(entity);
  return entity;
};
