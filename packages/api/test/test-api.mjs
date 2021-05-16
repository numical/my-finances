import request from 'supertest';
import tap from 'tap';

import createApp from '..//src/app.mjs';
import config from '..//src/config/index.mjs';
import { random } from '..//src/util/index.mjs';

import addAsserts from './add-asserts.mjs';
import superuserFactory from './superuser-factory.mjs';

const { test } = tap;
const { DEFAULT_TEST_LOG_LEVEL } = config;
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

export default async (tests) => {
  const testHash = random.hash();
  const { app, datastores } = await createApp(customize(testHash));
  const api = request.agent(app);
  const createSuperuser = superuserFactory({ api, datastores });
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
