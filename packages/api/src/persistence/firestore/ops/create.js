const generateCollectionRef = require('./generate-parent-collection-reference');

const DUMMY_ID = 'TwentyCharDBIDFormat';

module.exports = ({ collections, db, transformToDoc }) => async ({
  entity,
  parentIds,
}) => {
  // special case as id auto generated
  const document = transformToDoc({ ...entity, id: DUMMY_ID });
  delete document.id;

  const collectionRef = generateCollectionRef({ collections, db, parentIds });
  const docRef = await collectionRef.add(document);
  entity.id = docRef.id;
  return entity;
};
