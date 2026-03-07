import { type PayloadAction } from '@reduxjs/toolkit';

export const defaultState = {
  lastEditId: null as string | null,
  searchPhrase: '',
};

export type AppState = typeof defaultState;

export const appActions = {
  setLastEditId: (state: AppState, action: PayloadAction<string | null>) => {
    state.lastEditId = action.payload;
  },
  setSearchPhrase: (state: AppState, action: PayloadAction<string>) => {
    state.searchPhrase = action.payload;
  },
  resetAppState: () => defaultState,
};
