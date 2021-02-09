const { promisify } = require('util');
const { sign } = require('jsonwebtoken');
const { maxAge } = require('./cookie');
const getSecret = require('./get-secret');

const generate = promisify(sign);
const expiresIn = Math.floor(maxAge/1000);

const options = {
  expiresIn
};

module.exports = async(payload) => {
  const secret = await getSecret();
  return generate(payload, secret, options);
};