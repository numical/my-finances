module.exports = async (
  { collection, db, transformToDoc, validate },
  record
) => {
  const document = transformToDoc({ ...record, id: 'pre-creation dummy id' });
  validate('pre-create', document );
  // special case as id auto generated
  delete document.id;
  const collectionRef = db.collection(collection);
  const docRef = await collectionRef.add(document);
  record.id = docRef.id;
  return record;
};
