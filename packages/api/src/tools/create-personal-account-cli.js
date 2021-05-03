const createPersonalAccount = require('./create-personal-account');

const run = async () => {
  try {
    await createPersonalAccount();
  } catch (error) {
    console.log(error);
  }
};

run();
