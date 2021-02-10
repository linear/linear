import { Kind, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode } from "graphql";

const log = "codegen-doc:utils:";

/**
 * Get the deepest type name from any type node
 */
export function reduceTypeName(type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode): string {
  return typeof type === "string"
    ? type
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceTypeName(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? reduceTypeName(type.name)
    : type.kind === Kind.NAME
    ? reduceTypeName(type.value)
    : type.kind === Kind.LIST_TYPE
    ? reduceTypeName(type.type)
    : "UNKNOWN_TYPE_NAME";
}

/**
 * Get the list type name from any type node
 */
export function reduceListType(
  type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode
): string | undefined {
  return typeof type === "string"
    ? undefined
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceListType(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? undefined
    : type.kind === Kind.NAME
    ? undefined
    : type.kind === Kind.LIST_TYPE
    ? reduceTypeName(type.type)
    : undefined;
}

/**
 * Throw an error if the file extension is not expected
 *
 * @param packageName the name of the plugin package for use in the error message
 * @param ext the extension to match
 * @param outputFile the file name to match against
 */
export function validateExtension(packageName: string, ext: string, outputFile: string): void {
  /** Check the output file extension */
  if (!outputFile.endsWith(ext)) {
    throw new Error(
      `${log} Plugin "${packageName}" config requires output file extension to be "${ext}" but is "${outputFile}"`
    );
  }
}
