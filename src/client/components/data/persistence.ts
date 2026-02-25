import { Middleware } from '@reduxjs/toolkit';
import { encrypt } from '@/client/shared/encryption';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';

interface PersistableState {
  encryptionKey: string | null;
}

interface PersistConfig {
  sliceKeys: string[];
}

/**
 * Creates a reusable middleware that persists specified Redux slices
 * to encrypted localStorage. Any slice listed in `sliceKeys` will be
 * saved whenever the store updates.
 *
 * Usage:
 *   createPersistMiddleware({ sliceKeys: ['player', 'game'] })
 */
export const createPersistMiddleware = (config: PersistConfig): Middleware => {
  return storeAPI => next => action => {
    const result = next(action);

    setTimeout(() => {
      try {
        const state = storeAPI.getState() as Record<string, PersistableState>;
        const { encryptionKey } = state.player;

        if (encryptionKey) {
          const stateToPersist: Record<string, unknown> = {};
          for (const key of config.sliceKeys) {
            stateToPersist[key] = state[key];
          }

          const encryptedState = encrypt(JSON.stringify(stateToPersist), encryptionKey);
          if (encryptedState) {
            localStorage.setItem(LOCAL_STORAGE_ID, encryptedState);
          } else {
            console.error('Failed to encrypt state');
          }
        }
      } catch (error) {
        console.error('Failed to save state to localStorage:', error);
      }
    }, 0);

    return result;
  };
};
