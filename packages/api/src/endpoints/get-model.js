const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = require('../roles');
const { MODEL } = require('../schemas');

const handler = async (request, response, next) => {
  try {
    const { dataStores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = dataStores;
    const model = await models.get([accountId, userId, modelId]);
    response.locals.body = model;
    response.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  responseSchema: MODEL,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
