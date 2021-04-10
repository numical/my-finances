const { createSchema, HASH, USER } = require('../schemas');

const requestSchema = createSchema('get_user_request', {
  authId: HASH,
});

const responseSchema = USER;

const handler = async (req, res, next) => {
  try {
    const { dataStores, params, query } = req;
    const { users } = dataStores;
    const { accountId } = params;
    const { email } = query;

    const [user] = await users.search({
      criteria: { email },
      parentIds: [accountId],
    });

    if (user) {
      res.locals.body = user;
      res.status(200).json(user);
    } else {
      req.log.clientInfo(
        `404: ${req.method} ${req.url}: unknown user email '${email}'`
      );
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user',
  requiresAuth: true,
  handler,
  requestSchema,
  responseSchema,
};
