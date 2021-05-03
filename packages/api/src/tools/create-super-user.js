const { deepStrictEqual } = require('assert');
const { Firestore } = require('@google-cloud/firestore');
const { constants } = require('my-finances-common');
const { addCreatedFields } = require('../endpoints/util');
const { SUPERUSER } = require('../roles');
const hash = require('./hash');

const { PERSONAL_ACCOUNTS } = constants;

const report = console.log;

const createSuperUser = async ({ email, pwd }) => {
  report(`creating superuser '${email}'...`);

  const database = new Firestore();

  const personalAccount = await database
    .doc(`/accounts/${PERSONAL_ACCOUNTS}`)
    .get();
  if (!personalAccount.exists) {
    throw new Error(
      `Account '${PERSONAL_ACCOUNTS}' does not exist to add superuser to`
    );
  }

  const query = database.collectionGroup('users').where('email', '==', email);
  const querySnapshot = await query.get();
  if (querySnapshot.size > 0) {
    throw new Error(`User '${email}' already exists.`);
  }

  const toCreate = addCreatedFields({
    authId: hash(email),
    email,
    pwd: hash(`${email}:${pwd}`),
    accountId: PERSONAL_ACCOUNTS,
    roles: [SUPERUSER],
  });

  const newDocument = await database
    .collection(`/accounts/${PERSONAL_ACCOUNTS}/users`)
    .add(toCreate);

  const retrievedDocument = database.doc(
    `/accounts/${PERSONAL_ACCOUNTS}/users/${newDocument.id}`
  );
  const snapshot = await retrievedDocument.get();
  if (snapshot.exists) {
    const created = snapshot.data();
    deepStrictEqual(created, toCreate);
    report(`...superuser '${email}' created and confirmed.`);
    return created;
  } else {
    throw new Error(`superuser '${email}' was not found after creation.`);
  }
};

module.exports = createSuperUser;
