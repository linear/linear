/**
 * Type safe check for non defined values
 */
export function nonNullable<Type>(value: Type): value is NonNullable<Type> {
  return value !== null && value !== undefined;
}

/**
 * Capitalize the first character in a string
 */
export function upperFirst(str?: string): string {
  return str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : "";
}

/**
 * Lowercase the first character in a string
 */
export function lowerFirst(str?: string): string {
  return str ? `${str.charAt(0).toLowerCase()}${str.slice(1)}` : "";
}

/**
 * Return the last element in an array
 */
export function getLast<Type>(arr: Type[] = []): Type | undefined {
  return arr[arr.length - 1];
}

/**
 * Return the key matching the value in an object
 */
export function getKeyByValue<Key extends string, Value>(obj: Record<Key, Value>, value: Value): Key | undefined {
  const keys = Object.keys(obj) as Key[];
  return keys.find(key => obj[key] === value);
}
