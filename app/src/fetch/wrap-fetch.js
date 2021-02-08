import { authStore } from '../stores';

const defaultOptions = sessionId => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Csrf-Token': sessionId
  },
});

let sessionId;
authStore.subscribe(auth => {
  sessionId = auth.sessionId;
});

export default async (path, options = {}) => {
  const allOptions = { ...defaultOptions(sessionId), ...options };
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
