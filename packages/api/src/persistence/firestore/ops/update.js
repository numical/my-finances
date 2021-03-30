const generateDocRef = require('./generate-document-reference');

module.exports = ({ collections, db, transformToDoc }) => async ({
  entity,
  ids,
}) => {
  const docRef = generateDocRef({ collections, db, ids });
  const document = transformToDoc(entity);
  await docRef.update(document);
  return entity;
};
