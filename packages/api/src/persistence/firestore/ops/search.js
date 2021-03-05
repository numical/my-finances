module.exports = async (
  { collection, db, transformFromDoc, transformSearchField, validate },
  values,
) => {
  const collectionRef = db.collection(collection);
  const query = Object.entries(values)
    .map(transformSearchField)
    .reduce(
      (query, [field, value]) => query.where(field, '==', value),
      collectionRef,
    );
  const querySnapshot = await query.get();
  switch (querySnapshot.size) {
    case 0:
      return [];
    case 1:
      const snapshot = querySnapshot.documents[0];
      const document = snapshot.data();
      const record = transformFromDoc(document);
      return validate('search', [record]);
    default:
      const read = async (snapshot) => {
        const document = await snapshot.data();
        return transformFromDoc(document);
      };
      const records = await Promise.all(querySnapshot.docs.map(read));
      return validate('search', records);
  }
};
