import { get } from 'svelte/store';
import wrapFetch from './wrap-fetch';
import { authStore } from '../stores';

export default async () => {
  const { id } = get(authStore);
  const path = `/user/${id}`;
  return wrapFetch(path);
};
