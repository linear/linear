/**
 * Serialize an object into an encoded user agent string
 *
 * @param seed user agent properties to serialize
 * @returns the serialized user agent string
 */
export function serializeUserAgent(seed: Record<string, string>): string {
  return Object.entries(seed).reduce((acc, [key, value]) => {
    const encoded = `${key}@${encodeURIComponent(value)}`;
    return acc ? `${acc} ${encoded}` : encoded;
  }, "");
}

/**
 * Capitalize the first character of a string
 *
 * @param str the string to capitalize
 */
export function capitalize(str?: string): string | undefined {
  return str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : undefined;
}

/**
 * Type safe check for non defined values
 */
export function nonNullable<Type>(value: Type): value is NonNullable<Type> {
  return value !== null && value !== undefined;
}

/**
 * Return the key matching the value in an object
 */
export function getKeyByValue<Key extends string, Value>(obj: Record<Key, Value>, value: Value): Key | undefined {
  const keys = Object.keys(obj) as Key[];
  return keys.find(key => obj[key] === value);
}
