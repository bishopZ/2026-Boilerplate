const FLAG_ENTRY_SEPARATOR = ',';
const FLAG_ASSIGNMENT_SEPARATOR = '=';
const TRUTHY_VALUES = new Set(['1', 'true', 'on', 'yes']);

const normalizeBoolean = (value: string): boolean => {
  return TRUTHY_VALUES.has(value.trim().toLowerCase());
};

export const parseFeatureFlags = (raw: string | undefined): Record<string, boolean> => {
  if (!raw) {
    return {};
  }

  return raw
    .split(FLAG_ENTRY_SEPARATOR)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .reduce<Record<string, boolean>>((accumulator, entry) => {
      const [rawFlagName = '', rawFlagValue = 'false'] = entry.split(FLAG_ASSIGNMENT_SEPARATOR);
      const flagName = rawFlagName.trim();
      if (!flagName) {
        return accumulator;
      }

      accumulator[flagName] = normalizeBoolean(rawFlagValue);
      return accumulator;
    }, {});
};

export const ENV_FEATURE_FLAGS = parseFeatureFlags(import.meta.env.VITE_FEATURE_FLAGS);

export const isFeatureEnabled = (
  flagName: string,
  runtimeOverrides: Record<string, boolean>
): boolean => {
  if (flagName in runtimeOverrides) {
    return runtimeOverrides[flagName];
  }

  return ENV_FEATURE_FLAGS[flagName] ?? false;
};
