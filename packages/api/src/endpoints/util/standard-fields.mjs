import { version } from '../../util/index.mjs';

export const addUpdatedFields = (entity) => ({
  ...entity,
  lastUpdated: Date.now(),
  version,
});

export const addCreatedFields = (entity) => {
  const updated = addUpdatedFields(entity);
  updated.created = updated.lastUpdated;
  return updated;
};
