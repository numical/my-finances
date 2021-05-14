const { promisify } = require('util');
const { sign } = require('jsonwebtoken');
const config = require('../config');
const getSecret = require('./get-secret');

const generate = promisify(sign);

module.exports = async (payload) => {
  const expiresIn = config.sessionTimeoutInSeconds;
  const secret = await getSecret();
  return generate(payload, secret, { expiresIn });
};
