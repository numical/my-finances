export default {
  dbid: /^[\da-z]{20}$/i,
  email: /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?$/i,
  hash: /^[\da-f]{64}$/i,
  semver: /^\d+\.\d+\.\d+$/i,
  uuid: /^(?:urn:uuid:)?[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i,
};
