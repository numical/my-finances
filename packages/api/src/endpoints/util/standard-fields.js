const { version } = require('../../../package.json');

const addUpdatedFields = (entity) => ({
  ...entity,
  lastUpdated: Date.now(),
  version,
});

const addCreatedFields = (entity) => {
  const updated = addUpdatedFields(entity);
  updated.created = updated.lastUpdated;
  return updated;
};

module.exports = {
  addCreatedFields,
  addUpdatedFields,
};
