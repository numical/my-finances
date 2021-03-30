const { baseObject, MODEL, STRING, USER } = require('../../schemas');

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
  },
};

const MODEL_DOC = {
  ...baseObject('model_doc'),
  properties: {
    id: STRING,
    data: STRING,
  },
};

module.exports = {
  MODEL,
  MODEL_DOC,
  USER,
  USER_DOC,
};
