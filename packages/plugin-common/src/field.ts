import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
} from "graphql";
import c from "./constants";
import { printGraphqlType, printList } from "./print";
import { PluginContext } from "./types";

/**
 * Print the arg for passing into the operation input
 */
function printInputArg(node?: InputValueDefinitionNode): string {
  if (node) {
    const arg = printGraphqlType(node.type);
    return `$${node.name.value}: ${arg}`;
  } else {
    return "";
  }
}

/**
 * Print the args list for passing into the operation input
 */
export function printInputArgs(fields: FieldDefinitionNode[]): string {
  const args = fields.flatMap(field => field.arguments);
  return args?.length ? printList(["(", ...args.map(printInputArg), ")"], "\n") : "";
}

/**
 * Print the arg for passing into the operation response
 */
function printResponseArg(node: InputValueDefinitionNode): string {
  return `${node.name.value}: $${node.name.value}`;
}

/**
 * Print the args list for passing into the operation response
 */
export function printResponseArgs(field: FieldDefinitionNode): string {
  return field.arguments?.length ? printList(["(", ...field.arguments.map(printResponseArg), ")"], "\n") : "";
}

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
 * Determine whether the node is a scalar field
 */
export function isScalarField<C>(context: PluginContext<C>, node: FieldDefinitionNode): boolean {
  return Object.keys(context.scalars).includes(reduceTypeName(node.type));
}

/**
 * Determine whether to the field is valid to be output
 *
 * Use constant SKIP_FIELDS to skip fields with specific names
 * Use constant SKIP_DIRECTIVES to skip fields with specific directives
 */
export function isValidField(field?: FieldDefinitionNode): field is FieldDefinitionNode {
  const skipFieldName = c.SKIP_FIELDS.includes(field?.name.value ?? "");
  const skipDirective = field?.directives?.find(d => c.SKIP_DIRECTIVES.includes(d.name.value));
  return Boolean(field && !skipDirective && !skipFieldName);
}
