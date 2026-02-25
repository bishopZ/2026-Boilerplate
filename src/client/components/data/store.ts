import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './player';
import gameReducer from './game';
import { createPersistMiddleware } from './persistence';

const persistMiddleware = createPersistMiddleware({
  sliceKeys: ['player', 'game'],
});

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
