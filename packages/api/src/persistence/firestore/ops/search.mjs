import { generateSearchQuery } from '../generate/index.mjs';

import assertNotAtomic from './assert-not-atomic.mjs';

const noOp = (d) => d;
export default ({ collections, db, validate }) => {
  assertNotAtomic('count', db);
  const read = (documentSnapshot) => {
    const entity = { ...documentSnapshot.data(), id: documentSnapshot.id };
    return validate(entity);
  };
  return async ({ criteria, hydrateResults = true, parentIds }) => {
    const query = generateSearchQuery({
      collections,
      criteria,
      db,
      parentIds,
    });
    const querySnapshot = await query.get();
    const mapFunction = hydrateResults ? read : noOp;
    return querySnapshot.size === 0 ? [] : querySnapshot.docs.map(mapFunction);
  };
};
