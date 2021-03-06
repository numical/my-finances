const { baseObject, STRING, STRING_ARRAY } = require('../../schemas');

const USER_DOC = {
  ...baseObject('user_doc'),
  properties: {
    id: STRING,
    userId: STRING,
    pwd: STRING,
    account: {
      ...baseObject(),
      properties: {
        email: STRING,
      },
    },
    keyStores: STRING_ARRAY,
  },
};

const KEYSTORE_DOC = {
  ...baseObject('keystore_doc'),
  id: STRING,
};

const FINANCIAL_MODEL_DOC = {
    ...baseObject('financial_model_doc'),
  id: STRING
};

module.exports = {
  KEYSTORE_DOC,
  FINANCIAL_MODEL_DOC,
  USER_DOC,
};
