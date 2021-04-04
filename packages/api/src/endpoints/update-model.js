const { MODEL } = require('../schemas');

const handler = async (req, res, next) => {
  try {
    const { body: model, dataStores, params } = req;
    const { userId, modelId } = params;
    const { models } = dataStores;
    models.update({ entity: model, ids: [userId, modelId] });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'put',
  path: '/user/:userId/models/:modelId',
  handler,
  requiresAuth: true,
  requestSchema: MODEL,
};
