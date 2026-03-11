import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app';
import { type AppState } from './app-actions';
import preferencesReducer from './preferences';
import { type PreferencesState, serializePreferencesForStorage } from './preferences-actions';
import { LOCAL_STORAGE_ID } from '@/client/utilities/constants';
import { createPersistenceMiddleware, persistSlice } from '@/client/utilities/persistence';

interface LocalState {
  preferences: PreferencesState;
  app: AppState;
}

const persistenceMiddleware = createPersistenceMiddleware<LocalState>([
  persistSlice<LocalState, PreferencesState>({
    selectSlice: state => state.preferences,
    storageKey: LOCAL_STORAGE_ID,
    context: 'redux.preferences',
    serialize: serializePreferencesForStorage,
  }),
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
