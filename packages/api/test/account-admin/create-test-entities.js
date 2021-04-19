const { PERSONAL_ACCOUNTS } = require('my-finances-common').constants;
const { ACCOUNT_ADMIN, PERSONAL } = require('../../src/roles');
const { version } = require('../../package.json');
const { string } = require('../../src/util');

const { reverse } = string;

module.exports = (testHash) => ({
  account1: {
    fields: {
      description: `${testHash.substring(0, 12)}_account1`,
      lastUpdated: Date.now(),
      version,
    },
    admin1: {
      credentials: {
        authId: `${testHash.slice(0, -1)}1`,
        email: `${testHash.substring(0, 12)}_account1admin1@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        roles: [ACCOUNT_ADMIN],
        lastUpdated: Date.now(),
        version,
      },
    },
    admin2: {
      credentials: {
        authId: `${testHash.slice(0, -1)}2`,
        email: `${testHash.substring(0, 12)}_account1admin2@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        roles: [ACCOUNT_ADMIN],
        lastUpdated: Date.now(),
        version,
      },
    },
    user1: {
      credentials: {
        authId: `${testHash.slice(0, -1)}3`,
        email: `${testHash.substring(0, 12)}_account1user1@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        roles: [PERSONAL],
        lastUpdated: Date.now(),
        version,
      },
    },
    user2: {
      credentials: {
        authId: `${testHash.slice(0, -1)}4`,
        email: `${testHash.substring(0, 12)}_account1user2@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        roles: [PERSONAL],
        lastUpdated: Date.now(),
        version,
      },
    },
  },
  account2: {
    fields: {
      description: `${testHash.substring(0, 12)}_account2`,
      lastUpdated: Date.now(),
      version,
    },
  },
});
