/*
 * Get a list of all type definitions
 */
export function getDefinitionsFromVisitorResult(visitorResult: unknown): string[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((visitorResult as any)?.definitions ?? []).filter((t: unknown) => typeof t === "string");
}
