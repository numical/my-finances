const createApp = require('./src/app');

const port = process.env.PORT || 8080;

createApp()
  .then(({ app }) =>
    app.listen(port, (error) => {
      if (error) {
        console.error(`my-finances API failed to start on port ${port}`, error);
      } else {
        console.log(`my-finances API listening on port ${port}`);
      }
    })
  )
  .catch((error) => {
    console.error(`my-finances API errored on startup`, error);
  });
