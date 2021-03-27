module.exports = ({ collection, db, transformToDoc }) => async (id, record) => {
  const document = transformToDoc(record);
  const docRef = db.doc(`${collection}/${id}`);
  await docRef.update(record);
  return record;
};
