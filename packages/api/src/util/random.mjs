import { randomBytes } from 'crypto';

const hash = () => randomBytes(32).toString('hex');
const string = (length) => {
  if (length % 2 !== 0) throw new Error('random string length must be even');
  return randomBytes(length / 2).toString('utf8');
};
export { hash };
export { string };
export default {
  hash,
  string,
};
