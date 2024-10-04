/**
 * Safely parses an integer. Returns undefined if the value is undefined or not a number.
 */
export const safeParseInt = (number?: string): number | undefined => {
  if (number === undefined) {
    return undefined;
  }

  const int = parseInt(number);
  return isNaN(int) ? undefined : int;
};
