import { roles } from '../roles/index.mjs';
import { USER } from '../schemas/index.mjs';

const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = roles;
const handler = async (request, response, next) => {
  try {
    const { datastores, log, method, params, url } = request;
    const { models, users } = datastores;
    const { accountId, userId } = params;
    const user = await users.get([accountId, userId]);
    if (user) {
      const userModels = await models.search({
        parentIds: [accountId, userId],
      });
      user.models = userModels.reduce((dictionary, model) => {
        dictionary[model.description] = model;
        return dictionary;
      }, {});
      response.locals.body = user;
      response.status(200).json(user);
    } else {
      log.clientInfo(`404: ${method} ${url}: unknown user id  '${userId}'`);
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export { USER as responseSchema };
export default {
  verb: 'get',
  path: '/account/:accountId/user/:userId',
  handler,
  responseSchema: USER,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
