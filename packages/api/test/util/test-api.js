const createApp = require('../../src/app');
const request = require('supertest');

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

module.exports = async (tests) => {
  const app = await createApp(customize);
  const server = request.agent(app);
  await tests(server);
};
