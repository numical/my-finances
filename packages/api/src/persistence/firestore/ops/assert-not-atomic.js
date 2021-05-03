module.exports = (op, database) => {
  if (database.atomic) {
    throw new Error(`'${op}' not supported within atomic operation.`);
  }
};
