import { createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { decrypt, encrypt } from '@/client/utilities/encryption';
import { LOCAL_STORAGE_ID, API_PATHS } from '@/client/utilities/constants';
import { DEFAULT_LOCALE, type SupportedLocale } from '@/client/utilities/i18n';
import { reportError } from '@/client/utilities/error-reporting';

const SCHEMA_VERSION = '1.0.0';

export const defaultState = {
  schemaVersion: SCHEMA_VERSION,
  score: 0,
  locale: DEFAULT_LOCALE,
  encryptionKey: null as string | null,
  loading: false,
  error: null as string | null,
};

// Infer Type from defaultState
export type PreferencesState = typeof defaultState;

export const serializePreferencesForStorage = (preferences: PreferencesState): string | null => {
  const { encryptionKey } = preferences;
  if (!encryptionKey) {
    return null;
  }

  const encryptedState = encrypt(JSON.stringify(preferences), encryptionKey);
  if (!encryptedState) {
    reportError('Failed to encrypt preferences state', { context: 'serializePreferencesForStorage' });
    return null;
  }

  return encryptedState;
};

// After authentication, the `initPreferences` action requests
// the encryption key from the server and decrypts the stored state.
export const initPreferences = createAsyncThunk(
  'preferences/initPreferences',
  async () => {
    let key: string | null = null;

    // Try to get encryption key from server
    try {
      const response = await fetch(API_PATHS.KEY);
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
            reportError(parseError, { context: 'initPreferences', step: 'parseKeyResponse' });
            // Continue without key - will use defaultState
          }
        }
      }
    } catch (error) {
      reportError(error, { context: 'initPreferences', step: 'fetchEncryptionKey' });
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
              const result = JSON.parse(decrypted) as PreferencesState;
              return { ...result, encryptionKey: key };
            } catch (parseError) {
              reportError(parseError, { context: 'initPreferences', step: 'parseDecryptedData' });
              // Clear corrupted localStorage and continue with defaultState
              localStorage.removeItem(LOCAL_STORAGE_ID);
            }
          }
        }
      } catch (error) {
        reportError(error, { context: 'initPreferences', step: 'readLocalStorage' });
        // Continue with defaultState
      }
    }

    // Return default state (with key if we got one, otherwise null)
    // The middleware will save it to localStorage if we have a key
    return { ...defaultState, encryptionKey: key };
  }
);


// Preferences actions that don't require async.
export const preferencesActions = {
  increment: (state: PreferencesState) => {
    state.score += 1;
  },
  decrement: (state: PreferencesState) => {
    state.score -= 1;
  },
  incrementByAmount: (state: PreferencesState, action: PayloadAction<number>) => {
    state.score += action.payload;
  },
  setLocale: (state: PreferencesState, action: PayloadAction<SupportedLocale>) => {
    state.locale = action.payload;
  },
};
