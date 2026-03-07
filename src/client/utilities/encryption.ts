import CryptoJS from 'crypto-js';
import { reportError } from './error-reporting';

// Encrypts text using AES with the provided key.
// Used to persist Redux state to localStorage securely.
export const encrypt = (text: string, key: string) => {
  try {
    const result = CryptoJS.AES.encrypt(text, key);
    return result.toString();
  } catch (error) {
    reportError(error, { context: 'encryption' });
  }
};

// Decrypts AES-encrypted text using the provided key.
// Returns the decrypted string, or empty string on failure.
export const decrypt = (text: string, key: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      reportError('Decryption produced empty result', { context: 'decryption' });
    }
    return decrypted;
  } catch (error) {
    reportError(error, { context: 'decryption' });
    return '';
  }
};
