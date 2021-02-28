module.exports = async (validate, db, collection, id, record) => {
  validate('pre-update', record);
  const docRef = db.doc(`${collection}/${id}`);
  await docRef.update(record);
  return record;
};
