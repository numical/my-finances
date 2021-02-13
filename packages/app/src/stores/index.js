import genericStore from './generic-store';
import { Auth } from '../states';

export const authStore = genericStore(Auth.initial);

export const modelsStore = genericStore();

export const userStore = genericStore();
