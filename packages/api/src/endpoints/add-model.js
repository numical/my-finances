const { PERSONAL } = require('../roles');
const { createSchema, MODEL, STRING } = require('../schemas');
const { addCreatedFields } = require('./util');

const requestSchema = createSchema({
  id: 'add_model_request',
  properties: {
    data: STRING,
    description: STRING,
  },
});

const responseSchema = MODEL;

const handler = async (req, res, next) => {
  try {
    const { body, dataStores, params } = req;
    const { models } = dataStores;
    const { accountId, userId } = params;
    const { data, description } = body;

    const model = await models.create({
      entity: addCreatedFields({
        data,
        description,
      }),
      parentIds: [accountId, userId],
    });

    res.locals.body = model;
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verb: 'post',
  path: '/account/:accountId/user/:userId/models',
  handler,
  requestSchema,
  responseSchema,
  roles: [PERSONAL],
};
