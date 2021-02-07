import { get } from 'svelte/store';
import { authStore } from '../stores';
import wrapFetch from './wrap-fetch';

export default async () => {
  try {
    authStore.setValue('state', Auth.AUTHENTICATING);
    const { id, pwdHash: pwd } = get(authStore);

    const body = {
      id,
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

    authStore.setValue('timeout', timeout);
  } catch (err) {
    authStore.setValue('state', Auth.CHALLENGE);
    throw err;
  }
};
