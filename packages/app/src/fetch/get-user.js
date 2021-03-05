import { get } from 'svelte/store';
import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';

export default async () => {
  const { emailHash } = get(authStore);
  const path = `/user/${emailHash}`;
  return wrapFetch(path);
};
