const { SUPERUSER, ACCOUNT_ADMIN, PERSONAL } = require('../roles');

const handler = async (req, res, next) => {
  try {
    const { dataStores, params } = req;
    const { users, models } = dataStores;
    const { accountId, userId } = params;

    const userModels = await models.search({
      parentIds: [accountId, userId],
      hydrateResults: false,
    });

    const deletes = userModels.reduce(
      (deletes, model) => {
        deletes.push({ dataStore: models, ids: [accountId, userId, model.id] });
        return deletes;
      },
      [{ dataStore: users, ids: [accountId, userId] }]
    );

    if (deletes.length > 500) {
      req.log.clientInfo(
        `500: ${req.method} ${req.url}: delete batch threshold exceeded: '${deletes.length}'`
      );
      res.status(500).end();
      return;
    }

    users.startAtomic();
    deletes.forEach(({ datastore, ids }) => datastore.del({ ids }));
    await users.commitAtomic();
    req.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'delete',
  path: '/account/:accountId/user/:userId',
  handler,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
