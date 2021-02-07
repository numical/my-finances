import genericStore from './generic-store';
import { authInitial, modelsInitial, userInitial } from './states';

export const authStore = genericStore(authInitial);

export const modelsStore = genericStore(modelsInitial);

export const userStore = genericStore(userInitial);
