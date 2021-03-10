const { FinancialModels, Users } = require('./firestore');
const InMemory = require('./memory/InMemory');

module.exports = {
  users: {
    memory: InMemory,
    firestore: Users,
  },
  financialModels: {
    memory: InMemory,
    firestore: FinancialModels,
  },
};
