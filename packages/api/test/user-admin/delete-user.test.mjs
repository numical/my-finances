import myFinancesCommon from 'my-finances-common';

import { random } from '../..//src/util/index.mjs';
import testApi from '../test-api.mjs';

const { DEFAULT, SESSION_TOKEN } = myFinancesCommon.constants;
testApi(async ({ addAsserts, api, createSuperuser, test, testHash }) => {
  const journey = {
    credentials: {
      authId: testHash,
      description: `user-${testHash}`,
      email: `${testHash.slice(0, 12)}@acme.org`,
      pwd: random.hash(),
    },
  };
  const superuser = await createSuperuser({ createSession: true });

  // user - round #1

  await test('creates user ok', async (t) => {
    const { body, status } = await api
      .post('/account/personal/users')
      .send(journey.credentials);
    t.equal(status, 200, 'creates user');
    if (status === 200) {
      journey.user = body;
      journey.defaultModel = body.models[DEFAULT];
    }
    t.end();
  });

  await test('creates session ok', async (t) => {
    const { body, headers, status } = await api
      .post('/sessions')
      .send(journey.credentials);
    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      journey.sessionHeaders = {
        [SESSION_TOKEN]: body.sessionId,
        Cookie: headers['set-cookie'],
      };
    }
    t.end();
  });

  await test('user can delete model', async(t) => {
    const { defaultModel, sessionHeaders, user } = journey;
    const { status } = await api
      .delete(`/account/personal/user/${user.id}/models/${defaultModel.id}`)
      .set(sessionHeaders);
    t.equal(status, 204, 'should be a 204');
    t.end();
  });

  await test('model no longer exists', async(t) => {
    const { defaultModel, sessionHeaders, user } = journey;
    const { status } = await api
      .get(`/account/personal/user/${user.id}/models/${defaultModel.id}`)
      .set(sessionHeaders);
    t.equal(status, 404, 'should be a 404');
    t.end();
  })

  await test('user can delete themselves (if they have no model)', async(t) => {
    const { sessionHeaders, user } = journey;
    const { status } = await api
      .delete(`/account/personal/user/${user.id}`)
      .set(sessionHeaders);
    t.equal(status, 204, 'should be a 204');
    t.end();
  });

  await test('user no longer exists', async(t) => {
    const { user } = journey;
    const { status } = await api
      .get(`/account/personal/user/${user.id}`)
      .set(superuser.sessionHeaders);
    t.equal(status, 404, 'should be a 404');
    t.end();
  });

  // user - round #2

  await test('creates user ok', async (t) => {
    const { body, status } = await api
      .post('/account/personal/users')
      .send(journey.credentials);
    t.equal(status, 200, 'creates user');
    if (status === 200) {
      journey.user = body;
      journey.defaultModel = body.models[DEFAULT];
    }
    t.end();
  });

  await test('creates session ok', async (t) => {
    const { body, headers, status } = await api
      .post('/sessions')
      .send(journey.credentials);
    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      journey.sessionHeaders = {
        [SESSION_TOKEN]: body.sessionId,
        Cookie: headers['set-cookie'],
      };
    }
    t.end();
  });

  await test('user can delete themselves even if they have models', async(t) => {
    const { sessionHeaders, user } = journey;
    const { status } = await api
      .delete(`/account/personal/user/${user.id}`)
      .set(sessionHeaders);
    t.equal(status, 204, 'should be a 204');
    t.end();
  });

  await test('user no longer exists', async(t) => {
    const { user } = journey;
    const { status } = await api
      .get(`/account/personal/user/${user.id}`)
      .set(superuser.sessionHeaders);
    t.equal(status, 404, 'should be a 404');
    t.end();
  });

});
