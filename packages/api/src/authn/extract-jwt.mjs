import { promisify } from 'util';

import jsonwebtoken from 'jsonwebtoken';

import getSecret from './get-secret.mjs';

const { verify } = jsonwebtoken;
const extract = promisify(verify);
const options = {
  algorithms: ['HS256'],
};

export default async (payload) => {
  const secret = await getSecret();
  return extract(payload, secret, options);
};
