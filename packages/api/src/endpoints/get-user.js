const { USER } = require('../schemas');
const { ANY } = require('../roles');

const handler = async (req, res, next) => {
  try {
    const { body, dataStores, params } = req;
    const { users, models } = dataStores;
    const { accountId, userId } = params;

    const user = await users.get([accountId, userId]);

    if (!user) {
      req.log.clientInfo(
        `404: ${req.method} ${req.url}: unknown user id  '${userId}'`
      );
      res.status(404).end();
      return;
    }

    const userModels = await models.search({ parentIds: [accountId, userId] });
    if (userModels.length === 0) {
      req.log.error(`500: no models found for user id '${userId}'`);
      res.status(500).end();
    }

    user.models = userModels.reduce((dictionary, model) => {
      dictionary[model.description] = model;
      return dictionary;
    }, {});

    if (user) {
      res.locals.body = user;
      res.status(200).json(user);
    } else {
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'get',
  path: '/account/:accountId/user/:userId',
  handler,
  responseSchema: USER,
  roles: ANY,
};
