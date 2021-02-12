import { Auth } from '../states';
import { authStore } from '../stores';
import wrapFetch from './wrap-fetch';

let userId, pwd;
authStore.subscribe((auth) => {
  userId = auth.userId;
  pwd = auth.pwdHash;
});

export default async () => {
  try {
    authStore.setValue('state', Auth.AUTHENTICATING);

    const body = {
      userId,
      pwd,
    };

    const { sessionId, timeout } = await wrapFetch('/sessions', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    authStore.setValues({
      state: Auth.AUTHENTICATED,
      sessionId,
      timeout,
    });
  } catch (err) {
    authStore.setValue('state', Auth.CHALLENGE);
    throw err;
  }
};
