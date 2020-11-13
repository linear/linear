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
    console.log(namespace, ...args);
  }
}
