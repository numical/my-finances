const createPersonalAccount = require('./create-personal-account');

const run = async () => {
  try {
    await createPersonalAccount();
  } catch (err) {
    console.log(err);
  }
};

run();
