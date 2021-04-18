module.exports = (op, db) => {
  if (db.atomic) {
    throw new Error(`'${op}' not supported within atomic operation.`);
  }
};
