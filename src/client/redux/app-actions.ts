import { type PayloadAction } from '@reduxjs/toolkit';

export const defaultState = {
  featureFlagOverrides: {} as Record<string, boolean>,
  lastEditId: null as string | null,
  searchPhrase: '',
};

export type AppState = typeof defaultState;

interface FeatureFlagOverridePayload {
  flagName: string;
  enabled: boolean;
}

export const appActions = {
  setFeatureFlagOverride: (state: AppState, action: PayloadAction<FeatureFlagOverridePayload>) => {
    const { flagName, enabled } = action.payload;
    state.featureFlagOverrides[flagName] = enabled;
  },
  clearFeatureFlagOverride: (state: AppState, action: PayloadAction<string>) => {
    state.featureFlagOverrides = Object.fromEntries(
      Object.entries(state.featureFlagOverrides).filter(([flagName]) => flagName !== action.payload)
    );
  },
  setLastEditId: (state: AppState, action: PayloadAction<string | null>) => {
    state.lastEditId = action.payload;
  },
  setSearchPhrase: (state: AppState, action: PayloadAction<string>) => {
    state.searchPhrase = action.payload;
  },
  resetAppState: () => defaultState,
};
