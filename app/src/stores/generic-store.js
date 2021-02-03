import { writable } from 'svelte/store';

export default (initialState) => {
  const store = writable({
    ...initialState,
  });

  // override default Svelte 'set' method
  store.set = (key, value) =>
    store.update((state) => ({
      ...state,
      [key]: value,
    }));

  return store;
};
