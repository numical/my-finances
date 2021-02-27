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
  NUMBER,
  STRING,
  DICTIONARY,
  USER,
};
