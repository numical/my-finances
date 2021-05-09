export const dbid = /^[\da-z]{20}$/i;
export const email = /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?$/i;
export const hash = /^[\da-f]{64}$/i;
export const semver = /^\d+\.\d+\.\d+$/i;
export const uuid = /^(?:urn:uuid:)?[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i;
export default {
  dbid,
  email,
  hash,
  semver,
  uuid,
};
