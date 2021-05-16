import { roles } from '../roles/index.mjs';

const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = roles;
const handler = async (request, response, next) => {
  try {
    const { datastores, log, method, params, status, url } = request;
    const { models, users } = datastores;
    const { accountId, userId } = params;
    const userModels = await models.search({
      parentIds: [accountId, userId],
      hydrateResults: false,
    });
    const deletes = userModels.reduce(
      (deletes, model) => {
        deletes.push({ datastore: models, ids: [accountId, userId, model.id] });
        return deletes;
      },
      [{ datastore: users, ids: [accountId, userId] }]
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
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  verb: 'delete',
  path: '/account/:accountId/user/:userId',
  handler,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
