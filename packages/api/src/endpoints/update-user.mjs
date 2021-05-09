import roles from '../roles/index.mjs';
import {
  DICTIONARY,
  EMAIL,
  HASH,
  STRING,
  USER,
  createSchema,
} from '../schemas/index.mjs';
import { array, object } from '../util/index.mjs';

import { addUpdatedFields } from './util/index.mjs';

const { ACCOUNT_ADMIN, PERSONAL, SUPERUSER } = roles;
const requestSchema = createSchema({
  allRequired: false,
  id: 'update_user_request',
  properties: {
    authId: HASH,
    description: STRING,
    email: EMAIL,
    pwd: STRING,
    models: DICTIONARY,
  },
});
const responseSchema = USER;
const handler = async (request, response, next) => {
  try {
    const { body, dataStores, log, method, params, url } = request;
    const { accountId, userId } = params;
    const { models, users } = dataStores;
    const { locals } = response;
    const { roles: sessionRoles } = locals;
    // check session user auth
    if ((body.pwd || body.models) && !sessionRoles.includes(PERSONAL)) {
      log.clientInfo(
        `403: ${method} ${url}: only PERSONAL role can update password and models.`
      );
      response.status(403).end();
      return;
    }
    // fire off retrievals
    const fetchUser = users.get([accountId, userId]);
    const fetchModels = models.search({ parentIds: [accountId, userId] });
    // calculate diff (note: if models passed - always included)
    const user = await fetchUser;
    const changedFields = object.diff(body, user);
    const { authId, email, models: passedModels, pwd } = changedFields;
    // ensure field consistencies
    if (authId || email) {
      if (!authId) {
        response.status(400).send('authId required if changing email').end();
        return;
      }
      if (!email) {
        response.status(400).send('email required if changing authId').end();
        return;
      }
    }
    if (pwd || passedModels) {
      if (!pwd) {
        response
          .status(400)
          .send('models alone cannot be updated via this endpoint')
          .end();
        return;
      }
      if (!passedModels) {
        response
          .status(400)
          .send('models required if changing password.')
          .end();
        return;
      } else {
        const existingModels = await fetchModels;
        const existingIds = existingModels.map((model) => model.id).sort();
        const passedIds = Object.values(passedModels)
          .map((model) => model.id)
          .sort();
        if (!array.isScalarEqual(passedIds, existingIds)) {
          response
            .status(400)
            .send(`passed models do not match user's models`)
            .end();
          return;
        }
      }
    }
    // transactional
    const truthyChangedFields = object.extractTruthy(changedFields);
    if (!object.isEmpty(truthyChangedFields)) {
      const databaseUpdates = [
        {
          datastore: users,
          entity: addUpdatedFields(truthyChangedFields),
          ids: [accountId, userId],
        },
      ];
      if (passedModels) {
        for (const model of Object.values(passedModels)) {
          databaseUpdates.push({
            datastore: models,
            entity: addUpdatedFields(model),
            ids: [accountId, userId, model.id],
          });
        }
      }
      users.startAtomic();
      await Promise.all(
        databaseUpdates.map(({ datastore, entity, ids }) =>
          datastore.update({ entity, ids })
        )
      );
      await users.commitAtomic();
    }
    response.status(200).end();
  } catch (error) {
    next(error);
  }
};
export const verb = 'patch';
export const path = '/account/:accountId/user/:userId/';
export { handler };
export { requestSchema };
export { responseSchema };
export default {
  verb,
  path,
  handler,
  requestSchema,
  responseSchema,
  roles: [SUPERUSER, ACCOUNT_ADMIN, PERSONAL],
};
