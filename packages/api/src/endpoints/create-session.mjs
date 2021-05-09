import {
  cookieConstants,
  generateJWT,
  generateSessionId,
} from '../authn/index.mjs';
import config from '../config/index.mjs';
import { HASH, NUMBER, STRING, UUID, createSchema } from '../schemas/index.mjs';
import { string } from '../util/index.mjs';

const { COOKIE_NAME, COOKIE_OPTIONS } = cookieConstants;
const requestSchema = createSchema({
  id: 'create_session_request',
  properties: {
    authId: HASH,
    pwd: STRING,
  },
});
const responseSchema = createSchema({
  id: 'create_session_response',
  properties: {
    sessionId: UUID,
    timeout: NUMBER,
  },
});
const handler = async (request, response, next) => {
  try {
    const { body, dataStores, log, method, url } = request;
    const { authId, pwd } = body;
    const { users } = dataStores;
    const [existingUsers, sessionId] = await Promise.all([
      users.search({ criteria: { authId } }),
      generateSessionId(),
    ]);
    switch (existingUsers.length) {
      case 0: {
        log.clientInfo(
          `400: ${method} ${url}: unknown user auth id '${authId}'`
        );
        response.status(400).end();
        break;
      }
      case 1: {
        const user = existingUsers[0];
        if (string.isEqualInFixedTime(pwd, user.pwd)) {
          const maxAge = config.sessionTimeoutInSeconds * 1000;
          const body = {
            accountId: user.accountId,
            roles: user.roles,
            sessionId,
            timeout: Date.now() + maxAge,
            userId: user.id,
          };
          const jwt = await generateJWT(body);
          response.cookie(COOKIE_NAME, jwt, { ...COOKIE_OPTIONS, maxAge });
          response.locals.body = body;
          response.status(200).json(body);
        } else {
          log.clientInfo(
            `401: ${method} ${url}: password incorrect for auth id '${authId}'`
          );
          response.status(401).end();
        }
        break;
      }
      default: {
        log.error(
          `500: ${method} ${url}: multiple records for auth id '${authId}'`
        );
        response.status(500).end();
      }
    }
  } catch (error) {
    next(error);
  }
};
export const verb = 'post';
export const path = '/sessions';
export { handler };
export { requestSchema };
export { responseSchema };
export default {
  verb,
  path,
  handler,
  requestSchema,
  responseSchema,
};
