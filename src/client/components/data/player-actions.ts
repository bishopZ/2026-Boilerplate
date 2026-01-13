import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { decrypt } from '@/client/shared/encryption';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';

const SCHEMA_VERSION = '1.0.0';

export const defaultState = {
  schemaVersion: SCHEMA_VERSION,
  score: 0,
  encryptionKey: null as string | null,
  loading: false,
  error: null as string | null,
};

// Infer Type from defaultState
export type PlayerState = typeof defaultState;

// After authentication, the `initPlayer` action requests
// the encryption key from the server and decrypts the stored state.
export const initPlayer = createAsyncThunk(
  'player/initPlayer', // namespace
  /* eslint-disable-next-line max-statements */
  async () => {
    try {
      const response = await fetch('/api/key');
      if (!response.ok) {
        console.error('Failed to fetch player data: HTTP error', response.status);
        return { ...defaultState, encryptionKey: null };
      }

      let key: string;
      try {
        const jsonData = await response.json() as { key: string; };
        if (!jsonData?.key) {
          throw new Error('Invalid response format: missing key');
        }
        key = jsonData.key;
      } catch (parseError) {
        console.error('Failed to parse key response:', parseError);
        return { ...defaultState, encryptionKey: null };
      }

      const storedState = localStorage.getItem(LOCAL_STORAGE_ID) ?? null;

      if (!storedState) {
        return { ...defaultState, encryptionKey: key };
      }

      const decrypted = decrypt(storedState, key);
      if (!decrypted) {
        // Decryption failed or produced empty result, clear corrupted localStorage and return default state with key
        localStorage.removeItem(LOCAL_STORAGE_ID);
        return { ...defaultState, encryptionKey: key };
      }

      try {
        const result = JSON.parse(decrypted) as PlayerState;
        return { ...result, encryptionKey: key };
      } catch (parseError) {
        // JSON parse failed, clear corrupted localStorage and return default state with key
        console.error('Failed to parse decrypted player data', parseError);
        localStorage.removeItem(LOCAL_STORAGE_ID);
        return { ...defaultState, encryptionKey: key };
      }
    } catch (error) {
      console.error('Failed to fetch player data: Network error', error);
      // On network error, clear potentially corrupted localStorage and return default state
      try {
        localStorage.removeItem(LOCAL_STORAGE_ID);
      } catch {
        // Ignore errors when clearing localStorage
      }
      return { ...defaultState, encryptionKey: null };
    }
  }
);


// Player actions that don't require async.
export const playerActions = {
  increment: (state: PlayerState) => {
    state.score += 1;
  },
  decrement: (state: PlayerState) => {
    state.score -= 1;
  },
  incrementByAmount: (state: PlayerState, action: PayloadAction<number>) => {
    state.score += action.payload;
  }
};
