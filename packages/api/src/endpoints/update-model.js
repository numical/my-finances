const { MODEL } = require('../schemas');
const { PERSONAL } = require('../roles');
const { addUpdatedFields } = require('./util');

const handler = async (req, res, next) => {
  try {
    const { body: model, dataStores, params } = req;
    const { accountId, userId, modelId } = params;
    const { models } = dataStores;
    const entity = addUpdatedFields(model);
    models.update({ entity, ids: [accountId, userId, modelId] });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'put',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  requestSchema: MODEL,
  roles: [PERSONAL],
};
