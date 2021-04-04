import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';

let email, emailHash, pwdHash;
authStore.subscribe((auth) => {
  email = auth.email;
  emailHash = auth.emailHash;
  pwdHash = auth.pwdHash;
});

const createUser = async () => {
  const body = {
    authId: emailHash,
    email,
    pwd: pwdHash,
  };

  const user = await wrapFetch('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  authStore.setValues({
    emailHash: user.authId,
    pwdHash: user.pwd,
  });

  return user;
};

export default createUser;
