/**
 * Type safe check for non defined values
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Print debug information if in development environment
 */
export function debug(namespace: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(namespace, ...args.map(a => (typeof a === "object" ? JSON.stringify(a, null, 2) : a)));
  }
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
export function filterJoin(a?: (string | undefined)[], joinString?: string): string {
  return (a ?? []).filter(Boolean).join(joinString ?? "");
}
