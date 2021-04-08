const { randomBytes } = require('crypto');

const hash = () => randomBytes(32).toString('hex');

const string = (length) => {
  if (length % 2 !== 0) throw new Error('random string length must be even');
  return randomBytes(length / 2).toString('utf8');
};

module.exports = {
  hash,
  string,
};
