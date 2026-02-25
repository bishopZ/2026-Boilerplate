import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { decrypt } from '@/client/shared/encryption';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';
import { GameState, defaultGameState } from './game';

const SCHEMA_VERSION = '1.0.0';

export const defaultState = {
  schemaVersion: SCHEMA_VERSION,
  score: 0,
  encryptionKey: null as string | null,
  loading: false,
  error: null as string | null,
};

export type PlayerState = typeof defaultState;

interface PersistedData {
  player?: PlayerState;
  game?: GameState;
}

export interface InitResult {
  player: PlayerState;
  game: GameState;
}

const fetchEncryptionKey = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/key');
    if (!response.ok) return null;

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) return null;

    const { key } = await response.json() as { key: string; };
    return key || null;
  } catch (error) {
    console.error('Failed to fetch encryption key:', error);
    return null;
  }
};

const restorePersistedState = (key: string): InitResult | null => {
  try {
    const storedState = localStorage.getItem(LOCAL_STORAGE_ID);
    if (!storedState) return null;

    const decrypted = decrypt(storedState, key);
    if (!decrypted) return null;

    const parsed = JSON.parse(decrypted) as PersistedData | PlayerState;

    // Support both old format (flat PlayerState) and new format ({ player, game })
    if ('player' in parsed && typeof parsed.player === 'object') {
      return {
        player: { ...parsed.player, encryptionKey: key },
        game: parsed.game ?? defaultGameState,
      };
    }

    return {
      player: { ...(parsed as PlayerState), encryptionKey: key },
      game: defaultGameState,
    };
  } catch (error) {
    console.error('Failed to restore persisted state:', error);
    localStorage.removeItem(LOCAL_STORAGE_ID);
    return null;
  }
};

export const initPlayer = createAsyncThunk(
  'player/initPlayer',
  async (): Promise<InitResult> => {
    const key = await fetchEncryptionKey();

    if (key) {
      const restored = restorePersistedState(key);
      if (restored) return restored;
    }

    return {
      player: { ...defaultState, encryptionKey: key },
      game: defaultGameState,
    };
  }
);

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
