module.exports = async (validate, db, collection, id) => {
  const docRef = db.doc(`${collection}/${id}`);
  const snapshot = await docRef.get();
  const record = snapshot.data();
  return validate('getById', record);
};
