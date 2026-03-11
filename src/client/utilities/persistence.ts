import { type Middleware } from '@reduxjs/toolkit';
import { reportError } from './error-reporting';

interface StorageWriterOpts<State> {
  storageKey: string;
  context: string;
  throttleMs?: number;
  serialize: (state: State) => string | null | Promise<string | null>;
}

interface PersistedSliceConfig<RootState, SliceState> {
  selectSlice: (state: RootState) => SliceState;
  storageKey: string;
  context: string;
  throttleMs?: number;
  serialize: (sliceState: SliceState) => string | null | Promise<string | null>;
}

const MIN_THROTTLE_MS = 100;

const getThrottleMs = (throttleMs?: number) => Math.max(MIN_THROTTLE_MS, throttleMs ?? MIN_THROTTLE_MS);

/**
 * Creates a throttled localStorage writer with minimum 100ms delay.
 * Shared by hooks and Redux persistence middleware.
 */
export const createStorageWriter = <State>({
  storageKey,
  context,
  throttleMs,
  serialize,
}: StorageWriterOpts<State>) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestState: State | null = null;

  const flush = async () => {
    if (latestState === null) {
      return;
    }

    try {
      const serialized = await serialize(latestState);
      if (serialized === null) {
        return;
      }

      localStorage.setItem(storageKey, serialized);
    } catch (error) {
      reportError(error, { context });
    }
  };

  return (state: State) => {
    latestState = state;

    if (timeoutId !== null) {
      return;
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      void flush();
    }, getThrottleMs(throttleMs));
  };
};

export const loadJsonFromStorage = (storageKey: string, context: string): unknown => {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as unknown;
  } catch (error) {
    reportError(error, { context });
    return null;
  }
};

/**
 * Registers persistence behavior for one Redux slice.
 * Keeps select + serialize type-safe as a pair.
 */
export const persistSlice = <RootState, SliceState>({
  selectSlice,
  storageKey,
  context,
  throttleMs,
  serialize,
}: PersistedSliceConfig<RootState, SliceState>) => {
  const write = createStorageWriter<SliceState>({
    storageKey,
    context,
    throttleMs,
    serialize,
  });

  return (state: RootState) => {
    write(selectSlice(state));
  };
};

/**
 * Creates Redux middleware from registered slice persistors.
 */
export const createPersistenceMiddleware = <RootState>(
  slicePersistors: ((state: RootState) => void)[]
): Middleware<Record<string, unknown>, RootState> => {
  if (typeof window === 'undefined') {
    return () => next => action => next(action);
  }

  return storeAPI => next => action => {
    const result = next(action);
    const state = storeAPI.getState();

    for (const persist of slicePersistors) {
      persist(state);
    }

    return result;
  };
};
