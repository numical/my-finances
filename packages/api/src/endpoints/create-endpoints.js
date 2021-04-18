const addAccountUser = require('./add-account-user');
const createAccount = require('./create-account');
const createCallbacks = require('./create-callbacks');
const createSession = require('./create-session');
const createUser = require('./create-user');
const getModel = require('./get-model');
const getUser = require('./get-user');
const ping = require('./ping');
const updateModel = require('./update-model');
const updateUser = require('./update-user');

const endPoints = [
  createUser, // this comes first deliberately
  addAccountUser,
  createAccount,
  createSession,
  getModel,
  getUser,
  ping,
  updateModel,
  updateUser,
];

module.exports = ({ app, config }) => {
  endPoints.forEach((endPoint) => {
    const { verb, path } = endPoint;
    app[verb](path, ...createCallbacks({ config, endPoint }));
  });
};
