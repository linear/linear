/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * String replace with async function.
 */
export const replaceAsync = async (
  str: string,
  regex: RegExp,
  asyncFn: (match: any, ...args: any[]) => Promise<string>
) => {
  const promises: Promise<string>[] = [];

  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
    return "";
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift() as string);
};
