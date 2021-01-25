import {
  findFragment,
  findObject,
  findQuery,
  getLast,
  isScalarField,
  isValidField,
  logger,
  OperationType,
  PluginContext,
  printGraphqlDebug,
  printGraphqlDescription,
  printGraphqlInputArgs,
  printGraphqlResponseArgs,
  printLines,
  printList,
  reduceListType,
} from "@linear/plugin-common";
import { FieldDefinitionNode, ObjectTypeDefinitionNode } from "graphql";

/**
 * Print the operation wrapper
 */
function printOperationWrapper(
  context: PluginContext,
  type: OperationType,
  fields: FieldDefinitionNode[],
  body: string
): string {
  const lastField = getLast(fields);

  if (isValidField(context, lastField)) {
    const operationName = printList(
      fields.map(field => field.name.value),
      "_"
    );

    return printLines([
      /** The operation description */
      printGraphqlDescription(lastField.description?.value),
      printGraphqlDebug({ type, operationName, field: lastField }),
      /** The operation definition */
      `${type} ${operationName}${printGraphqlInputArgs(fields)} {`,
      /** Each field and its required content */
      fields
        .slice()
        .reverse()
        .reduce((acc, field) => {
          return `${field.name.value}${printGraphqlResponseArgs(field)} {
              ${acc === "" ? body : acc}
            }`;
        }, ""),
      `}`,
    ]);
  } else {
    return "";
  }
}

/**
 * Nest the objects until a fragment or scalar is found
 */
function printOperationFields(
  context: PluginContext,
  fields: FieldDefinitionNode[],
  object: ObjectTypeDefinitionNode,
  i = 0
): string {
  const lastField = getLast(fields);
  return isValidField(context, lastField)
    ? printLines(
        object.fields?.map(field => {
          if (isValidField(context, field)) {
            if (i > 9) {
              logger.fatal([...fields, field, object]);
              throw new Error("printOperationFields called over 10 times recursively");
            }

            const operation = printOperationBody(context, [field], i + 1);

            return operation
              ? printLines([
                  /** The field description */
                  printGraphqlDescription(field.description?.value),
                  /** Debug detail */
                  printGraphqlDebug(field),
                  /** The field content */
                  `${field.name.value} {
                      ${operation}
                    }`,
                ])
              : field.name.value;
          } else {
            /** Skip fields that should not be exposed */
            return undefined;
          }
        })
      )
    : "";
}

/**
 * Print the body of the operation
 */
function printOperationBody(context: PluginContext, fields: FieldDefinitionNode[], i = 0): string | undefined {
  const lastField = getLast(fields);

  if (isValidField(context, lastField)) {
    /** Spread the fragment if found */
    const fragment = findFragment(context, lastField);
    if (fragment) {
      return `...${fragment.name}`;
    }

    /** Print each field if a matching object exists */
    const object = findObject(context, lastField);
    if (object) {
      return printOperationFields(context, fields, object, i);
    }
  }

  return undefined;
}

function printFieldOperation(
  context: PluginContext,
  type: OperationType,
  fields: FieldDefinitionNode[]
): string | undefined {
  const body = printOperationBody(context, fields);
  return body ? printOperationWrapper(context, type, fields, body) : undefined;
}

/**
 * Print an operation for the node as well as a query for any nested fields
 *
 * @param context the operation visitor context
 * @param type either a query or a mutation
 * @param fields a list of fields by which to nest the query
 */
export function printOperations(
  context: PluginContext,
  type: OperationType,
  fields: FieldDefinitionNode[]
): string | undefined {
  const lastField = getLast(fields);

  if (isValidField(context, lastField)) {
    /** Print the operation for the latest field */
    const nodeOperation = printFieldOperation(context, type, fields);

    if (type === OperationType.query) {
      /** Find an object matching the type of this query */
      const object = findObject(context, lastField);

      const fieldOperations = (object?.fields ?? [])?.map(field => {
        if (
          /** No need to go further than scalar fields */
          isScalarField(context, field) ||
          /** No need to go further if the field is within a connection */
          ["pageInfo", "nodes"].includes(field.name.value) ||
          /** No need to go further if this returns a list */
          reduceListType(field.type) ||
          /** No need to go further if we can get this field from a root query */
          findQuery(context, field)
        ) {
          return undefined;
        } else {
          /** For any objects create a new query for each nested field */
          return printOperations(context, type, [...fields, field]);
        }
      });

      /** Return operation for this node as well as any nested field operations */
      return printLines([nodeOperation, ...fieldOperations]);
    } else {
      /** Do not nest mutations */
      return nodeOperation;
    }
  } else {
    return undefined;
  }
}
