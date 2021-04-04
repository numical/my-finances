const { generateParentCollectionRef } = require('../generate');

const DUMMY_ID = 'TwentyCharDBIDFormat';

module.exports = ({ collections, db, validate }) => async ({
  entity,
  parentIds,
}) => {
  // special case as id auto generated
  validate({ ...entity, id: DUMMY_ID });
  const collectionRef = generateParentCollectionRef({
    collections,
    db,
    parentIds,
  });
  const docRef = await collectionRef.add(entity);
  entity.id = docRef.id;
  return entity;
};
