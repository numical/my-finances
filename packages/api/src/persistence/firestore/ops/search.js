const generateSearchQuey = require('./generate-search-query');

module.exports = ({
  collections,
  db,
  transformFromDoc,
  transformSearchField,
}) => {
  const read = (docSnapshot) => {
    const document = { ...docSnapshot.data(), id: docSnapshot.id };
    return transformFromDoc(document);
  };

  return async ({ parentIds, criteria }) => {
    const query = generateSearchQuey({
      collections,
      criteria,
      db,
      parentIds,
      transformSearchField,
    });
    const querySnapshot = await query.get();
    return querySnapshot.size === 0 ? null : querySnapshot.docs.map(read);
  };
};
