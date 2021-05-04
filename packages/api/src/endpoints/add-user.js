const { ACCOUNT_ADMIN, SUPERUSER } = require('../roles');
const {
  EMAIL,
  HASH,
  ROLES,
  STRING,
  USER,
  createSchema,
} = require('../schemas');
const { newUserHandler } = require('./util');

const requestSchema = createSchema({
  id: 'add_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
    description: STRING,
    roles: ROLES,
  },
});

const responseSchema = USER;

const handler = async (request, response, next) => {
  const { body, params } = request;
  const { roles } = body;
  const { accountId } = params;

  return newUserHandler({
    accountId,
    roles,
    req: request,
    res: response,
    next,
  });
};

module.exports = {
  verb: 'post',
  path: '/account/:accountId/users',
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN],
};
