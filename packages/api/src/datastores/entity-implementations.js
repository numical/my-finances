const { FinancialModelFirestore, UserFirestore } = require('./firestore');
const InMemory = require('./memory/InMemory');

module.exports = {
  user: {
    memory: InMemory,
    firestore: UserFirestore
  },
  financialModel: {
    memory: InMemory,
    firestore: FinancialModelFirestore
  }
}