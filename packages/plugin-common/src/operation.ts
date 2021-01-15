import { FieldDefinitionNode, ObjectTypeDefinitionNode } from "graphql";
import { isScalarField, isValidField, printInputArgs, printResponseArgs, reduceTypeName } from "./field";
import { findFragment } from "./fragment";
import { findObject } from "./object";
import { printGraphqlDebug, printGraphqlDescription, printList } from "./print";
import { findQuery } from "./query";
import { OperationType, PluginContext } from "./types";
import { getLast } from "./utils";

/**
 * Print the operation wrapper
 */
export function printOperationWrapper(type: OperationType, fields: FieldDefinitionNode[], body: string): string {
  const lastField = getLast(fields);

  if (isValidField(lastField)) {
    const operationName = printList(
      fields.map(field => field.name.value),
      "_"
    );

    return printList(
      [
        /** The operation description */
        printGraphqlDescription(lastField.description?.value),
        printGraphqlDebug({ type, operationName, field: lastField }),
        /** The operation definition */
        `${type} ${operationName}${printInputArgs(fields)} {`,
        /** Each field and its required content */
        fields
          .slice()
          .reverse()
          .reduce((acc, field) => {
            return `${field.name.value}${printResponseArgs(field)} {
              ${acc === "" ? body : acc}
            }`;
          }, ""),
        `}`,
      ],
      "\n"
    );
  } else {
    return "";
  }
}

/**
 * Nest the objects until a fragment or scalar is found
 */
function printOperationFields<C>(
  context: PluginContext<C>,
  fields: FieldDefinitionNode[],
  object: ObjectTypeDefinitionNode
): string {
  const lastField = getLast(fields);
  return isValidField(lastField)
    ? printList(
        object.fields?.map(field => {
          if (isValidField(field)) {
            const operation = printOperationBody(context, [field]);

            return operation
              ? printList(
                  [
                    /** The field description */
                    printGraphqlDescription(field.description?.value),
                    /** Debug detail */
                    printGraphqlDebug(field),
                    /** The field content */
                    `${field.name.value} {
                      ${operation}
                    }`,
                  ],
                  "\n"
                )
              : field.name.value;
          } else {
            /** Skip fields that should not be exposed */
            return undefined;
          }
        }),
        "\n"
      )
    : "";
}

/**
 * Print the body of the operation
 */
export function printOperationBody<C>(context: PluginContext<C>, fields: FieldDefinitionNode[]): string | undefined {
  const lastField = getLast(fields);

  if (isValidField(lastField)) {
    /** Spread the fragment if found */
    const fragment = findFragment(context, lastField);
    if (fragment) {
      return `...${fragment.name}`;
    }

    /** Print each field if a matching object exists */
    const object = findObject(context, lastField);
    if (object) {
      return printOperationFields(context, fields, object);
    }
  }

  return undefined;
}

export function printFieldOperation<C>(
  context: PluginContext<C>,
  type: OperationType,
  fields: FieldDefinitionNode[]
): string | undefined {
  const body = printOperationBody(context, fields);
  return body ? printOperationWrapper(type, fields, body) : undefined;
}

/**
 * Print an operation for the node as well as a query for any nested fields
 *
 * @param context the operation visitor context
 * @param type either a query or a mutation
 * @param fields a list of fields by which to nest the query
 */
export function printOperations<C>(
  context: PluginContext<C>,
  type: OperationType,
  fields: FieldDefinitionNode[]
): string | undefined {
  const lastField = getLast(fields);

  if (isValidField(lastField)) {
    /** Print the operation for the latest field */
    const nodeOperation = printFieldOperation(context, type, fields);

    if (type === OperationType.query) {
      /** Find an object matching the type of this query */
      const object = findObject(context, lastField);

      const fieldOperations = (object?.fields ?? [])?.map(field => {
        if (
          /** No need to go further than scalar fields */
          isScalarField(context.scalars, field) ||
          /** No need to go further if the field returns one of the parent fields */
          fields.map(f => reduceTypeName(f.type)).includes(reduceTypeName(field.type)) ||
          /** No need to go further if the field is a connection */
          ["pageInfo", "nodes"].includes(field.name.value) ||
          /** No need to go further if we can get this field from a root query */
          (findQuery(context, field) && fields.length > 0)
        ) {
          return undefined;
        } else {
          /** For any objects create a new query for each nested field */
          return printOperations(context, type, [...fields, field]);
        }
      });

      /** Return operation for this node as well as any nested field operations */
      return printList([nodeOperation, ...fieldOperations], "\n");
    } else {
      /** Do not nest mutations */
      return nodeOperation;
    }
  } else {
    return undefined;
  }
}
