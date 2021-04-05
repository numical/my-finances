const { generateParentCollectionRef } = require('../generate');

const DUMMY_ID = 'TwentyCharDBIDFormat';

module.exports = ({ collections, db, validate }) => async ({
  entity,
  parentIds,
}) => {
  if (entity.id) {
    validate(entity);
  } else {
    // if id to be auto generated...
    validate({ ...entity, id: DUMMY_ID });
  }
  const collectionRef = generateParentCollectionRef({
    collections,
    db,
    parentIds,
  });
  if (entity.id) {
    await collectionRef.doc(entity.id).set(entity);
  } else {
    const docRef = await collectionRef.add(entity);
    entity.id = docRef.id;
  }
  return entity;
};
