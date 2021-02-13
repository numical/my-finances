import { get } from 'svelte/store';
import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';

export default async () => {
  const { userId } = get(authStore);
  const path = `/user/${userId}`;
  return wrapFetch(path);
};
