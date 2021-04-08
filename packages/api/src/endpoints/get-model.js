const { MODEL } = require('../schemas');
const { ANY } = require('../roles');

const handler = async (req, res, next) => {
  try {
    const { dataStores, params } = req;
    const { accountId, userId, modelId } = params;
    const { models } = dataStores;
    const model = await models.get([accountId, userId, modelId]);
    res.locals.body = model;
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  responseSchema: MODEL,
  roles: ANY,
};
