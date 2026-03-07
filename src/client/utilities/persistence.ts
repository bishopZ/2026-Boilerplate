import { type Middleware } from '@reduxjs/toolkit';
import { reportError } from './error-reporting';

interface StorageWriterOpts<State> {
  storageKey: string;
  context: string;
  throttleMs?: number;
  serialize: (state: State) => string | null;
}

interface PersistedSliceConfig<RootState, SliceState> {
  selectSlice: (state: RootState) => SliceState;
  storageKey: string;
  context: string;
  throttleMs?: number;
  serialize: (sliceState: SliceState) => string | null;
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

  const flush = () => {
    if (latestState === null) {
      return;
    }

    try {
      const serialized = serialize(latestState);
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
      flush();
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
 * Creates Redux middleware from persistence registrations.
 * Store code only declares what to persist; persistence mechanics stay here.
 */
export const createPersistenceMiddleware = <RootState>(
  configs: PersistedSliceConfig<RootState, unknown>[]
): Middleware<Record<string, unknown>, RootState> => {
  if (typeof window === 'undefined') {
    return () => next => action => next(action);
  }

  const writers = configs.map((config) => ({
    selectSlice: config.selectSlice,
    write: createStorageWriter<unknown>({
      storageKey: config.storageKey,
      context: config.context,
      throttleMs: config.throttleMs,
      serialize: config.serialize,
    }),
  }));

  return storeAPI => next => action => {
    const result = next(action);
    const state = storeAPI.getState();

    for (const { selectSlice, write } of writers) {
      write(selectSlice(state));
    }

    return result;
  };
};
