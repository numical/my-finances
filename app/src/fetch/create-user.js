import { get } from 'svelte/store';
import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';
import { hash } from '../browser-functions';

const createUser = async () => {
  const { email, pwd } = get(authStore);

  const [emailHash, pwdHash] = await Promise.all([
    hash(email),
    hash(email, pwd),
  ]);

  const body = {
    id: emailHash,
    email,
    pwd: pwdHash,
  };

  const user = await wrapFetch('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  authStore.setValues({
    id: user.id,
    pwdHash: user.pwd,
  });

  return user;
};

export default createUser;
