import { reportError } from './error-reporting';

const CRYPTO_VERSION = 1;
const PBKDF2_ITERATIONS = 100000;
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

interface EncryptedPayload {
  version: number;
  salt: string;
  initializationVector: string;
  ciphertext: string;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const getSubtleCrypto = () => globalThis.crypto.subtle;

const bytesToBase64 = (bytes: Uint8Array): string => {
  return btoa(String.fromCharCode(...bytes));
};

const base64ToBytes = (value: string): Uint8Array => {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
};

const deriveAesKey = async (secret: string, salt: Uint8Array): Promise<CryptoKey> => {
  const subtle = getSubtleCrypto();
  const keyMaterial = await subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
};

// Encrypts text using AES-GCM with PBKDF2-derived key material.
// Used to persist Redux state to localStorage securely.
export const encrypt = async (text: string, key: string): Promise<string | null> => {
  try {
    const subtle = getSubtleCrypto();

    const salt = globalThis.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const aesKey = await deriveAesKey(key, salt);

    const encryptedBuffer = await subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      textEncoder.encode(text)
    );

    const payload: EncryptedPayload = {
      version: CRYPTO_VERSION,
      salt: bytesToBase64(salt),
      initializationVector: bytesToBase64(iv),
      ciphertext: bytesToBase64(new Uint8Array(encryptedBuffer)),
    };

    return JSON.stringify(payload);
  } catch (error) {
    reportError(error, { context: 'encryption' });
    return null;
  }
};

// Decrypts AES-GCM payload text using the provided key.
// Returns the decrypted string, or empty string on failure.
export const decrypt = async (text: string, key: string): Promise<string> => {
  try {
    const subtle = getSubtleCrypto();

    const payload = JSON.parse(text) as Partial<EncryptedPayload>;
    if (
      payload.version !== CRYPTO_VERSION
      || typeof payload.salt !== 'string'
      || typeof payload.initializationVector !== 'string'
      || typeof payload.ciphertext !== 'string'
    ) {
      reportError('Unsupported encrypted payload format', { context: 'decryption' });
      return '';
    }

    const salt = base64ToBytes(payload.salt);
    const iv = base64ToBytes(payload.initializationVector);
    const encryptedData = base64ToBytes(payload.ciphertext);
    const aesKey = await deriveAesKey(key, salt);
    const decryptedBuffer = await subtle.decrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encryptedData
    );

    const decrypted = textDecoder.decode(decryptedBuffer);
    if (!decrypted) {
      reportError('Decryption produced empty result', { context: 'decryption' });
    }
    return decrypted;
  } catch (error) {
    reportError(error, { context: 'decryption' });
    return '';
  }
};
