const { generateDocRef } = require('../generate');

module.exports = ({ collections, db }) => async ({ ids }) => {
  const docRef = generateDocRef({ collections, db, ids });
  if (db.atomic) {
    db.atomic.delete(docRef);
  } else {
    await docRef.delete();
  }
};
