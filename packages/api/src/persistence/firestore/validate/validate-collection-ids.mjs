import validateId from './validate-id.mjs';

export default (collections, ids) => {
  if (collections.length !== ids.length) {
    throw new Error(
      `datastore expects number of ids [${ids.join(
        ','
      )}] to equal collections [${collections.join(',')}]`
    );
  }
  // eslint-disable-next-line unicorn/no-array-for-each
  ids.forEach(validateId);
};
