const { test } = require('tap');
const createApp = require('../../src/app');
const request = require('supertest');

const BAILOUT = new Error();

const level = process.env.LOG_LEVEL || 'error';
const dataSource = process.env.DATASOURCE || 'memory';

const customize = {
  config: {
    dataSource,
    log: {
      level,
    },
  },
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
  const app = await createApp(customize);
  const server = request.agent(app);
  try {
    await tests(server, throwWhenBailed);
  } catch (err) {
    if (err !== BAILOUT) {
      throw err;
    }
  }
};