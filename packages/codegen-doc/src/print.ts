import { ASTNode, visit } from "graphql";
import { pascalCase } from "pascal-case";
import { ArgumentGraphqlVisitor } from "./argument-graphql-visitor";
import { ArgumentTypescriptVisitor } from "./argument-typescript-visitor";
import { PluginContext } from "./types";

const argGraphqlVisitor = new ArgumentGraphqlVisitor();

/**
 * Filter a list of strings and join into a single string
 * Defaults to comma separated
 */
export function printList(arr: (string | undefined)[] = [], joinString = ", "): string {
  return arr.filter(Boolean).join(joinString);
}

/**
 * Filter a list of strings and join by the new line character
 */
export function printLines(arr: (string | undefined)[] = []): string {
  return printList(arr, "\n");
}

/**
 * Properties to remove when cleaning nodes for debug output
 */
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
export function wrapString(str: string, length = 100): string {
  return str.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, "g"), "$1\n");
}

/**
 * Return a jsdoc formatted block
 */
export function printComment(lines: (string | undefined)[]): string {
  const parsed = lines
    .filter(line => line && line !== "")
    .reduce((prev, line) => [...prev, ...(line as string).split("\n")], [] as string[]);

  return parsed.length > 1 ? printLines(["/**", ...parsed.map(line => ` * ${line}`), " */"]) : `/** ${parsed[0]} */`;
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
    ? printLines(
        wrapString(description)
          .split("\n")
          .map(str => `# ${str.trim()}`)
      )
    : undefined;
}

/**
 * Return a jsdoc formatted block for graphql files
 */
export function printGraphqlComment(lines: string[]): string {
  return printLines([
    ...lines
      .filter(line => line && line !== "")
      .reduce((prev, line) => [...prev, ...line.split("\n")], [] as string[])
      .map(line => `# ${line}`),
  ]);
}

/**
 * Return a comment block containing the arg object if in dev mode
 */
export function printGraphqlDebug<T>(obj: T): string {
  return process.env.NODE_ENV === "development" && obj
    ? printGraphqlComment(JSON.stringify(cleanNode(obj), null, 2).split("\n"))
    : "";
}

/**
 * Return the printed graphql type
 */
export function printGraphqlType(node?: ASTNode | string): string {
  return node ? (typeof node === "string" ? node : visit(node, argGraphqlVisitor)) : "";
}

/**
 * Return the printed typescript type
 */
export function printTypescriptType(context: PluginContext, node?: ASTNode | string, namespace?: string): string {
  const argTypescriptVisitor = new ArgumentTypescriptVisitor(context, namespace);
  return node ? (typeof node === "string" ? node : visit(node, argTypescriptVisitor)) : "";
}

/**
 * Return the name in pascal case with underscores still remaining
 */
export function printPascal(str?: string): string {
  return (str ?? "")
    .split("_")
    .map(_str => pascalCase(_str))
    .join("_");
}

/**
 * Print a ternary expression if the _if arg is defined, otherwise print the _then
 */
export function printTernary(_if?: string, _then?: string, _else = "undefined"): string {
  return _if ? `${_if} ? ${_then} : ${_else}` : _then ?? "";
}

/**
 * Print a string setting the left, first arg to the right, second arg
 */
export function printSet(left: string, right: string): string {
  return `${left} = ${right}`;
}

/**
 * Print a string wrapping the content in an if and throwing an error if invalid
 */
export function printElseThrow(_if: string, content: string, error: string, omit = false): string {
  return omit
    ? content
    : `if (${_if}) {
        ${content}
      } else {
        throw new Error('codegen-doc:print: ${error}')
      }`;
}

/**
 * Print a string wrapping the content in an if and logging a warning if invalid
 */
export function printElseWarn(_if: string, content: string, error: string, omit = false): string {
  return omit
    ? content
    : `if (${_if}) {
        ${content}
      } else {
        console.warn('codegen-doc:print: ${error}')
      }`;
}
