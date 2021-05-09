import addModel from './add-model.mjs';
import addUser from './add-user.mjs';
import createAccount from './create-account.mjs';
import createSession from './create-session.mjs';
import createUser from './create-user.mjs';
import deleteAccount from './delete-account.mjs';
import deleteModel from './delete-model.mjs';
import deleteUser from './delete-user.mjs';
import getModel from './get-model.mjs';
import getUser from './get-user.mjs';
import ping from './ping.mjs';
import updateModel from './update-model.mjs';
import updateUser from './update-user.mjs';
import { createCallbacks } from './util/index.mjs';

const endPoints = [
  createUser,
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
export { init };
export default {
  init,
};
