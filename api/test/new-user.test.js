const { test, only } = require('tap');
const request = require('supertest');
const { post200 } = require('./http-tests')
const { init } = require('../src/app');

(async () => {
  const app = await init();
  const server = request(app);

  const auth = {
    id: 'hash of test email',
    email: 'test email',
    pwd: 'hash of password'
  };

  only('create new user', async(t) => {

    const { status: createUserStatus, body: initialUser } = await server.post('/users').send(auth);
    t.equal(createUserStatus, 200, 'creates user');

    const { id, email, pwd, keyStores } = initialUser;
    t.same({ id, email, pwd }, auth, 'returns user credentials');
    t.ok(keyStores, 'initiates keystores');

    // TODO: user fetch fails as no session

    const { status: createSessionStatus, body: session } = await server.post('/sessions').send({ id, pwd });
    t.equal(createUserStatus, 200, 'creates session');
    const { sessionId, timeout } = session;
    t.ok(sessionId, 'returns a session id');
    t.ok(timeout, 'returns a timeout');

    const {  status: fetchStatus, body: fetchedUser } = await server.get(`/user/${id}`);
    t.equal(fetchStatus, 200, 'can fetch user');

    t.same(fetchedUser, initialUser);

    t.end();
  });


})();
