const generateDocumentReference = require('./generate-document-reference');
const generateParentCollectionReference = require('./generate-parent-collection-reference');
const generateSearchQuery = require('./generate-search-query');
module.exports = {
  generateDocRef: generateDocumentReference,
  generateParentCollectionRef: generateParentCollectionReference,
  generateSearchQuery,
};
