const { baseObject, DICTIONARY, STRING } = require('../../schemas');

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
    financialModels: DICTIONARY,
  },
};

const FINANCIAL_MODEL_DOC = {
  ...baseObject('financial_model_doc'),
  id: STRING,
};

module.exports = {
  FINANCIAL_MODEL_DOC,
  USER_DOC,
};
