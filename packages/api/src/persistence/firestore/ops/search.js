module.exports = ({
  collection,
  db,
  transformFromDoc,
  transformSearchField,
}) => {
  const read = (docSnapshot) => {
    const document = { ...docSnapshot.data(), id: docSnapshot.id };
    return transformFromDoc(document);
  };

  return async (values) => {
    const collectionRef = db.collection(collection);
    const query = Object.entries(values)
      .map(transformSearchField)
      .reduce(
        (query, [field, value]) => query.where(field, '==', value),
        collectionRef
      );
    const querySnapshot = await query.get();
    return querySnapshot.size === 0 ? 0 : querySnapshot.docs.map(read);
  };
};
