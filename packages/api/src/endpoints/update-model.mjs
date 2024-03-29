import { roles } from '../roles/index.mjs';
import { MODEL } from '../schemas/index.mjs';

import { addUpdatedFields } from './util/index.mjs';

const { PERSONAL } = roles;
const handler = async (request, response, next) => {
  try {
    const { body: model, datastores, params } = request;
    const { accountId, modelId, userId } = params;
    const { models } = datastores;
    const entity = addUpdatedFields(model);
    models.update({ entity, ids: [accountId, userId, modelId] });
    response.status(200).end();
  } catch (error) {
    next(error);
  }
};

export default {
  verb: 'put',
  path: '/account/:accountId/user/:userId/models/:modelId',
  handler,
  requestSchema: MODEL,
  roles: [PERSONAL],
};
