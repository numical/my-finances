const { isObject } = require('../../../util');

module.exports = async (validate, db, collection, id) => {
  if (isObject(id)) {
    throw new Error(`datastore get expects a primitive, not an object ${JSON.stringify(id)}`);
  }
  const docRef = db.doc(`${collection}/${id}`);
  const snapshot = await docRef.get();
  if (snapshot.exists) {
    const record = snapshot.data();
    return validate('getById', record);
  } else {
    return null;
  }
};
