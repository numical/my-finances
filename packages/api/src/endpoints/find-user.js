const { ACCOUNT_ADMIN, SUPERUSER } = require('../roles');
const { HASH, USER, createSchema } = require('../schemas');

const requestSchema = createSchema({
  id: 'get_user_request',
  properties: {
    authId: HASH,
  },
});

const responseSchema = USER;

const handler = async (request, response, next) => {
  try {
    const { dataStores, log, method, params, query, url } = request;
    const { users } = dataStores;
    const { accountId } = params;
    const { email } = query;

    const [user] = await users.search({
      criteria: { email },
      parentIds: [accountId],
    });

    if (user) {
      response.locals.body = user;
      response.status(200).json(user);
    } else {
      log.clientInfo(`404: ${method} ${url}: unknown user email '${email}'`);
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user',
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN],
};
