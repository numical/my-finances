module.exports = {
  // based on observation of firestore
  dbid: /^[a-zA-Z0-9]{20}$/i,
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression#answer-8829363
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  // based on SHA-256 > 64 characters
  hash: /^[a-f0-9]{64}$/i,
  // trial and error
  semver: /^[0-9]+\.[0-9]+\.[0-9]+$/i,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
};
