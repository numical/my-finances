const { SUPERUSER } = require('../roles');
const { array } = require('../util');

const handler = async (req, res, next) => {
  try {
    const { dataStores, params } = req;
    const { accounts, users, models } = dataStores;
    const { accountId } = params;

    const accountUsers = await users.search({
      parentIds: [accountId],
      hydrateResults: false,
    });
    const userModels = await Promise.all(
      accountUsers.map(async (user) => {
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
        dataStore: models,
        ids: [accountId, model.userId, model.id],
      })),
      ...accountUsers.map((user) => ({
        dataStore: users,
        ids: [accountId, user.id],
      })),
      { dataStore: accounts, ids: [accountId] },
    ];

    const chunks = array.chunk(500, deletes);

    // want to run each sequentially
    chunks.reduce(async (previous, chunk) => {
      await previous;
      users.startAtomic();
      chunk.forEach(({ datastore, ids }) => datastore.del({ ids }));
      return users.commitAtomic();
    }, Promise.resolve());

    req.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'delete',
  path: '/account/:accountId',
  handler,
  roles: [SUPERUSER],
};
