import { generateDocRef as generateDocumentReference } from '../generate/index.mjs';

const allowPartialDocument = true;
export default ({ collections, db, validate }) => async ({ entity, ids }) => {
  validate(entity, allowPartialDocument);
  const documentReference = generateDocumentReference({ collections, db, ids });
  if (db.atomic) {
    db.atomic.update(documentReference, entity);
  } else {
    await documentReference.update(entity);
  }
  return entity;
};
