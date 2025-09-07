import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { Doc } from "./constants";
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
    if (Doc.SCALAR_STRING_NAMES.includes(name)) {
      return Doc.SCALAR_STRING_TYPE;
    } else if (Doc.SCALAR_DATE_NAMES.includes(name)) {
      return Doc.SCALAR_DATE_TYPE;
    } else if (Doc.SCALAR_JSON_NAMES.includes(name)) {
      return Doc.SCALAR_JSON_TYPE;
    } else if (Doc.SCALAR_DATE_OR_STRING_NAMES.includes(name)) {
      return Doc.SCALAR_DATE_OR_STRING_TYPE;
    } else if (Object.keys(Doc.SCALAR_NOTIFICATION_TYPE_MAP).includes(name)) {
      return `"${Doc.SCALAR_NOTIFICATION_TYPE_MAP[name as keyof typeof Doc.SCALAR_NOTIFICATION_TYPE_MAP]}"`;
    } else {
      return `${printList([namespace, "Scalars"], ".")}['${name}']`;
    }
  }
}
