const { STRING, STRING_ARRAY } = require('../../schemas');

const USER_DOC = {
  metadata: {
    id: 'user_doc',
  },
  properties: {
    id: STRING,
    userId: STRING,
    pwd: STRING,
    account: {
      properties: {
        email: STRING,
      },
    },
    keyStores: STRING_ARRAY,
  },
};

const KEYSTORE_DOC = {
  metadata: {
    id: 'keystore_doc',
  },
  id: STRING,
};

const FINANCIAL_MODEL_DOC = {
  metadata: {
    id: 'financial_model_doc',
  },
  id: STRING,
};

module.exports = {
  KEYSTORE_DOC,
  FINANCIAL_MODEL_DOC,
  USER_DOC,
};
