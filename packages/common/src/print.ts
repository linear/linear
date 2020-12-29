import { filterJoin } from "./utils";

const propertiesToClean = ["loc", "block"];

/**
 * Clean node for debug output by removing extraneous properties for all nested objects
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanNode(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanNode);
  } else if (typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      return propertiesToClean.includes(key) || (Array.isArray(value) && value.length === 0)
        ? acc
        : {
            ...acc,
            [key]: cleanNode(value),
          };
    }, {});
  } else {
    return obj;
  }
}

/**
 * Wrap a string after the specified length
 */
export function wrapString(s: string, length = 100): string {
  return s.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, "g"), "$1\n");
}

/**
 * Return a jsdoc formatted block
 */
export function printComment(lines: string[]): string {
  return [
    "/**",
    ...lines
      .filter(t => t && t !== "")
      .reduce((prev, t) => [...prev, ...t.split("\n")], [] as string[])
      .map(line => ` * ${line}`),
    " */",
  ].join("\n");
}

/**
 * Return a comment block containing the arg object if in dev mode
 */
export function printDebug<T>(obj: T): string {
  return process.env.NODE_ENV === "development"
    ? printComment(JSON.stringify(cleanNode(obj), null, 2).split("\n"))
    : "";
}

/**
 * Print the description as a graphql file comment
 */
export function printGraphqlDescription(description?: string): string | undefined {
  return description
    ? filterJoin(
        wrapString(description)
          .split("\n")
          .map(s => `# ${s.trim()}`),
        "\n"
      )
    : undefined;
}

/**
 * Return a jsdoc formatted block for graphql files
 */
export function printGraphqlComment(lines: string[]): string {
  return [
    ...lines
      .filter(t => t && t !== "")
      .reduce((prev, t) => [...prev, ...t.split("\n")], [] as string[])
      .map(line => `# ${line}`),
  ].join("\n");
}

/**
 * Return a comment block containing the arg object if in dev mode
 */
export function printGraphqlDebug<T>(obj: T): string {
  return process.env.NODE_ENV === "development"
    ? printGraphqlComment(JSON.stringify(cleanNode(obj), null, 2).split("\n"))
    : "";
}
