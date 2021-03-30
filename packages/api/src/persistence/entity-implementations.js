const { FireStoreUsers } = require('./firestore');
const { InMemoryUsers } = require('./memory');

module.exports = {
  users: {
    memory: InMemoryUsers,
    firestore: FireStoreUsers,
  },
};
