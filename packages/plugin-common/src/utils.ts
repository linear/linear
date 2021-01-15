/**
 * Type safe check for non defined values
 */
export function nonNullable<T>(v: T): v is NonNullable<T> {
  return v !== null && v !== undefined;
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
 * Return the last element in an array
 */
export function getLast<T>(a: T[] = []): T | undefined {
  return a[a.length - 1];
}

/**
 * Return the key matching the value of an object
 */
export function getKeyByValue<K extends string, V>(o: Record<K, V>, v: V): K | undefined {
  const keys = Object.keys(o) as K[];
  return keys.find(key => o[key] === v);
}
