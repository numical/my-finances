const { test } = require('tap');
const { DEFAULT_TEST_LOG_LEVEL } = require('../src/config');
const { random } = require('../src/util');
const createApp = require('../src/app');
const request = require('supertest');

const BAILOUT = new Error();

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
  try {
    await tests({ api, dataStores, testHash, test: testThrowsWhenBailed });
  } catch (err) {
    if (err !== BAILOUT) {
      throw err;
    }
  } finally {
    console.log(`(test hash is ${testHash})`);
  }
};
