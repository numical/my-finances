import { generateDocRef as generateDocumentReference } from '../generate/index.mjs';

import assertNotAtomic from './assert-not-atomic.mjs';

export default ({ collections, db, validate }) => async (ids) => {
  assertNotAtomic('count', db);
  const documentReference = generateDocumentReference({ collections, db, ids });
  const snapshot = await documentReference.get();
  if (snapshot.exists) {
    const entity = snapshot.data();
    entity.id = documentReference.id;
    return validate(entity);
  }
};
