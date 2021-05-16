import { roles } from '../roles/index.mjs';

export { default as createEnforceSchemaFunction } from './create-enforce-schema-function.mjs';
export const NUMBER = { type: 'number' };
export const STRING = { type: 'string' };
export const OBJECT = { type: 'object' };
export const ARRAY = { type: 'array' };
// for formats, see ./formats.js
export const DBID = { ...STRING, format: 'dbid' };
export const DICTIONARY = { ...OBJECT, additionalProperties: OBJECT };
export const EMAIL = { ...STRING, format: 'email' };
export const HASH = { ...STRING, format: 'hash' };
export const ROLES = {
  ...ARRAY,
  uniqueItems: true,
  minItems: 1,
  items: { enum: Object.values(roles) },
};
export const TIME = {
  ...NUMBER,
  minimum: 1607644800000,
  maximum: 2554329600000,
};
export const VERSION = { ...STRING, format: 'semver' };
export const UUID = { ...STRING, format: 'uuid' };
export const createSchema = ({ allRequired = true, id, properties }) => ({
  type: 'object',
  allRequired,
  metadata: {
    id,
  },
  properties,
});
export const createEntitySchema = ({ id, properties }) =>
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
export const partial = (schema) => ({
  ...schema,
  allRequired: false,
  metadata: {
    ...schema.metadata,
    id: `partial-${schema.metadata.id}`,
  },
});
export const ACCOUNT = createEntitySchema({
  id: 'account',
  properties: {
    id: STRING, // note this overwrites DBID format to account for default 'personal' account
  },
});
export const USER = createEntitySchema({
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
export const USER_DOC = createEntitySchema({
  id: 'user_doc',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: HASH,
    accountId: STRING,
    roles: ROLES,
  },
});
export const MODEL = createEntitySchema({
  id: 'model',
  properties: {
    data: STRING,
  },
});
