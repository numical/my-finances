import { writable } from 'svelte/store';

export default (initialState) => {
  const store = writable({
    ...initialState,
  });

  // do not override default Svelte 'set' method
  store.setValue = (key, value) =>
    store.update((state) => ({
      ...state,
      [key]: value,
    }));

  store.setValues = (values) =>
    store.update((state) => ({
      ...values,
      state,
    }));

  return store;
};
