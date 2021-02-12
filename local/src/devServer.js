const https = require('https');
const { existsSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { static } = require('express');
const { init } = require('../../api/src/app');

const paths = {
  keyFile: resolve(__dirname, '../certs/localhost-key.pem'),
  certFile: resolve(__dirname, '../certs/localhost-cert.pem'),
  webRoot: resolve(__dirname, '../../public/alpha'),
};

const checkPath = ([name, path]) => {
  if (!existsSync(path)) {
    console.log(`${name} missing at '${path}'`);
    process.exit(1);
  }
};

Object.entries(paths).forEach(checkPath);

const addFileServing = (app) => {
  app.use(static(paths.webRoot));
};

const options = {
  key: readFileSync(paths.keyFile),
  cert: readFileSync(paths.certFile),
};

const port = process.env.PORT || 8080;

init(addFileServing).then((app) => {
  https.createServer(options, app).listen(port, (err) => {
    if (err) {
      console.error(`my-finances API failed to start on port ${port}`, err);
    } else {
      console.log(`my-finances API listening on port ${port}`);
    }
  });
});
