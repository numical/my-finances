const { MODEL } = require('../schemas');
const { PERSONAL } = require('../roles');
const { addUpdatedFields } = require('./util');

const handler = async (request, response, next) => {
  try {
    const { body: model, dataStores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = dataStores;
    const entity = addUpdatedFields(model);
    models.update({ entity, ids: [accountId, userId, modelId] });
    response.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'put',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  requestSchema: MODEL,
  roles: [PERSONAL],
};
