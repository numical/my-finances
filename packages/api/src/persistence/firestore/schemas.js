const { STRING, STRING_ARRAY } = require('../../schemas');

const USER_DOC = {
  properties: {
    id: STRING,
    userId: STRING,
    pwd: STRING,
    account: {
      email: STRING,
    },
    keyStores: STRING_ARRAY,
  },
};

const KEYSTORE_DOC = {
  id: STRING,
};

const FINANCIAL_MODEL_DOC = {
  id: STRING,
};

module.exports = {
  KEYSTORE_DOC,
  FINANCIAL_MODEL_DOC,
  USER_DOC,
};
