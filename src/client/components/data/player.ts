import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultState, initPlayer, playerActions, PlayerState } from './player-actions';
import { GameState } from './game';

interface InitResult {
  player: PlayerState;
  game: GameState;
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: defaultState,
  reducers: playerActions,
  extraReducers: builder => {
    builder
      .addCase(initPlayer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initPlayer.fulfilled, (state, action: PayloadAction<InitResult>) => {
        Object.assign(state, action.payload.player);
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
