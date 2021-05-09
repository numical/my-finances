import { generateSearchQuery } from '../generate/index.mjs';

import assertNotAtomic from './assert-not-atomic.mjs';

export default ({ collections, db }) => async ({ criteria, parentIds }) => {
  assertNotAtomic('count', db);
  const query = generateSearchQuery({
    collections,
    criteria,
    db,
    parentIds,
  });
  const querySnapshot = await query.get();
  return querySnapshot.size;
};
