const { test } = require('tap');
const request = require('supertest');
const { get404, post400 } = require('./http-tests')
const { init } = require('../src/app');

(async () => {
  const app = await init();
  const server = request(app);

  // unknown
  test('unknown endpoint returns 404', get404(server, '/wibble'));

  // incorrect methods
  test('GET /users disallowed', get404(server, '/users'));
  test('GET /sessions disallowed', get404(server, '/sessions'));
  test('GET /financial-models disallowed', get404(server, '/financial-models'));

  // create user - invalid requests
  test('create user without body returns 400', post400(server, '/users', {}));
  test(
    'create user without body returns 400',
    post400(server, '/users', { id: 'test' })
  );
})();
