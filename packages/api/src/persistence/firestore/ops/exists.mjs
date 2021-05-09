import { generateDocRef as generateDocumentReference } from '../generate/index.mjs';

import assertNotAtomic from './assert-not-atomic.mjs';

export default ({ collections, db }) => async (ids) => {
  assertNotAtomic('count', db);
  const documentReference = generateDocumentReference({ collections, db, ids });
  const snapshot = await documentReference.get();
  return snapshot.exists;
};
