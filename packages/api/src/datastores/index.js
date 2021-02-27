const { FinancialModelFirestore, UserFirestore } = require('./firestore');
const InMemory = require('./memory/InMemory');

module.exports = {
  users: {
    memory: InMemory,
    firestore: UserFirestore,
  },
  financialModels: {
    memory: InMemory,
    firestore: FinancialModelFirestore,
  },
};
