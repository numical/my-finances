const { MODEL } = require('../schemas');

const handler = async (req, res, next) => {
  try {
    const { dataStores, params } = req;
    const { userId, modelId } = params;
    const { models } = dataStores;
    const model = await models.get([userId, modelId]);
    res.locals.body = model;
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/user/:userId/models/:modelId',
  handler,
  requiresAuth: true,
  responseSchema: MODEL,
};
