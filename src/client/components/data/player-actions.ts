import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { decrypt } from '@/client/shared/encryption';
import { LOCAL_STORAGE_ID } from '@/client/shared/constants';
import { DEFAULT_LOCALE, type SupportedLocale } from '@/client/shared/locales';
import { reportError } from '@/client/shared/error-reporting';

const SCHEMA_VERSION = '1.0.0';

export const defaultState = {
  schemaVersion: SCHEMA_VERSION,
  score: 0,
  locale: DEFAULT_LOCALE,
  encryptionKey: null as string | null,
  loading: false,
  error: null as string | null,
};

export type PlayerState = typeof defaultState;

export const initPlayer = createAsyncThunk(
  'player/initPlayer',
  async () => {
    let key: string | null = null;

    try {
      const response = await fetch('/api/key');
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          try {
            const { key: responseKey } = await response.json() as { key: string; };
            if (responseKey) {
              key = responseKey;
            }
          } catch (parseError) {
            reportError(parseError, { context: 'initPlayer', step: 'parseKeyResponse' });
          }
        }
      }
    } catch (error) {
      reportError(error, { context: 'initPlayer', step: 'fetchEncryptionKey' });
    }

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
              reportError(parseError, { context: 'initPlayer', step: 'parseDecryptedData' });
              localStorage.removeItem(LOCAL_STORAGE_ID);
            }
          }
        }
      } catch (error) {
        reportError(error, { context: 'initPlayer', step: 'readLocalStorage' });
      }
    }

    return { ...defaultState, encryptionKey: key };
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
  },
  setLocale: (state: PlayerState, action: PayloadAction<SupportedLocale>) => {
    state.locale = action.payload;
  },
};
