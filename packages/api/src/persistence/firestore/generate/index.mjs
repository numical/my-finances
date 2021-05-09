import generateDocumentReference from './generate-document-reference.mjs';
import generateParentCollectionReference from './generate-parent-collection-reference.mjs';
import generateSearchQuery from './generate-search-query.mjs';

export { generateDocumentReference as generateDocRef };
export { generateParentCollectionReference as generateParentCollectionRef };
export { generateSearchQuery };
export default {
  generateDocRef: generateDocumentReference,
  generateParentCollectionRef: generateParentCollectionReference,
  generateSearchQuery,
};
