import roles$0 from '../roles/index.mjs';

import createEnforceSchemaFunction from './create-enforce-schema-function.mjs';
import formats from './formats.mjs';
// eslint-disable-next-line no-unused-vars
const { allow, ...roles } = roles$0;
const NUMBER = { type: 'number' };
const STRING = { type: 'string' };
const OBJECT = { type: 'object' };
const ARRAY = { type: 'array' };
// for formats, see ./formats.js
const DBID = { ...STRING, format: 'dbid' };
const DICTIONARY = { ...OBJECT, additionalProperties: OBJECT };
const EMAIL = { ...STRING, format: 'email' };
const HASH = { ...STRING, format: 'hash' };
const ROLES = {
  ...ARRAY,
  uniqueItems: true,
  minItems: 1,
  items: { enum: Object.values(roles) },
};
const TIME = { ...NUMBER, minimum: 1607644800000, maximum: 2554329600000 };
const VERSION = { ...STRING, format: 'semver' };
const UUID = { ...STRING, format: 'uuid' };
const createSchema = ({ allRequired = true, id, properties }) => ({
  type: 'object',
  allRequired,
  metadata: {
    id,
  },
  properties,
});
const createEntitySchema = ({ id, properties }) =>
  createSchema({
    id,
    properties: {
      id: DBID,
      created: TIME,
      lastUpdated: TIME,
      version: VERSION,
      description: STRING,
      ...properties,
    },
  });
const partial = (schema) => ({
  ...schema,
  allRequired: false,
  metadata: {
    ...schema.metadata,
    id: `partial-${schema.metadata.id}`,
  },
});
const ACCOUNT = createEntitySchema({
  id: 'account',
  properties: {
    id: STRING, // note this overwrites DBID format to account for default 'personal' account
  },
});
const USER = createEntitySchema({
  id: 'user',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: HASH,
    accountId: STRING,
    roles: ROLES,
    models: DICTIONARY,
  },
});
const USER_DOC = createEntitySchema({
  id: 'user_doc',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: HASH,
    accountId: STRING,
    roles: ROLES,
  },
});
const MODEL = createEntitySchema({
  id: 'model',
  properties: {
    data: STRING,
  },
});
export { ACCOUNT };
export { createSchema };
export { createEntitySchema };
export { DBID };
export { DICTIONARY };
export { EMAIL };
export { formats };
export { HASH };
export { createEnforceSchemaFunction as init };
export { MODEL };
export { NUMBER };
export { partial };
export { ROLES };
export { STRING };
export { USER };
export { USER_DOC };
export { UUID };
export default {
  ACCOUNT,
  createSchema,
  createEntitySchema,
  DBID,
  DICTIONARY,
  EMAIL,
  formats,
  HASH,
  init: createEnforceSchemaFunction,
  MODEL,
  NUMBER,
  partial,
  ROLES,
  STRING,
  USER,
  USER_DOC,
  UUID,
};
