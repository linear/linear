/**
 * Type safe check for non defined values
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Capitalize the first character in a string
 */
export function upperFirst(s?: string): string {
  return s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : "";
}

/**
 * Lowercase the first character in a string
 */
export function lowerFirst(s?: string): string {
  return s ? `${s.charAt(0).toLowerCase()}${s.slice(1)}` : "";
}

/**
 * Filter a list of strings and join into a single string
 */
export function filterJoin(a: (string | undefined)[] = [], joinString?: string): string {
  return a.filter(Boolean).join(joinString ?? "");
}

/**
 * Return the last element in an array
 */
export function getLast<T>(a: T[] = []): T | undefined {
  return a[a.length - 1];
}
