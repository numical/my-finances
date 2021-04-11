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

  const personalAccount = await db.doc(`/accounts/${PERSONAL_ACCOUNTS}`).get();
  if (!personalAccount.exists) {
    throw new Error(
      `Account '${PERSONAL_ACCOUNTS}' does not exist to add superuser to`
    );
  }

  const query = db.collectionGroup('users').where('email', '==', email);
  const querySnapshot = await query.get();
  if (querySnapshot.size > 0) {
    throw new Error(`User '${email}' already exists.`);
  }

  const toCreate = {
    authId: hash(email),
    email,
    pwd: hash(`${email}:${pwd}`),
    accountId: PERSONAL_ACCOUNTS,
    roles: [SUPERUSER],
    lastUpdated: Date.now(),
    version,
  };

  const newDocument = await db
    .collection(`/accounts/${PERSONAL_ACCOUNTS}/users`)
    .add(toCreate);

  const retrievedDoc = db.doc(
    `/accounts/${PERSONAL_ACCOUNTS}/users/${newDocument.id}`
  );
  const snapshot = await retrievedDoc.get();
  if (snapshot.exists) {
    const created = snapshot.data();
    deepStrictEqual(created, toCreate);
  } else {
    throw new Error(`superuser '${email}' was not found after creation.`);
  }

  report(`...superuser '${email}' created and confirmed.`);
};

module.exports = createSuperUser;
