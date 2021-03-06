const { test, only } = require('tap');
const request = require('supertest');
const { SESSION_TOKEN } = require('my-finances-common');

const createApp = require('../src/app');
const { post200 } = require('./http-tests');
const { assertSession } = require('./auth-tests');
const customize = require('./customize');

const userId = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const email = 'test.email@acme.org';
const pwd = 'fedbca9876543210fedbca9876543210fedbca9876543210fedbca9876543210';

const invalidUserCredentials = {
  'missing email': { userId },
  'missing pwd': { userId, email },
  'invalid user id': { userId: 'not a 64 character hash', email, pwd},
  'invalid email': { userId, email: 'not a valid email address', pwd },
  'invalid pwd': { userId, email, pwd: 12345 },
};

const validUserCredentials = { userId, email, pwd };

(async () => {
  const app = await createApp(customize);
  const server = request.agent(app);

  test('create new user', async (t) => {
    for (const [useCase, credentials] of Object.entries(
      invalidUserCredentials
    )) {
      const { status: invalidCredentialsStatus } = await server
        .post('/users')
        .send(credentials);
      t.equal(
        invalidCredentialsStatus,
        400,
        `rejects invalid credentials - ${useCase}`
      );
    }

    const { status: createUserStatus, body: user } = await server
      .post('/users')
      .send(validUserCredentials);
    t.equal(createUserStatus, 200, 'creates user');

    const { userId, email, pwd, keyStores } = user;
    t.same(
      { userId, email, pwd },
      validUserCredentials,
      'returns user credentials'
    );
    t.ok(keyStores, 'initiates keystores');

    const { status: failFetchStatus } = await server.get(`/user/${userId}`);
    t.equal(failFetchStatus, 401, 'cannot fetch user until session created');

    const sessionResponse = await server
      .post('/sessions')
      .send({ userId, pwd });
    t.equal(sessionResponse.status, 200, 'creates session');
    const { sessionId, cookies } = assertSession(t, sessionResponse);

    const { status: fetchStatus, body: fetchedUser } = await server
      .get(`/user/${userId}`)
      .set(SESSION_TOKEN, sessionId)
      .set('Cookie', cookies);
    t.equal(fetchStatus, 200, 'can fetch user when certs data sent');

    t.same(fetchedUser, user);

    t.end();
  });
})();
