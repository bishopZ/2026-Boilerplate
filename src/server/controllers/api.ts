import type { RequestHandler } from 'express';
import type { EncryptionKeyResponse } from '@/generated/api/api-types';

// API endpoint to get the encryption key
export const getKey: RequestHandler = (_, res) => {
  const payload: EncryptionKeyResponse = { key: process.env.LOCAL_STORAGE_KEY ?? null };
  res.send(payload);
};

