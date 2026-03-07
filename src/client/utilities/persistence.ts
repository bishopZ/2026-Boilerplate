import { reportError } from './error-reporting';

interface ThrottledStorageWriterOptions<State> {
  storageKey: string;
  context: string;
  throttleMs?: number;
  serialize: (state: State) => string | null;
}

const MIN_THROTTLE_MS = 100;

const getThrottleMs = (throttleMs?: number) => Math.max(MIN_THROTTLE_MS, throttleMs ?? MIN_THROTTLE_MS);

/**
 * Creates a throttled localStorage writer with minimum 100ms delay.
 * Shared by hooks and Redux persistence middleware.
 */
export const createThrottledStorageWriter = <State>({
  storageKey,
  context,
  throttleMs,
  serialize,
}: ThrottledStorageWriterOptions<State>) => {
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
