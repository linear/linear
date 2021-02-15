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
