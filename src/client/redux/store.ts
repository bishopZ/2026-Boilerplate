import { configureStore } from '@reduxjs/toolkit';
import appReducer, { type AppState } from './app';
import preferencesReducer from './preferences';
import { type PreferencesState, serializePreferencesForStorage } from './preferences-actions';
import { LOCAL_STORAGE_ID } from '@/client/utilities/constants';
import { createPersistenceMiddleware } from '@/client/utilities/persistence';

interface LocalState {
  preferences: PreferencesState;
  app: AppState;
}

const persistenceMiddleware = createPersistenceMiddleware<LocalState>([
  {
    selectSlice: state => state.preferences,
    storageKey: LOCAL_STORAGE_ID,
    context: 'redux.preferences',
    throttleMs: 100,
    serialize: serializePreferencesForStorage,
  },
]);

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(persistenceMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
