const createApp = require('./src/app');

const port = process.env.PORT || 8080;

createApp().then((app) => {
  app.listen(port, (err) => {
    if (err) {
      console.error(`my-finances API failed to start on port ${port}`, err);
    } else {
      console.log(`my-finances API listening on port ${port}`);
    }
  });
});
