import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initPlayer, PlayerState } from './player-actions';

export const defaultGameState = {
  level: 1,
  highScore: 0,
  gamesPlayed: 0,
};

export type GameState = typeof defaultGameState;

interface InitResult {
  player: PlayerState;
  game: GameState;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: defaultGameState,
  reducers: {
    nextLevel: (state) => {
      state.level += 1;
    },
    resetLevel: (state) => {
      state.level = 1;
    },
    recordScore: (state, action: PayloadAction<number>) => {
      state.gamesPlayed += 1;
      if (action.payload > state.highScore) {
        state.highScore = action.payload;
      }
    },
    resetGame: (state) => {
      state.level = defaultGameState.level;
      state.highScore = defaultGameState.highScore;
      state.gamesPlayed = defaultGameState.gamesPlayed;
    },
  },
  extraReducers: builder => {
    builder.addCase(initPlayer.fulfilled, (state, action: PayloadAction<InitResult>) => {
      Object.assign(state, action.payload.game);
    });
  },
});

export const { nextLevel, resetLevel, recordScore, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
