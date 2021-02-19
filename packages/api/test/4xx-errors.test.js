const { test } = require('tap');
const request = require('supertest');
const { init } = require('../src/app');
const { get404, post400 } = require('./http-tests');
const customize = require('./customize');

(async () => {
  const app = await init(customize);
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
    post400(server, '/users', { userId: 'test' })
  );
})();
