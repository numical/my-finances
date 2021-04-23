const { PERSONAL } = require('../roles');

const handler = async (req, res, next) => {
  try {
    const { dataStores, params } = req;
    const { accountId, userId, modelId } = params;
    const { models } = dataStores;
    await models.del({ ids: [accountId, userId, modelId] });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'delete',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  roles: [PERSONAL],
};
