import myFinancesCommon from 'my-finances-common';

import { roles } from '../../src/roles/index.mjs';
import { string, version } from '../../src/util/index.mjs';

const { PERSONAL_ACCOUNTS } = myFinancesCommon.constants;
const { ACCOUNT_ADMIN, PERSONAL } = roles;
const { reverse } = string;

export default (testHash) => ({
  account1: {
    fields: {
      created: Date.now(),
      description: `${testHash.slice(0, 12)}_account1`,
      lastUpdated: Date.now(),
      version,
    },
    admin1: {
      credentials: {
        authId: `${testHash.slice(0, -1)}1`,
        email: `${testHash.slice(0, 12)}_account1admin1@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        created: Date.now(),
        description: 'admin1',
        roles: [ACCOUNT_ADMIN],
        lastUpdated: Date.now(),
        version,
      },
    },
    admin2: {
      credentials: {
        authId: `${testHash.slice(0, -1)}2`,
        email: `${testHash.slice(0, 12)}_account1admin2@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        created: Date.now(),
        description: 'admin2',
        roles: [ACCOUNT_ADMIN],
        lastUpdated: Date.now(),
        version,
      },
    },
    user1: {
      credentials: {
        authId: `${testHash.slice(0, -1)}3`,
        email: `${testHash.slice(0, 12)}_account1user1@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        created: Date.now(),
        description: 'user1',
        roles: [PERSONAL],
        lastUpdated: Date.now(),
        version,
      },
    },
    user2: {
      credentials: {
        authId: `${testHash.slice(0, -1)}4`,
        email: `${testHash.slice(0, 12)}_account1user2@acme.org`,
        pwd: reverse(testHash),
      },
      otherFields: {
        accountId: PERSONAL_ACCOUNTS,
        created: Date.now(),
        description: 'user2',
        roles: [PERSONAL],
        lastUpdated: Date.now(),
        version,
      },
    },
  },
  account2: {
    fields: {
      created: Date.now(),
      description: `${testHash.slice(0, 12)}_account2`,
      lastUpdated: Date.now(),
      version,
    },
  },
});
