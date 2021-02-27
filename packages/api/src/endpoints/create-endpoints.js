const createCallbacks = require('./create-callbacks');
const createSession = require('./create-session');
const createUser = require('./create-user');
const getFinancialModel = require('./get-financial-model');
const getUser = require('./get-user');
const ping = require('./ping');

const endPoints = [createSession, createUser, getFinancialModel, getUser, ping];

module.exports = (app) => {
  endPoints.forEach((endPoint) => {
    const { verb, path } = endPoint;
    app[verb](path, ...createCallbacks(endPoint));
  });
};
