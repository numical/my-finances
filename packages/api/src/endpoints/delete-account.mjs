import { roles } from '../roles/index.mjs';
import { array } from '../util/index.mjs';

const { SUPERUSER } = roles;
const handler = async (request, response, next) => {
  try {
    const { datastores, params } = request;
    const { accounts, models, users } = datastores;
    const { accountId } = params;
    const accountUsers = await users.search({
      parentIds: [accountId],
      hydrateResults: false,
    });
    const userModels = await Promise.all(
      accountUsers.map(async (user) => {
        // TODO - this is wrong
        const model = await models.search({
          parentIds: [accountId, user.id],
          hydrateResults: false,
        });
        model.userId = user.id;
        return model;
      })
    );
    const deletes = [
      ...userModels.map((model) => ({
        datastore: models,
        ids: [accountId, model.userId, model.id],
      })),
      ...accountUsers.map((user) => ({
        datastore: users,
        ids: [accountId, user.id],
      })),
      { datastore: accounts, ids: [accountId] },
    ];
    const chunks = array.chunk(500, deletes);
    // want to run each sequentially
    chunks.reduce(async (previous, chunk) => {
      await previous;
      users.startAtomic();
      for (const { datastore, ids } of chunk) {
        datastore.del({ ids });
      }
      return users.commitAtomic();
    }, Promise.resolve());
    request.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  verb: 'delete',
  path: '/account/:accountId',
  handler,
  roles: [SUPERUSER],
};
