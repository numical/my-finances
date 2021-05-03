const { PERSONAL } = require('../roles');

const handler = async (request, response, next) => {
  try {
    const { dataStores, params } = request;
    const { accountId, userId, modelId } = params;
    const { models } = dataStores;
    await models.del({ ids: [accountId, userId, modelId] });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'delete',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  roles: [PERSONAL],
};
