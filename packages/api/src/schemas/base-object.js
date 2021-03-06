const BASE = {
  type: 'object',
  allRequired: true,
};

module.exports = id => {
  const obj = { ...BASE };
  if (id) {
    obj.metadata = {
      id,
    };
  }
  return obj;
};