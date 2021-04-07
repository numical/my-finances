const generateCollectionRef = require('./generate-parent-collection-reference');

module.exports = ({ collections, criteria, db, parentIds }) => {
  const query = parentIds
    ? generateCollectionRef({ collections, db, parentIds })
    : db.collectionGroup(collections[collections.length - 1]);
  return criteria
    ? Object.entries(criteria).reduce(
        (query, [field, value]) => query.where(field, '==', value),
        query
      )
    : query;
};
