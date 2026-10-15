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

/**
 * Convert the given headers configuration into a plain object.
 */
function resolveHeaders(headers: RequestInit["headers"]): Record<string, string> {
  let oHeaders: Record<string, string> = {};
  if (headers) {
    if (typeof Headers !== "undefined" && headers instanceof Headers) {
      oHeaders = headersToObject(headers);
    } else if (Array.isArray(headers)) {
      headers.forEach(([name, value]) => {
        oHeaders[name] = value;
      });
    } else {
      oHeaders = headers as Record<string, string>;
    }
  }

  return oHeaders;
}

/**
 * Convert Headers instance into regular object
 */
function headersToObject(headers: Response["headers"]): Record<string, string> {
  const o: Record<string, string> = {};
  headers.forEach((v, k) => {
    o[k] = v;
  });
  return o;
}

/**
 * Merge header configurations into a plain object.
 * Later sources replace earlier headers whose names match case-insensitively.
 */
export function mergeHeaders(...sources: RequestInit["headers"][]): Record<string, string> {
  const merged: Record<string, string> = {};
  for (const source of sources) {
    for (const [name, value] of Object.entries(resolveHeaders(source))) {
      const existing = Object.keys(merged).find(key => key.toLowerCase() === name.toLowerCase());
      if (existing !== undefined) {
        delete merged[existing];
      }
      merged[name] = value;
    }
  }
  return merged;
}
