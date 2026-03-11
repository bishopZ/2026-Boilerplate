export const AUTH_PROFILES = {
  LOCAL: 'local',
  SUPABASE: 'supabase',
  POSTGRES: 'postgres',
} as const;

export type AuthProfile = typeof AUTH_PROFILES[keyof typeof AUTH_PROFILES];

const isAuthProfile = (value: string): value is AuthProfile => {
  return Object.values(AUTH_PROFILES).includes(value as AuthProfile);
};

export const getAuthProfile = (): AuthProfile => {
  const rawProfile = process.env.AUTH_PROFILE?.trim().toLowerCase();
  if (!rawProfile) {
    return AUTH_PROFILES.LOCAL;
  }

  if (isAuthProfile(rawProfile)) {
    return rawProfile;
  }

  return AUTH_PROFILES.LOCAL;
};

export const isExternalAuthProfile = (profile: AuthProfile): boolean => {
  return profile !== AUTH_PROFILES.LOCAL;
};
