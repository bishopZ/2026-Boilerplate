import { configureStore, type Middleware } from '@reduxjs/toolkit';
import playerReducer from './player';
import { encrypt } from '@/client/shared/encryption';
import { type PlayerState } from './player-actions';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';

type GenericObject = Record<string, unknown>;
interface LocalState { player: PlayerState}

const saveToLocalStorage: Middleware<GenericObject, LocalState> = storeAPI => next => action => {
  // debounce to ensure we get the latest state
  setTimeout(() => {
    try {
      const { player } = storeAPI.getState();
      const { encryptionKey } = player;
      if (encryptionKey) {
        const encryptedState = encrypt(JSON.stringify(player), encryptionKey);
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
  return next(action);
};

export const store = configureStore({
  reducer: {
    // Add additional reducers here
    player: playerReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    // Add any additional middleware here
    .concat(saveToLocalStorage),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
