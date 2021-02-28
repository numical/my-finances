const createEnforceSchemaFunction = require('./create-enforce-schema-function');

const NUMBER = { type: 'float64' };
const STRING = { type: 'string' };
const DICTIONARY = { values: { type: 'string' } };

const USER = {
  properties: {
    userId: STRING,
    email: STRING,
    pwd: STRING,
    keyStores: DICTIONARY,
  },
};

module.exports = {
  init: createEnforceSchemaFunction,
  NUMBER,
  STRING,
  DICTIONARY,
  USER,
};
