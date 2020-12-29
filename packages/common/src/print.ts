import { filterJoin } from "./utils";

/**
 * Clean node by removing extraneous "loc" properties for all nested objects
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanNode<T extends { loc?: any }>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return ["loc"].includes(key)
      ? acc
      : {
          ...acc,
          [key]: Object.keys(value ?? {}).includes("loc") ? cleanNode(value) : value,
        };
  }, {});
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
