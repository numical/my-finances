const { FinancialModels, KeyStores, Users } = require('./firestore');
const InMemory = require('./memory/InMemory');

module.exports = {
  users: {
    memory: InMemory,
    firestore: Users,
  },
  keyStore: {
    memory: InMemory,
    firestore: KeyStores,
  },
  financialModels: {
    memory: InMemory,
    firestore: FinancialModels,
  },
};
