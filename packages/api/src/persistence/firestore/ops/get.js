const { isObject } = require('../../../util');

module.exports = ({ collection, db, transformFromDoc }) => async (id) => {
  if (isObject(id)) {
    throw new Error(
      `datastore get expects a primitive, not an object ${JSON.stringify(id)}`
    );
  }
  const docRef = db.doc(`${collection}/${id}`);
  const snapshot = await docRef.get();
  if (snapshot.exists) {
    const document = snapshot.data();
    const record = transformFromDoc(document);
  } else {
    return null;
  }
};
