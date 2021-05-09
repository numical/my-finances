import { promisify } from 'util';

import jsonwebtoken from 'jsonwebtoken';

import config from '../config/index.mjs';

import getSecret from './get-secret.mjs';

const { sign } = jsonwebtoken;
const generate = promisify(sign);
export default async (payload) => {
  const expiresIn = config.sessionTimeoutInSeconds;
  const secret = await getSecret();
  return generate(payload, secret, { expiresIn });
};
