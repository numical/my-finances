const DUMMY_ID = 'TwentyCharDBIDFormat';

module.exports = ({ collection, db, transformToDoc }) => async (record) => {
  const document = transformToDoc({ ...record, id: DUMMY_ID });
  // special case as id auto generated
  delete document.id;
  const collectionRef = db.collection(collection);
  const docRef = await collectionRef.add(document);
  record.id = docRef.id;
  return record;
};
