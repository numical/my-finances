const baseObject = require('./base-object');
const createEnforceSchemaFunction = require('./create-enforce-schema-function');

const NUMBER = { type: 'number' };
const STRING = { type: 'string' };
const OBJECT = { type: 'object' };

// for formats, see ./formats.js
const DBID = { ...STRING, format: 'dbid' };
const DICTIONARY = { ...OBJECT, additionalProperties: OBJECT };
const EMAIL = { ...STRING, format: 'email' };
const HASH = { ...STRING, format: 'hash' };
const UUID = { ...STRING, format: 'uuid' };

const ACCOUNT = {
  ...baseObject('account'),
  properties: {
    id: STRING,
  },
};

const USER = {
  ...baseObject('user'),
  properties: {
    id: DBID,
    authId: HASH,
    email: EMAIL,
    pwd: HASH,
    models: DICTIONARY,
  },
};

const MODEL = {
  ...baseObject('model'),
  properties: {
    id: DBID,
    data: STRING,
    description: STRING,
  },
};

module.exports = {
  ACCOUNT,
  baseObject,
  DBID,
  DICTIONARY,
  EMAIL,
  HASH,
  init: createEnforceSchemaFunction,
  MODEL,
  NUMBER,
  STRING,
  USER,
  UUID,
};
