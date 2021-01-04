import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  visit,
} from "graphql";
import { ArgumentGraphqlVisitor } from "./argument-graphql-visitor";
import c from "./constants";
import { filterJoin } from "./utils";

const argVisitor = new ArgumentGraphqlVisitor();

/**
 * Print the arg for passing into the operation input
 */
function printInputArg(node?: InputValueDefinitionNode): string {
  if (node) {
    const arg = visit(node.type, argVisitor);
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
  return args?.length ? filterJoin(["(", ...args.map(printInputArg), ")"], "\n") : "";
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
  return field.arguments?.length ? filterJoin(["(", ...field.arguments.map(printResponseArg), ")"], "\n") : "";
}

/**
 * Get the string type name from any type node
 */
export function getTypeName(type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode): string {
  return typeof type === "string"
    ? type
    : type.kind === Kind.NON_NULL_TYPE
    ? getTypeName(type.type)
    : type.kind === Kind.NAMED_TYPE
    ? getTypeName(type.name)
    : type.kind === Kind.NAME
    ? getTypeName(type.value)
    : type.kind === Kind.LIST_TYPE
    ? getTypeName(type.type)
    : "UNKNOWN_OPERATION_TYPE";
}

/**
 * Determine whether the node is a scalar field
 */
export function isScalarField(scalars: typeof DEFAULT_SCALARS, node: FieldDefinitionNode): boolean {
  return Object.keys(scalars).includes(getTypeName(node.type));
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
