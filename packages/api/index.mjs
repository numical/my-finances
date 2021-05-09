const { promisify } = require('util');

const createApp = require('./src/app');

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    const app = await createApp();
    await promisify(app.listen)(port);
    console.log(`my-finances API listening on port ${port}`);
  } catch (error) {
    console.error(`my-finances API errored on startup`, error);
  }
};

start();
