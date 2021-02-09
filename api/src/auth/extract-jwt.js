const { promisify } = require('util');
const { verify } = require('jsonwebtoken');
const getSecret = require('./get-secret');

const extract = promisify(verify);

const options = {
  algorithms: ["HS256"]
};

module.exports = async(payload) => {
  const secret = await getSecret();
  return extract(payload, secret, options);
};