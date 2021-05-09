import { generateParentCollectionRef as generateParentCollectionReference } from '../generate/index.mjs';

import assertNotAtomic from './assert-not-atomic.mjs';

const DUMMY_ID = 'TwentyCharDBIDFormat';
export default ({ collections, db, validate }) => async ({
  entity,
  parentIds,
}) => {
  assertNotAtomic('count', db);
  if (entity.id) {
    validate(entity);
  } else {
    // if id to be auto generated...
    validate({ ...entity, id: DUMMY_ID });
  }
  const collectionReference = generateParentCollectionReference({
    collections,
    db,
    parentIds,
  });
  if (entity.id) {
    await collectionReference.doc(entity.id).set(entity);
  } else {
    const documentReference = await collectionReference.add(entity);
    entity.id = documentReference.id;
  }
  return entity;
};
