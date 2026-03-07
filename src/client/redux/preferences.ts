import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { defaultState, initPreferences, preferencesActions } from './preferences-actions';

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: defaultState,
  reducers: preferencesActions, // non-async actions
  extraReducers: builder => {
    // Handle async actions
    builder
      .addCase(initPreferences.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initPreferences.fulfilled, (state, action: PayloadAction<unknown>) => {
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(initPreferences.rejected, state => {
        state.loading = false;
        state.error = 'Failed to initialize preferences';
      });
  }
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setLocale,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
