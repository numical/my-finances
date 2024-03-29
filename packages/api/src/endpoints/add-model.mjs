import { roles } from '../roles/index.mjs';
import { MODEL, STRING, createSchema } from '../schemas/index.mjs';

import { addCreatedFields } from './util/index.mjs';

const { PERSONAL } = roles;
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
    const { body, datastores, params } = request;
    const { models } = datastores;
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

export default {
  verb: 'post',
  path: '/account/:accountId/user/:userId/models',
  handler,
  requestSchema,
  responseSchema,
  roles: [PERSONAL],
};
