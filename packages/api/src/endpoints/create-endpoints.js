const createCallbacks = require('./create-callbacks');
const createSession = require('./create-session');
const createUser = require('./create-user');
const getModel = require('./get-model');
const getUser = require('./get-user');
const ping = require('./ping');
const updateModel = require('./update-model');

const endPoints = [
  createSession,
  createUser,
  getModel,
  getUser,
  ping,
  updateModel,
];

module.exports = ({ app, config }) => {
  endPoints.forEach((endPoint) => {
    const { verb, path } = endPoint;
    app[verb](path, ...createCallbacks({ config, endPoint }));
  });
};
