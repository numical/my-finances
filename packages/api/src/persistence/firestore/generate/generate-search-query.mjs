import generateCollectionReference from './generate-parent-collection-reference.mjs';

export default ({ collections, criteria, db, parentIds }) => {
  const query = parentIds
    ? generateCollectionReference({ collections, db, parentIds })
    : db.collectionGroup(collections[collections.length - 1]);
  return criteria
    ? Object.entries(criteria).reduce(
        (query, [field, value]) => query.where(field, '==', value),
        query
      )
    : query;
};
