const { Users } = require('./firestore');
const InMemory = require('./memory/InMemory');

module.exports = {
  users: {
    memory: InMemory,
    firestore: Users,
  },
};
