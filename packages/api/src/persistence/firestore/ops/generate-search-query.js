const generateCollectionRef = require('./generate-parent-collection-reference');

module.exports = ({
  collections,
  criteria,
  db,
  parentIds,
  transformSearchField,
}) => {
  const collectionRef = generateCollectionRef({ collections, db, parentIds });
  return Object.entries(criteria)
    .map(transformSearchField)
    .reduce(
      (query, [field, value]) => query.where(field, '==', value),
      collectionRef
    );
};
