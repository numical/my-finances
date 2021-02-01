import { writable } from 'svelte/store';

const initial = {
  userName: "",
  currentPassword: {
    value: "",
    hash: ""
  },
  state: {
    description: 'not logged in'
  }
};

export const authStore = writable(initial);