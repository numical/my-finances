const { test } = require('tap');
const { DEFAULT_TEST_LOG_LEVEL } = require('../src/config');
const { random } = require('../src/util');
const createApp = require('../src/app');
const request = require('supertest');
const superuserFactory = require('./superuser-factory');
const addAsserts = require('./add-asserts');

const BAILOUT = new Error('Test bailed.');

const customize = (collectionSuffix) => {
  const level = process.env.LOG_LEVEL || DEFAULT_TEST_LOG_LEVEL;
  const dataSource = process.env.DATASOURCE || 'memory';
  const dataSourceOptions =
    dataSource === 'firestore' ? { collectionSuffix } : {};
  return {
    config: {
      dataSource,
      dataSourceOptions,
      log: {
        level,
      },
    },
  };
};

const testThrowsWhenBailed = async (description, callback) => {
  const result = await test(description, callback);
  if (!result) {
    throw BAILOUT;
  } else if (result.bailedOut) {
    throw BAILOUT;
  } else {
    return result;
  }
};

module.exports = async (tests) => {
  const testHash = random.hash();
  const { app, dataStores } = await createApp(customize(testHash));
  const api = request.agent(app);
  const createSuperuser = superuserFactory({ api, dataStores });
  try {
    await tests({
      addAsserts,
      api,
      createSuperuser,
      testHash,
      test: testThrowsWhenBailed,
    });
  } catch (error) {
    if (error !== BAILOUT) {
      throw error;
    }
  } finally {
    console.log(`(test hash is ${testHash})`);
  }
};
