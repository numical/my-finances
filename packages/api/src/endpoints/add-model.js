const { PERSONAL } = require('../roles');
const { MODEL, STRING, createSchema } = require('../schemas');
const { addCreatedFields } = require('./util');

const requestSchema = createSchema({
  id: 'add_model_request',
  properties: {
    data: STRING,
    description: STRING,
  },
});

const responseSchema = MODEL;

const handler = async (request, response, next) => {
  try {
    const { body, dataStores, params } = request;
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

    response.locals.body = model;
    response.status(200).json(model);
  } catch (error) {
    next(error);
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
