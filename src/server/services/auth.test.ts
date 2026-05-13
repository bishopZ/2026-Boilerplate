import { describe, it, expect } from 'vitest';
import { hashPassword, localUser } from './auth';

describe('hashPassword', () => {
  it('produces the stored hash for the default test credentials', () => {
    // Regression test: ensures the stored hash in localUser stays in sync
    // with the hashPassword implementation. If either changes, this fails.
    const result = hashPassword('test', localUser.salt);
    expect(result).toBe(localUser.password);
  });

  it('returns a hex string', () => {
    const result = hashPassword('password', 'somesalt');
    expect(result).toMatch(/^[0-9a-f]+$/);
  });

  it('produces different hashes for different passwords', () => {
    const hash1 = hashPassword('password1', 'salt');
    const hash2 = hashPassword('password2', 'salt');
    expect(hash1).not.toBe(hash2);
  });

  it('produces different hashes for different salts', () => {
    const hash1 = hashPassword('password', 'salt1');
    const hash2 = hashPassword('password', 'salt2');
    expect(hash1).not.toBe(hash2);
  });

  it('is deterministic — same inputs always produce the same hash', () => {
    const a = hashPassword('mypassword', 'mysalt');
    const b = hashPassword('mypassword', 'mysalt');
    expect(a).toBe(b);
  });
});
