const { addCreatedFields, addUpdatedFields } = require('./standard-fields');
const createCallbacks = require('./create-callbacks');
const newUserHandler = require('./new-user-handler');

module.exports = {
  addCreatedFields,
  addUpdatedFields,
  createCallbacks,
  newUserHandler,
};
