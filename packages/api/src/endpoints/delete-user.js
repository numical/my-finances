const { SUPERUSER, ACCOUNT_ADMIN, PERSONAL } = require('../roles');

const handler = async (request, response, next) => {
  try {
    const { dataStores, log, method, params, status, url } = request;
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
      log.clientInfo(
        `500: ${method} ${url}: delete batch threshold exceeded: '${deletes.length}'`
      );
      response.status(500).end();
      return;
    }

    users.startAtomic();
    for (const { datastore, ids } of deletes) {
      datastore.del({ ids });
    }
    await users.commitAtomic();
    status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verb: 'delete',
  path: '/account/:accountId/user/:userId',
  handler,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
