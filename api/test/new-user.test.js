const { test, only } = require('tap');
const request = require('supertest');
const { post200 } = require('./http-tests')
const { init } = require('../src/app');

(async () => {
  const app = await init();
  const server = request(app);

  const auth = {
    userId: 'hash of test email',
    email: 'test email',
    pwd: 'hash of password'
  };

  test('create new user', async(t) => {
    const { status: createUserStatus, body: initialUser } = await server
      .post('/users')
      .send(auth);
    t.equal(createUserStatus, 200, 'creates user');

    const { userId, email, pwd, keyStores } = initialUser;
    t.same({ userId, email, pwd }, auth, 'returns user credentials');
    t.ok(keyStores, 'initiates keystores');

    const {  status: failFetchStatus } = await server.get(`/user/${userId}`);
    t.equal(failFetchStatus, 401, 'cannot fetch user until session created');

    const { status: createSessionStatus, body: session } = await server
      .post('/sessions')
      .send({ userId, pwd });
    t.equal(createUserStatus, 200, 'creates session');
    const { sessionId, timeout } = session;
    t.ok(sessionId, 'returns a session id');
    t.ok(timeout, 'returns a timeout');

    const {  status: fetchStatus, body: fetchedUser } = await server
      .get(`/user/${userId}`)
      .set('X-Csrf-Token', sessionId)
    t.equal(fetchStatus, 200, 'can fetch user when auth data sent');

    t.same(fetchedUser, initialUser);

    t.end();
  });


})();
