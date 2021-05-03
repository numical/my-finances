const { PERSONAL_ACCOUNTS } = require('my-finances-common').constants;
const { PERSONAL } = require('../roles');
const { createSchema, EMAIL, HASH, STRING, USER } = require('../schemas');
const { newUserHandler } = require('./util');

const requestSchema = createSchema({
  id: 'create_user_request',
  properties: {
    authId: HASH,
    description: STRING,
    email: EMAIL,
    pwd: STRING,
  },
});

const responseSchema = USER;

const handler = async (request, response, next) =>
  newUserHandler({
    accountId: PERSONAL_ACCOUNTS,
    roles: [PERSONAL],
    req: request,
    res: response,
    next,
  });

module.exports = {
  verb: 'post',
  path: '/account/personal/users',
  handler,
  requestSchema,
  responseSchema,
};
