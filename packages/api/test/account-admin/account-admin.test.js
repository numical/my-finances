const { constants } = require('my-finances-common');
const testApi = require('../test-api');
const createTestEntities = require('./create-test-entities');
const { PERSONAL_ACCOUNTS } = constants;

const {
  canCreateAccount,
  cannotCreateAccount,
  canCreateSession,
  canCreateAccountUser,
  cannotCreateAccountUser,
} = require('./creation-tests');

testApi(async (api, dataStores, testHash, test) => {
  const accounts = createTestEntities(testHash);
  const { superuser, account1, account2 } = accounts;

  // create superuser directly
  await dataStores.users.create({
    entity: {
      ...superuser.credentials,
      ...superuser.otherFields,
    },
    parentIds: [PERSONAL_ACCOUNTS],
  });

  // session tests

  await test(
    'superuser cannot create an account if no session',
    cannotCreateAccount({
      api,
      user: superuser,
      accountToCreate: account1,
      expectedStatus: 401,
    })
  );

  // super user tests

  await test(
    'superuser can create a session',
    canCreateSession({ api, user: superuser })
  );

  await test(
    'superuser can create an account when session created',
    canCreateAccount({ api, user: superuser, accountToCreate: account1 })
  );

  await test(
    'superuser can add an account admin user to an account',
    canCreateAccountUser({
      api,
      user: superuser,
      accountId: account1.id,
      userToCreate: account1.admin1,
    })
  );

  await test(
    'superuser can add a normal user to an account',
    canCreateAccountUser({
      api,
      user: superuser,
      accountId: account1.id,
      userToCreate: account1.user1,
    })
  );

  // account admin tests

  await test(
    'account admin can create a session',
    canCreateSession({ api, user: account1.admin1 })
  );

  await test(
    'account admin cannot create an account',
    cannotCreateAccount({
      api,
      user: account1.admin1,
      accountToCreate: account2,
      expectedStatus: 403,
    })
  );

  await test(
    'superuser can create a second account',
    canCreateAccount({ api, user: superuser, accountToCreate: account2 })
  );

  await test(
    'account admin cannot add another account admin user to another account',
    cannotCreateAccountUser({
      api,
      user: account1.admin1,
      accountId: account2.id,
      userToCreate: account1.admin2,
    })
  );

  await test(
    'account admin can add another account admin user to their own account',
    canCreateAccountUser({
      api,
      user: account1.admin1,
      accountId: account1.id,
      userToCreate: account1.admin2,
    })
  );

  await test(
    'account admin cannot add another account admin user to another account',
    cannotCreateAccountUser({
      api,
      user: account1.admin1,
      accountId: account2.id,
      userToCreate: account1.user2,
    })
  );

  await test(
    'account admin can add a user to their own account',
    canCreateAccountUser({
      api,
      user: account1.admin1,
      accountId: account1.id,
      userToCreate: account1.user2,
    })
  );

  // user tests

  await test(
    'user can create a session',
    canCreateSession({ api, user: account1.user1 })
  );

  await test(
    'user cannot create an account',
    cannotCreateAccount({
      api,
      user: account1.user1,
      accountToCreate: account2,
      expectedStatus: 403,
    })
  );

  await test(
    'user cannot add another user to their account',
    cannotCreateAccountUser({
      api,
      user: account1.user1,
      accountId: account1.id,
      userToCreate: account1.user2,
    })
  );

  await test(
    'user cannot add another user to another account',
    cannotCreateAccountUser({
      api,
      user: account1.user1,
      accountId: account2.id,
      userToCreate: account1.user2,
    })
  );
});
