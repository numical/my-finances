module.exports = async (validate, db, collection, record) => {
  validate('pre-create', { ...record, id: 'pre-creation dummy id' });
  const collectionRef = db.collection(collection);
  const docRef = await collectionRef.create(record);
  record.id = docRef.id;
  return record;
};
