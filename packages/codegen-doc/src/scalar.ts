import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { printList } from "./print";

/**
 * Print a parsed typescript scalar type
 *
 * @param name the name of the scalar node
 * @param namespace the optional namespace to prefix
 */
export function printTypescriptScalar(name: string, namespace?: string): string {
  const defaultName = DEFAULT_SCALARS[name];

  if (defaultName) {
    return defaultName;
  } else {
    switch (name) {
      case "DateTime":
      case "TimelessDateScalar":
        return "Date";
      default:
        return `${printList([namespace, "Scalars"], ".")}['${name}']`;
    }
  }
}
