const { createHash } = require('crypto');

module.exports = (s) => {
  const hash = createHash('sha256');
  hash.update(s);
  return hash.digest('hex');
};
