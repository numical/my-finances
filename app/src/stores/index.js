import genericStore from './generic-store';
import { authState } from './initialStates';

export const authStore = genericStore(authState);
