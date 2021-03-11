const { test } = require('tap');
const { get404, post400 } = require('./util/test-for-http-error');
const testApi = require('./util/test-api');

testApi((api) => {
  // unknown
  test('unknown endpoint returns 404', get404(api, '/wibble'));

  // incorrect methods
  test('GET /users disallowed', get404(api, '/users'));
  test('GET /sessions disallowed', get404(api, '/sessions'));
  test('GET /financial-models disallowed', get404(api, '/financial-models'));

  // create user - invalid requests
  test('create user without body returns 400', post400(api, '/users', {}));
  test(
    'create user without body returns 400',
    post400(api, '/users', { userId: 'test' })
  );
});
