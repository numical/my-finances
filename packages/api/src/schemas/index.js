const baseObject = require('./base-object');
const createEnforceSchemaFunction = require('./create-enforce-schema-function');

const NUMBER = { type: 'number' };
const STRING = { type: 'string' };
const OBJECT = { type: 'object' };

const DBID = { ...STRING, format: 'dbid' };
const DICTIONARY = { ...OBJECT, additionalProperties: OBJECT };
const EMAIL = { ...STRING, format: 'email' };
const HASH = { ...STRING, format: 'hash' };
const UUID = { ...STRING, format: 'uuid' };

const USER = {
  ...baseObject('user'),
  properties: {
    id: DBID,
    userId: HASH,
    email: EMAIL,
    pwd: HASH,
    models: DICTIONARY,
  },
};

const FINANCIAL_MODEL = {
  ...baseObject('financial_model'),
  id: STRING,
};

module.exports = {
  baseObject,
  DBID,
  DICTIONARY,
  EMAIL,
  FINANCIAL_MODEL,
  HASH,
  init: createEnforceSchemaFunction,
  NUMBER,
  STRING,
  USER,
  UUID,
};
