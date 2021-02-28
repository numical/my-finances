module.exports = async (validate, db, collection, values) => {
  const collectionRef = db.collection(collection);
  const query = Object.entries(values).reduce(
    (query, [field, value]) => query.where(field, '==', value),
    collectionRef
  );
  const querySnapshot = query.get();
  switch (querySnapshot.size) {
    case 0:
      return [];
    case 1:
      const snapshot = querySnapshot.documents[0];
      const record = snapshot.data();
      return validate('search', [record]);
    default:
      const records = querySnapshot.documents.map((snapshot) => snapshot.data());
      return validate('search', records);
  }
};
