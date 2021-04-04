const generateCollectionRef = require('./generate-parent-collection-reference');

module.exports = ({ collections, criteria, db, parentIds }) => {
  const collectionRef = generateCollectionRef({ collections, db, parentIds });
  return criteria
    ? Object.entries(criteria).reduce(
        (query, [field, value]) => query.where(field, '==', value),
        collectionRef
      )
    : collectionRef;
};
