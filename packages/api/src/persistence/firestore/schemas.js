const { baseObject, STRING, USER } = require('../../schemas');

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

module.exports = {
  USER,
  USER_DOC,
};
