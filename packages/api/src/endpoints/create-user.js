const { PERSONAL_ACCOUNTS } = require('my-finances-common').constants;
const { PERSONAL } = require('../roles');
const { createSchema, EMAIL, HASH, STRING, USER } = require('../schemas');
const newUserHandler = require('./new-user-handler');

const requestSchema = createSchema({
  id: 'create_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
  },
});

const responseSchema = USER;

const handler = async (req, res, next) =>
  newUserHandler({
    accountId: PERSONAL_ACCOUNTS,
    roles: [PERSONAL],
    req,
    res,
    next,
  });

module.exports = {
  verb: 'post',
  path: '/account/personal/users',
  requiresAuth: false,
  handler,
  requestSchema,
  responseSchema,
};
