const { isObject } = require('../../../util');

module.exports = async ({ collection, db, transformFromDoc, validate }, id) => {
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
    return validate('getById', record);
  } else {
    return null;
  }
};
