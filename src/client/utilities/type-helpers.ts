/**
 * Type helper utilities for common TypeScript patterns.
 *
 * These reduce boilerplate when working with complex types
 * throughout the application.
 */

/** Make specific properties of T required (others unchanged) */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific properties of T optional (others unchanged) */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make all properties of T nullable */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** Extract the resolved type of a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** Extract the element type from an array */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/** Create a type with all properties of T set to a specific value type */
export type RecordOf<T, V> = { [K in keyof T]: V };

/** Enforce that a value is not undefined or null */
export type NonNullable<T> = T extends null | undefined ? never : T;

/** Make a deeply partial version of T */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Extract keys of T whose values are of type V */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
