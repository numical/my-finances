const { test } = require('tap');
const random = require('./random');
const createApp = require('../../src/app');
const request = require('supertest');

const BAILOUT = new Error();

const customize = (collectionSuffix) => {
  const level = process.env.LOG_LEVEL || 'error';
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

const throwWhenBailed = async (description, callback) => {
  const result = await test(description, callback);
  if (result.bailedOut) {
    throw BAILOUT;
  } else {
    return result;
  }
};

module.exports = async (tests) => {
  const testHash = random.hash();
  const app = await createApp(customize(testHash));
  const server = request.agent(app);
  try {
    await tests(server, testHash, throwWhenBailed);
  } catch (err) {
    if (err !== BAILOUT) {
      throw err;
    }
  } finally {
    console.log(`(test hash is ${testHash})`);
  }
};
