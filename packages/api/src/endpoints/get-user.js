const { USER } = require('../schemas');

const handler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { users, models } = req.dataStores;

    const user = await users.get(id);

    if (!user) {
      req.log.clientInfo(
        `404: ${req.method} ${req.url}: unknown user id  '${id}'`
      );
      res.status(404).end();
      return;
    }

    const userModels = await models.search({ parentIds: [id] });
    if (userModels.length === 0) {
      req.log.error(`500: no models found for user id '${id}'`);
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
  path: '/user/:id',
  handler,
  requiresAuth: true,
  responseSchema: USER,
};
