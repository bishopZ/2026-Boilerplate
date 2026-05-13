import { describe, it, expect, afterEach, vi } from 'vitest';
import { getAuthProfile, isExternalAuthProfile, AUTH_PROFILES } from './auth-profile';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getAuthProfile', () => {
  it('returns "local" when AUTH_PROFILE is not set', () => {
    vi.stubEnv('AUTH_PROFILE', '');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.LOCAL);
  });

  it('returns "local" for AUTH_PROFILE=local', () => {
    vi.stubEnv('AUTH_PROFILE', 'local');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.LOCAL);
  });

  it('returns "supabase" for AUTH_PROFILE=supabase', () => {
    vi.stubEnv('AUTH_PROFILE', 'supabase');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.SUPABASE);
  });

  it('returns "postgres" for AUTH_PROFILE=postgres', () => {
    vi.stubEnv('AUTH_PROFILE', 'postgres');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.POSTGRES);
  });

  it('falls back to "local" for an unrecognised AUTH_PROFILE value', () => {
    vi.stubEnv('AUTH_PROFILE', 'firebase');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.LOCAL);
  });

  it('is case-insensitive', () => {
    vi.stubEnv('AUTH_PROFILE', 'SUPABASE');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.SUPABASE);
  });

  it('trims whitespace', () => {
    vi.stubEnv('AUTH_PROFILE', '  postgres  ');
    expect(getAuthProfile()).toBe(AUTH_PROFILES.POSTGRES);
  });
});

describe('isExternalAuthProfile', () => {
  it('returns false for the local profile', () => {
    expect(isExternalAuthProfile(AUTH_PROFILES.LOCAL)).toBe(false);
  });

  it('returns true for the supabase profile', () => {
    expect(isExternalAuthProfile(AUTH_PROFILES.SUPABASE)).toBe(true);
  });

  it('returns true for the postgres profile', () => {
    expect(isExternalAuthProfile(AUTH_PROFILES.POSTGRES)).toBe(true);
  });
});
