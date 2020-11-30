import { filterJoin } from "@linear/common";
import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  StringValueNode,
  visit,
} from "graphql";
import { ArgumentVisitor } from "./argument-visitor";
import c from "./constants";
import { NamedArgs, NamedFields, WithNullable } from "./types";

const argVisitor = new ArgumentVisitor();

/**
 * Print the arg for passing into the operation input
 */
function printInputArg(node: WithNullable<InputValueDefinitionNode>): string {
  const arg = typeof node.type === "string" ? node.type : visit(node.type, argVisitor);
  return `$${node.name}: ${arg}`;
}

/**
 * Print the args list for passing into the operation input
 */
function printInputArgs(node: NamedArgs<FieldDefinitionNode>): string {
  return node.arguments?.length ? filterJoin(["(", ...node.arguments.map(printInputArg), ")"], "\n") : "";
}

/**
 * Print the arg for passing into the operation response
 */
function printResponseArg(node: InputValueDefinitionNode): string {
  return `${node.name}: $${node.name}`;
}

/**
 * Print the args list for passing into the operation response
 */
function printResponseArgs(node: NamedArgs<FieldDefinitionNode>): string {
  return node.arguments?.length ? filterJoin(["(", ...node.arguments.map(printResponseArg), ")"], "\n") : "";
}

/**
 * Print the description as a graphql file comment
 */
export function printDescription<T extends { description?: StringValueNode }>(node: T): string | undefined {
  return node.description?.value ? filterJoin(["#", node.description.value], " ") : undefined;
}

/**
 * Print the operation wrapper
 */
export function printOperationWrapper(
  node: NamedArgs<FieldDefinitionNode>,
  operationName?: string,
  operationBody?: string
): string {
  return filterJoin(
    [
      printDescription(node),
      `${operationName} ${node.name}${printInputArgs(node)} {
        ${node.name}${printResponseArgs(node)} {
          ${operationBody}
        }
      }`,
    ],
    "\n"
  );
}

/**
 * Get the object type matching the name arg
 */
function findObject(objects: ObjectTypeDefinitionNode[], name: string): ObjectTypeDefinitionNode | undefined {
  return objects.find(o => o.name.value === name);
}

/**
 * Get the fragment object type matching the name arg
 */
function findFragment(
  fragments: NamedFields<ObjectTypeDefinitionNode>[],
  name: string
): NamedFields<ObjectTypeDefinitionNode> | undefined {
  return fragments.find(o => o.name === name);
}

/**
 * Print spreading of the fragment
 */
function printOperationFragment(fragment: NamedFields<ObjectTypeDefinitionNode>): string {
  return `...${fragment.name}`;
}

/**
 * Nest the objects until a fragment or scalar is found
 */
function printOperationFields(
  object: ObjectTypeDefinitionNode,
  fragments: NamedFields<ObjectTypeDefinitionNode>[],
  objects: ObjectTypeDefinitionNode[]
): string {
  return filterJoin(
    object.fields?.map(field => {
      if (field.name.value === c.EDGES_NAME) {
        /** Skip edges as nodes are exposed */
        return undefined;
      } else {
        const operation = printOperationBody(field.type, fragments, objects);
        return operation
          ? filterJoin(
              [
                printDescription(field),
                `${field.name.value} {
                ${operation}
              }`,
              ],
              "\n"
            )
          : field.name.value;
      }
    }),
    "\n"
  );
}

/**
 * Get the string type name from any type node
 */
function getTypeName(type: string | NameNode | NonNullTypeNode | NamedTypeNode | ListTypeNode): string {
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
    : "UNKNOW_OPERATION_TYPE";
}

/**
 * Print the body of the operation
 */
export function printOperationBody(
  type: string | NonNullTypeNode | NamedTypeNode | ListTypeNode,
  fragments: NamedFields<ObjectTypeDefinitionNode>[],
  objects: ObjectTypeDefinitionNode[]
): string | undefined {
  const typeName = getTypeName(type);

  const fragment = findFragment(fragments, typeName);
  if (fragment) {
    return printOperationFragment(fragment);
  } else {
    const object = findObject(objects, typeName);

    if (object) {
      return printOperationFields(object, fragments, objects);
    }
  }

  return undefined;
}
