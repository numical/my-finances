const Firestore = require('./Firestore');

class KeyStores extends Firestore {
  constructor() {
    super({ ...args, collection: 'keyStores' });
  }
}

module.exports = KeyStores;
