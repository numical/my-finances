const { randomBytes } = require('crypto');

module.exports = (length = 32) => randomBytes(length).toString();
