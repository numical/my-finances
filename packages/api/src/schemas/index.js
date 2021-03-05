const createEnforceSchemaFunction = require('./create-enforce-schema-function');

const NUMBER = { type: 'float64' };
const STRING = { type: 'string' };
const STRING_ARRAY = { elements: { type: 'string' } };
const DICTIONARY = { values: { type: 'string' } };

const USER = {
  metadata: {
    id: 'user',
  },
  properties: {
    id: STRING,
    userId: STRING,
    email: STRING,
    pwd: STRING,
    keyStores: STRING_ARRAY,
  },
};

module.exports = {
  init: createEnforceSchemaFunction,
  NUMBER,
  STRING,
  STRING_ARRAY,
  DICTIONARY,
  USER,
};
