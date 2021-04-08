const { MODEL } = require('../schemas');
const { PERSONAL } = require('../roles');
const { version } = require('../../package.json');

const handler = async (req, res, next) => {
  try {
    const { body: model, dataStores, params } = req;
    const { accountId, userId, modelId } = params;
    const { models } = dataStores;
    model.lastUpdated = Date.now();
    model.version = version;
    models.update({ entity: model, ids: [accountId, userId, modelId] });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'put',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  requiresAuth: true,
  requestSchema: MODEL,
  roles: [PERSONAL],
};
