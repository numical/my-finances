const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = require('../roles');
const { USER } = require('../schemas');

const handler = async (request, response, next) => {
  try {
    const { dataStores, log, method, params, url } = request;
    const { models, users } = dataStores;
    const { accountId, userId } = params;

    const user = await users.get([accountId, userId]);

    if (!user) {
      log.clientInfo(`404: ${method} ${url}: unknown user id  '${userId}'`);
      response.status(404).end();
      return;
    }

    const userModels = await models.search({ parentIds: [accountId, userId] });
    if (userModels.length === 0) {
      log.error(`500: no models found for user id '${userId}'`);
      response.status(500).end();
    }

    user.models = userModels.reduce((dictionary, model) => {
      dictionary[model.description] = model;
      return dictionary;
    }, {});

    response.locals.body = user;
    response.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user/:userId',
  handler,
  responseSchema: USER,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
