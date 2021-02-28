const { isObject } = require('../../../util');

module.exports = async (validate, db, collection, values) => {
  if (isObject(values)) {
    const collectionRef = db.collection(collection);
    const query = Object.entries(values).reduce(
      (query, [field, value]) => query.where(field, '==', value),
      collectionRef
    );
    const querySnapshot = query.get();
    return querySnapshot.size;
  } else {
    const docRef = db.doc(`${collection}/${value}`);
    const docSnapshot = await docRef.get();
    return docSnapshot.exists ? 1 : 0;
  }
};
