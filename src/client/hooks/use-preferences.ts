import { useReducer, useEffect, useCallback } from 'react';

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
}

/**
 * Custom hook demonstrating useReducer with optional localStorage persistence.
 *
 * Usage:
 *   const { preferences, setFontSize, toggleSidebar } = usePreferences();
 *   const { preferences } = usePreferences({ persist: false }); // no persistence
 */
export const usePreferences = (options: UsePreferencesOptions = {}) => {
  const { persist = true } = options;
  const [preferences, dispatch] = useReducer(preferencesReducer, defaultPreferences);

  // Restore from localStorage on mount
  useEffect(() => {
    if (!persist) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PreferencesState;
        dispatch({ type: 'RESTORE', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to restore preferences:', error);
    }
  }, [persist]);

  // Save to localStorage on change
  useEffect(() => {
    if (!persist) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [preferences, persist]);

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
