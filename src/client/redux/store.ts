import { configureStore, type Middleware } from '@reduxjs/toolkit';
import appReducer, { type AppState } from './app';
import preferencesReducer from './preferences';
import { encrypt } from '@/client/utilities/encryption';
import { type PreferencesState } from './preferences-actions';
import { LOCAL_STORAGE_ID } from '@/client/utilities/constants';
import { createThrottledStorageWriter } from '@/client/utilities/persistence';
import { reportError } from '@/client/utilities/error-reporting';

type GenericObject = Record<string, unknown>;
interface LocalState {
  preferences: PreferencesState;
  app: AppState;
}

// Reducers can opt in/out of persistence.
const PERSISTENCE_ENABLED = {
  preferences: true,
  app: false,
} as const;
const shouldPersistPreferences = typeof window !== 'undefined' && PERSISTENCE_ENABLED.preferences;

const persistPreferences = createThrottledStorageWriter<PreferencesState>({
  storageKey: LOCAL_STORAGE_ID,
  context: 'redux.persistPreferences',
  throttleMs: 100,
  serialize: preferences => {
    const { encryptionKey } = preferences;
    if (!encryptionKey) {
      return null;
    }

    const encryptedState = encrypt(JSON.stringify(preferences), encryptionKey);
    if (!encryptedState) {
      reportError('Failed to encrypt preferences state', { context: 'redux.persistPreferences' });
      return null;
    }

    return encryptedState;
  },
});

// Shared persistence middleware pattern that can be reused by reducers as needed.
const saveToLocalStorage: Middleware<GenericObject, LocalState> = storeAPI => next => action => {
  const result = next(action);

  if (shouldPersistPreferences) {
    persistPreferences(storeAPI.getState().preferences);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(saveToLocalStorage),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
