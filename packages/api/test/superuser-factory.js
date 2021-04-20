const {
  PERSONAL_ACCOUNTS,
  SESSION_TOKEN,
} = require('my-finances-common').constants;
const { SUPERUSER } = require('../src/roles');
const { random, string } = require('../src/util');
const { version } = require('../package.json');

module.exports = ({ api, dataStores }) => async ({ createSession = true }) => {
  const hash = random.hash();
  const credentials = {
    authId: hash,
    email: `${hash.substring(0, 12)}_superuser@acme.org`,
    pwd: string.reverse(hash),
  };

  const now = Date.now();
  const otherFields = {
    accountId: PERSONAL_ACCOUNTS,
    created: now,
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
