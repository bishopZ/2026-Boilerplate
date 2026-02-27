import { configureStore, type Middleware } from '@reduxjs/toolkit';
import playerReducer from './player';
import { encrypt } from '@/client/shared/encryption';
import { type PlayerState } from './player-actions';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';
import { reportError } from '@/client/shared/error-reporting';

type GenericObject = Record<string, unknown>;
interface LocalState { player: PlayerState}

const saveToLocalStorage: Middleware<GenericObject, LocalState> = storeAPI => next => action => {
  setTimeout(() => {
    try {
      const { player } = storeAPI.getState();
      const { encryptionKey } = player;
      if (encryptionKey) {
        const encryptedState = encrypt(JSON.stringify(player), encryptionKey);
        if (encryptedState) {
          localStorage.setItem(LOCAL_STORAGE_ID, encryptedState);
        } else {
          reportError('Failed to encrypt state', { context: 'saveToLocalStorage' });
        }
      }
    } catch (error) {
      reportError(error, { context: 'saveToLocalStorage' });
    }
  }, 0);
  return next(action);
};

export const store = configureStore({
  reducer: {
    player: playerReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(saveToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
