const { test } = require('tap');
const createApp = require('../../src/app');
const request = require('supertest');

class BailoutError extends Error {}

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

const runTest = async (description, callback) => {
  const result = await test(description, { bail: true }, callback);
  if (result.bailedOut) {
    throw new BailoutError(`Test '${description}' failed`);
  } else {
    return result;
  }
};

module.exports = async (tests) => {
  const app = await createApp(customize);
  const server = request.agent(app);
  try {
    await tests(server, runTest);
  } catch (err) {
    if (err instanceof BailoutError) {
      // swallow
    } else {
      throw err;
    }
  }
};
