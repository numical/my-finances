const { generateDocRef } = require('../generate');

module.exports = ({ collections, db }) => async ({ ids }) => {
  const documentReference = generateDocRef({ collections, db, ids });
  if (db.atomic) {
    db.atomic.delete(documentReference);
  } else {
    await documentReference.delete();
  }
};
