import { generateDocRef as generateDocumentReference } from '../generate/index.mjs';

export default ({ collections, db }) => async ({ ids }) => {
  const documentReference = generateDocumentReference({ collections, db, ids });
  if (db.atomic) {
    db.atomic.delete(documentReference);
  } else {
    await documentReference.delete();
  }
};
