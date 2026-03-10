import { describe, expect, it } from 'vitest';
import { fakeUser, hashPassword, verifyUser } from './auth';

describe('auth service', () => {
  it('hashPassword is deterministic for same inputs', () => {
    const firstHash = hashPassword('test-password', 'salt-123');
    const secondHash = hashPassword('test-password', 'salt-123');

    expect(firstHash).toBe(secondHash);
    expect(firstHash).toHaveLength(128);
  });

  it('verifyUser returns user for valid credentials', () => {
    const user = verifyUser(fakeUser.email, 'test');
    expect(user).toEqual(fakeUser);
  });

  it('verifyUser returns null for invalid credentials', () => {
    expect(verifyUser('wrong-user', 'test')).toBeNull();
    expect(verifyUser(fakeUser.email, 'wrong-password')).toBeNull();
  });
});
