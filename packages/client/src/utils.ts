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
