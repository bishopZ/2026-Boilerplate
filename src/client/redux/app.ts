import { createSlice } from '@reduxjs/toolkit';
import { defaultState, appActions } from './app-actions';

const appSlice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: appActions,
});

export const { setLastEditId, setSearchPhrase, resetAppState } = appSlice.actions;
export default appSlice.reducer;
