import { object } from '../../../util/index.mjs';

const { isObject } = object;
export default (id) => {
  if (isObject(id)) {
    throw new Error(
      `datastore expects an id to be a primitive, not an object ${JSON.stringify(
        id
      )}`
    );
  }
};
