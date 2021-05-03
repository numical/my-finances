const { validateCollectionParentIds } = require('../validate');
module.exports = ({ collections, db, parentIds }) => {
  validateCollectionParentIds({ collections, parentIds });
  return parentIds
    ? collections
        .slice(1)
        .reduce(
          (collectionReference, collection, index) =>
            collectionReference.doc(parentIds[index]).collection(collection),
          db.collection(collections[0])
        )
    : db.collection(collections[0]);
};
