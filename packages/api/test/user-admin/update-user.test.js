const { DEFAULT, SESSION_TOKEN } = require('my-finances-common').constants;
const { random } = require('../../src/util');
const testApi = require('../test-api');
const test4xx = require('./test-4xx');

const MODEL_CONTENT = 'This is the model content';

testApi(async ({ addAsserts, api, createSuperuser, testHash, test }) => {
  const journey = {
    credentials: {
      authId: testHash,
      description: `user-${testHash}`,
      email: `${testHash.slice(0, 12)}@acme.org`,
      pwd: random.hash(),
    },
  };

  // user tests

  await test('creates user ok', async (t) => {
    const { status, body } = await api
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
    const { status, body, headers } = await api
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

  await test('can update model', async (t) => {
    const { sessionHeaders, defaultModel, user } = journey;
    defaultModel.data = MODEL_CONTENT;
    const { status } = await api
      .put(`/account/personal/user/${user.id}/models/${defaultModel.id}`)
      .send(defaultModel)
      .set(sessionHeaders);

    t.equal(status, 200, 'should be a 200');

    t.end();
  });

  await test(
    'updating user fails if only authId sent',
    test4xx({
      ...journey,
      api,
      body: { authId: random.hash() },
    })
  );

  await test(
    'updating user fails if only email sent',
    test4xx({
      ...journey,
      api,
      body: { email: `${random.hash()}@acme.org` },
    })
  );

  await test(
    'updating user fails if only password sent',
    test4xx({
      ...journey,
      api,
      body: { pwd: random.hash() },
    })
  );

  await test(
    'updating user fails if password sent with invalid model ids',
    test4xx({
      ...journey,
      api,
      body: {
        pwd: random.hash(),
        models: {
          [DEFAULT]: {
            id: '12345',
          },
        },
      },
    })
  );

  await test('user can update authId and email', async (t) => {
    const { sessionHeaders, user } = journey;
    const { status } = await api
      .patch(`/account/personal/user/${user.id}`)
      .set(sessionHeaders)
      .send({
        authId: random.hash(),
        email: `${random.hash().slice(0, 12)}@acme.org`,
      });

    t.equal(status, 200, 'should be a 200');

    t.end();
  });

  await test('user can update password and models', async (t) => {
    const { sessionHeaders, defaultModel, user } = journey;
    defaultModel.data = 'Updated default data';
    const { status } = await api
      .patch(`/account/personal/user/${user.id}`)
      .set(sessionHeaders)
      .send({
        pwd: random.hash(),
        models: {
          [DEFAULT]: defaultModel,
        },
      });

    t.equal(status, 200, 'should be a 200');

    t.end();
  });

  await test('user can add model', async (t) => {
    const { sessionHeaders, user } = journey;
    const newModel = {
      description: 'new_model_description',
      data: 'new_model_ddata',
    };
    const { status, body: addedModel } = await api
      .post(`/account/personal/user/${user.id}/models`)
      .set(sessionHeaders)
      .send(newModel);

    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      t.ok(addedModel.id, 'added model has an id');
      t.equal(addedModel.data, newModel.data, 'new model properties saved');
      t.equal(
        addedModel.description,
        newModel.description,
        'new model properties saved'
      );
    }

    journey.addedModel = addedModel;
    t.end();
  });

  await test('fetched user has both models', async (t) => {
    const { sessionHeaders, user, defaultModel, addedModel } = journey;
    const { status, body } = await api
      .get(`/account/personal/user/${user.id}`)
      .set(sessionHeaders);

    t.equal(status, 200, 'should be a 200');
    if (status === 200) {
      const { models } = body;
      addAsserts(t);
      t.equal(Object.keys(models).length, 2, 'user should have 2 models');
      t.sameExcept(
        models[DEFAULT],
        defaultModel,
        'lastUpdated',
        'default model is retrieved'
      );
      t.sameExcept(
        models[addedModel.description],
        addedModel,
        'lastUpdated',
        'added model is retrieved'
      );
    }

    t.end();
  });

  // superuser tests

  const superuser = await createSuperuser({ createSession: true });

  await test(
    'superuser cannot update password',
    test4xx({
      ...journey,
      api,
      body: { pwd: random.hash() },
      expectedStatus: 403,
      ...superuser,
    })
  );

  await test(
    'superuser cannot update models',
    test4xx({
      ...journey,
      api,
      body: { models: {} },
      expectedStatus: 403,
      ...superuser,
    })
  );

  await test('superuser can update authId and email', async (t) => {
    const { user } = journey;
    const { sessionHeaders } = superuser;
    const { status } = await api
      .patch(`/account/personal/user/${user.id}`)
      .set(sessionHeaders)
      .send({
        authId: random.hash(),
        email: `${random.hash().slice(0, 12)}@acme.org`,
      });

    t.equal(status, 200, 'should be a 200');

    t.end();
  });

  await test('superuser cannot add model', async (t) => {
    const { user } = journey;
    const { status } = await api
      .post(`/account/personal/user/${user.id}/models`)
      .set(superuser.sessionHeaders)
      .send({
        description: 'new_model_description',
        data: 'new_model_ddata',
      });

    t.equal(status, 403, 'request should be rejected');
  });
});
