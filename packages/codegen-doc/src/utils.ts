import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
} from "graphql";
import { NamedFields, PluginContext } from "./types";

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
 * Get the non null type name from any type node
 */
export function reduceNonNullType(
  type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode
): string | undefined {
  return typeof type === "string"
    ? undefined
    : type.kind === Kind.NON_NULL_TYPE
    ? reduceTypeName(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? undefined
    : type.kind === Kind.NAME
    ? undefined
    : type.kind === Kind.LIST_TYPE
    ? undefined
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

/**
 * Type safe check for non defined values
 */
export function nonNullable<Type>(value: Type): value is NonNullable<Type> {
  return value !== null && value !== undefined;
}

/**§
 * Capitalize the first character in a string
 */
export function upperFirst(str?: string): string {
  return str ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : "";
}

/**
 * Lowercase the first character in a string
 */
export function lowerFirst(str?: string): string {
  return str ? `${str.charAt(0).toLowerCase()}${str.slice(1)}` : "";
}

/**
 * Return the last element in an array
 */
export function getLast<Type>(arr: Type[] = []): Type | undefined {
  return arr[arr.length - 1];
}

/**
 * Return the key matching the value in an object
 */
export function getKeyByValue<Key extends string, Value>(obj: Record<Key, Value>, value: Value): Key | undefined {
  const keys = Object.keys(obj) as Key[];
  return keys.find(key => obj[key] === value);
}

/**
 * Check whether a node has a skip comment.
 * @param context The plugin context
 * @param node The node to check
 */
export function nodeHasSkipComment(
  context: PluginContext,
  node?:
    | FieldDefinitionNode
    | ObjectTypeDefinitionNode
    | InterfaceTypeDefinitionNode
    | NamedFields<ObjectTypeDefinitionNode>
): boolean {
  return context.config.skipComments?.some(comment => node?.description?.value.includes(comment)) ?? false;
}
