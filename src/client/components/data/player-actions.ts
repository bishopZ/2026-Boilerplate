import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
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
  async () => {
    let key: string | null = null;

    // Try to get encryption key from server
    try {
      const response = await fetch('/api/key');
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        // Only try to parse JSON if the response is actually JSON
        if (contentType?.includes('application/json')) {
          try {
            const { key: responseKey } = await response.json() as { key: string; };
            if (responseKey) {
              key = responseKey;
            }
          } catch (parseError) {
            console.error('Failed to parse key response:', parseError);
            // Continue without key - will use defaultState
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch encryption key:', error);
      // Continue without key - will use defaultState
    }

    // Try to read from localStorage if we have a key
    if (key) {
      try {
        const storedState = localStorage.getItem(LOCAL_STORAGE_ID);
        if (storedState) {
          const decrypted = decrypt(storedState, key);
          if (decrypted) {
            try {
              const result = JSON.parse(decrypted) as PlayerState;
              return { ...result, encryptionKey: key };
            } catch (parseError) {
              console.error('Failed to parse decrypted player data:', parseError);
              // Clear corrupted localStorage and continue with defaultState
              localStorage.removeItem(LOCAL_STORAGE_ID);
            }
          }
        }
      } catch (error) {
        console.error('Failed to read from localStorage:', error);
        // Continue with defaultState
      }
    }

    // Return default state (with key if we got one, otherwise null)
    // The middleware will save it to localStorage if we have a key
    return { ...defaultState, encryptionKey: key };
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
