import myFinancesCommon from 'my-finances-common';

import { roles } from '../src/roles/index.mjs';
import { random, string, version } from '../src/util/index.mjs';

const { PERSONAL_ACCOUNTS, SESSION_TOKEN } = myFinancesCommon.constants;
const { SUPERUSER } = roles;

export default ({ api, dataStores }) => async ({ createSession = true }) => {
  const hash = random.hash();
  const credentials = {
    authId: hash,
    email: `${hash.slice(0, 12)}_superuser@acme.org`,
    pwd: string.reverse(hash),
  };
  const now = Date.now();
  const otherFields = {
    accountId: PERSONAL_ACCOUNTS,
    created: now,
    description: `superuser-${hash}`,
    roles: [SUPERUSER],
    lastUpdated: now,
    version,
  };
  await dataStores.users.create({
    entity: {
      ...credentials,
      ...otherFields,
    },
    parentIds: [PERSONAL_ACCOUNTS],
  });
  let sessionHeaders = {};
  if (createSession) {
    const { body, headers } = await api.post('/sessions').send(credentials);
    sessionHeaders = {
      [SESSION_TOKEN]: body.sessionId,
      Cookie: headers['set-cookie'],
    };
  }
  return {
    credentials,
    sessionHeaders,
  };
};
