import crypto from 'crypto';
import { ITERATIONS, KEY_LENGTH, DIGEST } from '../config/constants';
import { AUTH_PROFILES, getAuthProfile, isExternalAuthProfile } from '../config/auth-profile';

// Local-only starter account. Use AUTH_PROFILE to move to DB-backed auth.
export const localUser = {
  name: 'Alice',
  email: 'test',
  // hashed value of the password 'test', with salt 'salt123ABC', 100000 iterations
  password: 'a12de93955d83d00dda97797538cebf8b83224ff6d439e36fac2747c923948b7cb5b69c9ac32ec9cdb38c2ed78a2c734d2c36cbc37b27a952d6e365c3945191c',
  salt: 'salt123ABC',
};

type HashFunction = (password: string, salt: string) => string;

export const hashPassword: HashFunction = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString('hex');
};

let hasWarnedAboutAuthProfile = false;

const verifyWithLocalUser = (username: string, password: string) => {
  const user = localUser;
  if (username !== user.email) {
    return null;
  }

  const hashedPassword = hashPassword(password, user.salt);
  if (user.password !== hashedPassword) {
    return null;
  }

  return user;
};

const warnUnsupportedProfile = (profile: string) => {
  if (hasWarnedAboutAuthProfile) {
    return;
  }

  hasWarnedAboutAuthProfile = true;

  console.warn(
    `[auth] AUTH_PROFILE="${profile}" is starter-mode only. ` +
    'Wire real provider verification before enabling production auth backends.'
  );
};

export const verifyUser = (username: string, password: string) => {
  const profile = getAuthProfile();

  if (profile === AUTH_PROFILES.LOCAL) {
    return verifyWithLocalUser(username, password);
  }

  if (isExternalAuthProfile(profile)) {
    warnUnsupportedProfile(profile);
    return null;
  }

  return null;
};

