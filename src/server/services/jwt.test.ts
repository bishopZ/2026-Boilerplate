import { describe, it, expect } from 'vitest';
import { signToken, verifyToken, type JwtPayload } from './jwt';

// SESSION_SECRET is set to a test value in vitest.config.ts via test.env
// before this module is imported, so JWT_SECRET is populated correctly.

const TEST_PAYLOAD: JwtPayload = { email: 'alice@example.com', name: 'Alice' };

describe('signToken', () => {
  it('returns a non-empty string', () => {
    const token = signToken(TEST_PAYLOAD);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('produces a three-part JWT (header.payload.signature)', () => {
    const token = signToken(TEST_PAYLOAD);
    expect(token.split('.')).toHaveLength(3);
  });
});

describe('verifyToken', () => {
  it('returns the original payload for a valid token', () => {
    const token = signToken(TEST_PAYLOAD);
    const result = verifyToken(token);
    expect(result).not.toBeNull();
    expect(result?.email).toBe(TEST_PAYLOAD.email);
    expect(result?.name).toBe(TEST_PAYLOAD.name);
  });

  it('returns null for a malformed token string', () => {
    expect(verifyToken('not-a-jwt')).toBeNull();
  });

  it('returns null for a token signed with a different secret', () => {
    // Manually craft a token with a wrong secret to simulate tampering
    const tamperedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QifQ.wrongsig';
    expect(verifyToken(tamperedToken)).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(verifyToken('')).toBeNull();
  });
});
