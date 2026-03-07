import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const appDefaultState = {
  lastEditId: null as string | null,
  searchPhrase: '',
};

export type AppState = typeof appDefaultState;

const appSlice = createSlice({
  name: 'app',
  initialState: appDefaultState,
  reducers: {
    setLastEditId: (state, action: PayloadAction<string | null>) => {
      state.lastEditId = action.payload;
    },
    setSearchPhrase: (state, action: PayloadAction<string>) => {
      state.searchPhrase = action.payload;
    },
    resetAppState: () => appDefaultState,
  },
});

export const { setLastEditId, setSearchPhrase, resetAppState } = appSlice.actions;
export default appSlice.reducer;
