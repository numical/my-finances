const createCallbacks = require('./create-callbacks');
const createSession = require('./create-session');
const createUser = require('./create-user');
const getUser = require('./get-user');
const ping = require('./ping');

const endPoints = [createSession, createUser, getUser, ping];

module.exports = ({ app, config }) => {
  endPoints.forEach((endPoint) => {
    const { verb, path } = endPoint;
    app[verb](path, ...createCallbacks({ config, endPoint }));
  });
};
