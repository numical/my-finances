import { get } from 'svelte/store';
import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';
import { hash } from '../browser-functions';

let email, pwd;
authStore.subscribe((auth) => {
  email = auth.email;
  pwd: auth.pwd;
});

const createUser = async () => {
  const [emailHash, pwdHash] = await Promise.all([
    hash(email),
    hash(email, pwd),
  ]);

  const body = {
    userId: emailHash,
    email,
    pwd: pwdHash,
  };

  const user = await wrapFetch('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  authStore.setValues({
    userId: user.userId,
    pwdHash: user.pwd,
  });

  return user;
};

export default createUser;
