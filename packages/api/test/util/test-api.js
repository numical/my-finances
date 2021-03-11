const createApp = require('../../src/app');
const request = require('supertest');

const level = process.env.LOG_LEVEL || 'error';

const customize = {
  config: {
    dataSource: 'memory',
    log: {
      level,
    },
  },
};

module.exports = async (tests) => {
  const app = await createApp(customize);
  const server = request.agent(app);
  tests(server);
};
