import { constants } from 'my-finances-common';
import { authStore } from '../stores';

const { SESSION_TOKEN } = constants;

const DEFAULT_OPTIONS = Object.freeze({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

let sessionId;
authStore.subscribe((auth) => {
  sessionId = auth.sessionId;
});

export default async (path, options = {}) => {
  const allOptions = { ...DEFAULT_OPTIONS, ...options };
  if (sessionId) {
    allOptions.headers[SESSION_TOKEN] = sessionId;
  }
  const response = await fetch(path, allOptions);
  if (response.ok) {
    return response.json();
  } else {
    const err = new Error(
      `Fetch error: ${response.status}: ${response.statusText}`
    );
    err.status = response.status;
    throw err;
  }
};
