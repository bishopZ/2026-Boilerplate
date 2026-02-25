import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { defaultState, initPlayer, playerActions } from './player-actions';

export const playerSlice = createSlice({
  name: 'player',
  initialState: defaultState,
  reducers: playerActions, // non-async actions
  extraReducers: builder => {
    // Handle async actions
    builder
      .addCase(initPlayer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initPlayer.fulfilled, (state, action: PayloadAction<unknown>) => {
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(initPlayer.rejected, state => {
        state.loading = false;
        state.error = 'Failed to initialize player';
      });
  }
});

export const {
  increment,
  decrement,
  incrementByAmount,
} = playerSlice.actions;

export default playerSlice.reducer;
