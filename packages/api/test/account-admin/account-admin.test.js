const testApi = require('../test-api');
const createTestEntities = require('./create-test-entities');

const {
  canCreateAccount,
  cannotCreateAccount,
  canCreateSession,
  canCreateAccountUser,
  cannotCreateAccountUser,
} = require('./creation-tests');

testApi(async ({ api, createSuperuser, testHash, test }) => {
  const accounts = createTestEntities(testHash);
  const { account1, account2 } = accounts;

  const superuser = await createSuperuser({ createSession: true });
  const notLoggedInSuperuser = await createSuperuser({ createSession: false });

  // super user tests

  await test(
    'superuser cannot create an account if no session',
    cannotCreateAccount({
      api,
      user: notLoggedInSuperuser,
      accountToCreate: account1,
      expectedStatus: 401,
    })
  );

  await test(
    'superuser can create an account when session created',
    canCreateAccount({
      api,
      user: superuser,
      accountToCreate: account1,
    })
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
