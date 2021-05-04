const addModel = require('./add-model');
const addUser = require('./add-user');
const createAccount = require('./create-account');
const createSession = require('./create-session');
const createUser = require('./create-user');
const deleteAccount = require('./delete-account');
const deleteModel = require('./delete-model');
const deleteUser = require('./delete-user');
const getModel = require('./get-model');
const getUser = require('./get-user');
const ping = require('./ping');
const updateModel = require('./update-model');
const updateUser = require('./update-user');
const { createCallbacks } = require('./util');

const endPoints = [
  createUser, // this comes first deliberately
  addModel,
  addUser,
  createAccount,
  createSession,
  deleteAccount,
  deleteModel,
  deleteUser,
  getModel,
  getUser,
  ping,
  updateModel,
  updateUser,
];

const init = ({ app, config }) => {
  for (const endPoint of endPoints) {
    const { path, verb } = endPoint;
    app[verb](path, ...createCallbacks({ config, endPoint }));
  }
};

module.exports = {
  init,
};
