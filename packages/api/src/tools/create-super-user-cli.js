const inquirer = require('inquirer');
const { evaluatePassword } = require('my-finances-common');
const { formats } = require('../schemas');
const createSuperUser = require('./create-super-user');

const ask = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Email for superuser:',
      validate: (email) =>
        formats.email.test(email) ? true : 'not a valid email format',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password for superuser:',
      validate: (pwd) =>
        evaluatePassword.passes(pwd, 10) ? true : 'password not strong enough',
    },
    {
      type: 'password',
      name: 'password2',
      message: 'Please repeat the password:',
      validate: (pwd, answers) =>
        pwd === answers.password ? true : 'passwords do not match',
    },
  ]);

const run = async () => {
  try {
    const answers = await ask();
    await createSuperUser(answers);
  } catch (error) {
    console.log(error);
  }
};

run();
