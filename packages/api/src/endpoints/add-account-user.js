const { SUPERUSER, ACCOUNT_ADMIN } = require('../roles');
const {
  createSchema,
  EMAIL,
  HASH,
  ROLES,
  STRING,
  USER,
} = require('../schemas');
const newUserHandler = require('./new-user-handler');

const requestSchema = createSchema({
  id: 'add_account_user_request',
  properties: {
    authId: HASH,
    email: EMAIL,
    pwd: STRING,
    roles: ROLES,
  },
});

const responseSchema = USER;

const handler = async (req, res, next) => {
  const { body, params } = req;
  const { roles } = body;
  const { accountId } = params;

  return newUserHandler({
    accountId,
    roles,
    req,
    res,
    next,
  });
};

module.exports = {
  verb: 'post',
  path: '/account/:accountId/users',
  requiresAuth: true,
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN],
};
