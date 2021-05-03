module.exports = {
  // based on observation of firestore
  dbid: /^[\da-z]{20}$/i,
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression#answer-8829363
  email: /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?$/i,
  // based on SHA-256 so 64 characters
  hash: /^[\da-f]{64}$/i,
  // trial and error
  semver: /^\d+\.\d+\.\d+$/i,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: /^(?:urn:uuid:)?[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i,
};
