const { deepStrictEqual } = require('assert');
const { Firestore } = require('@google-cloud/firestore');
const { constants } = require('my-finances-common');
const { version } = require('../../package.json');
const { SUPERUSER } = require('../roles');
const hash = require('./hash');

const { PERSONAL_ACCOUNTS } = constants;

const report = console.log;

const createSuperUser = async ({ email, pwd }) => {
  report(`creating superuser '${email}'...`);

  const db = new Firestore();

  const query = db.collectionGroup('users').where('email', '==', email);
  const querySnapshot = await query.get();
  if (querySnapshot.size > 0) {
    throw new Error(`User '${email}' already exists.`);
  }

  const collectionRef = db
    .collection('accounts')
    .doc(PERSONAL_ACCOUNTS)
    .collection('users');

  const toCreate = {
    authId: hash(email),
    email,
    pwd: hash(`${email}:${pwd}`),
    accountId: PERSONAL_ACCOUNTS,
    roles: [SUPERUSER],
    lastUpdated: Date.now(),
    version,
  };

  const docRef = await collectionRef.add(toCreate);

  const checkDocRef = db.doc(
    `/accounts/${PERSONAL_ACCOUNTS}/users/${docRef.id}`
  );
  const snapshot = await checkDocRef.get();
  if (snapshot.exists) {
    const created = snapshot.data();
    deepStrictEqual(created, toCreate);
  }

  report(`...superuser '${email}' created and confirmed.`);
};

module.exports = createSuperUser;
