import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { createThrottledStorageWriter, loadJsonFromStorage } from '@/client/utilities/persistence';

const STORAGE_KEY = '2026-preferences';

interface PreferencesState {
  fontSize: 'small' | 'medium' | 'large';
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
}

type PreferencesAction =
  | { type: 'SET_FONT_SIZE'; payload: PreferencesState['fontSize'] }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'RESET' }
  | { type: 'RESTORE'; payload: PreferencesState };

const defaultPreferences: PreferencesState = {
  fontSize: 'medium',
  sidebarCollapsed: false,
  notificationsEnabled: true,
};

const preferencesReducer = (state: PreferencesState, action: PreferencesAction): PreferencesState => {
  switch (action.type) {
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case 'RESET':
      return defaultPreferences;
    case 'RESTORE':
      return action.payload;
    default:
      return state;
  }
};

interface UsePreferencesOptions {
  persist?: boolean;
  throttleMs?: number;
}

/**
 * Custom hook demonstrating useReducer with optional localStorage persistence.
 *
 * Usage:
 *   const { preferences, setFontSize, toggleSidebar } = usePreferences();
 *   const { preferences } = usePreferences({ persist: false }); // no persistence
 */
export const usePreferences = (options: UsePreferencesOptions = {}) => {
  const { persist = true, throttleMs = 100 } = options;
  const [preferences, dispatch] = useReducer(preferencesReducer, defaultPreferences);
  const persistPreferences = useMemo(() => createThrottledStorageWriter<PreferencesState>({
    storageKey: STORAGE_KEY,
    context: 'usePreferences.persistPreferences',
    throttleMs,
    serialize: currentPreferences => JSON.stringify(currentPreferences),
  }), [throttleMs]);

  // Restore from localStorage on mount
  useEffect(() => {
    if (!persist) {
      return;
    }

    const parsed = loadJsonFromStorage(STORAGE_KEY, 'usePreferences.restorePreferences') as PreferencesState | null;
    if (parsed) {
      dispatch({ type: 'RESTORE', payload: parsed });
    }
  }, [persist]);

  // Save to localStorage on change
  useEffect(() => {
    if (!persist) {
      return;
    }

    persistPreferences(preferences);
  }, [persist, preferences, persistPreferences]);

  const setFontSize = useCallback((size: PreferencesState['fontSize']) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const toggleNotifications = useCallback(() => {
    dispatch({ type: 'TOGGLE_NOTIFICATIONS' });
  }, []);

  const resetPreferences = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    preferences,
    setFontSize,
    toggleSidebar,
    toggleNotifications,
    resetPreferences,
  };
};
