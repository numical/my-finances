const https = require('https');
const { existsSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { static } = require('express');
const { init } = require('../../packages/api/src/app');

const validatedPath = (relativePath) => {
  const absolutePath = resolve(__dirname, relativePath);
  if (!existsSync(absolutePath)) {
    console.log(`Missing file/path '${absolutePath}'`);
    process.exit(1);
  }
  return absolutePath;
};

const paths = {
  keyFile: validatedPath('../certs/localhost-key.pem'),
  certFile: validatedPath('../certs/localhost-cert.pem'),
  webRoot: validatedPath('../../public/alpha'),
};

const addFileServing = (app) => {
  app.use(static(paths.webRoot));
};

const customise = {
  middleware: addFileServing,
  log: {
    level: 'debug',
  },
};

const httpsOptions = {
  key: readFileSync(paths.keyFile),
  cert: readFileSync(paths.certFile),
};

const port = process.env.PORT || 8080;

init(customise).then((app) => {
  https.createServer(httpsOptions, app).listen(port, (err) => {
    if (err) {
      console.error(`my-finances API failed to start on port ${port}`, err);
    } else {
      console.log(`my-finances API listening on port ${port}`);
    }
  });
});
