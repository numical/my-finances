import version from '../../util/index.mjs';

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
export { addCreatedFields };
export { addUpdatedFields };
export default {
  addCreatedFields,
  addUpdatedFields,
};
