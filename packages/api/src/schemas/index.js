const createEnforceSchemaFunction = require('./create-enforce-schema-function');

const NUMBER = { type: 'number' };
const STRING = { type: 'string' };
const OBJECT = { type: 'object' };

// for formats, see ./formats.js
const DBID = { ...STRING, format: 'dbid' };
const DICTIONARY = { ...OBJECT, additionalProperties: OBJECT };
const EMAIL = { ...STRING, format: 'email' };
const HASH = { ...STRING, format: 'hash' };
const TIME = { ...NUMBER, minimum: 1607644800000, maximum: 2554329600000 };
const VERSION = { ...STRING, format: 'semver' };
const UUID = { ...STRING, format: 'uuid' };

const createSchema = (id, properties) => ({
  type: 'object',
  allRequired: true,
  metadata: {
    id,
  },
  properties,
});

const createEntitySchema = (id, properties) =>
  createSchema(id, {
    id: DBID,
    lastUpdated: TIME,
    version: VERSION,
    ...properties,
  });

const ACCOUNT = createEntitySchema('account', {
  id: STRING, // note this overwrites DBID format to account for default 'personal' account
});

const USER = createEntitySchema('user', {
  authId: HASH,
  email: EMAIL,
  pwd: HASH,
  models: DICTIONARY,
});

const USER_DOC = createEntitySchema('user_doc', {
  authId: HASH,
  email: EMAIL,
  pwd: HASH,
});

const MODEL = createEntitySchema('model', {
  data: STRING,
  description: STRING,
});

module.exports = {
  ACCOUNT,
  createSchema,
  createEntitySchema,
  DBID,
  DICTIONARY,
  EMAIL,
  HASH,
  init: createEnforceSchemaFunction,
  MODEL,
  NUMBER,
  STRING,
  USER,
  USER_DOC,
  UUID,
};
