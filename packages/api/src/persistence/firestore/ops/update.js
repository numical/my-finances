module.exports = async (
  { collection, db, transformToDoc, validate },
  id,
  record
) => {
  const document = transformToDoc(record);
  validate('pre-update', document);
  const docRef = db.doc(`${collection}/${id}`);
  await docRef.update(record);
  return record;
};
