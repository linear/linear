import { FieldDefinitionNode } from "graphql";
import { getRequiredArgs } from "./args.js";
import { Doc } from "./constants.js";
import { printTypescriptType } from "./print.js";
import { Named, PluginContext } from "./types.js";
import { nodeHasSkipComment, reduceListType, reduceTypeName } from "./utils.js";

/**
 * Find a query that can return this field
 * */
export function findQuery(
  context: PluginContext,
  field: Named<FieldDefinitionNode> | FieldDefinitionNode
): FieldDefinitionNode | undefined {
  const type = reduceTypeName(field.type);
  const listType = reduceListType(field.type);
  const fieldName = typeof field.name === "string" ? field.name : field.name.value;

  /** Ignore queries for connections and lists */
  if (type?.endsWith("Connection") || Doc.CONNECTION_FIELDS.includes(fieldName)) {
    return undefined;
  }

  /** Get the matching object definition */
  const responseObject = context.objects.find(obj => type === obj.name.value);
  const responseFields = responseObject?.fields;
  if (!responseFields?.length) {
    return undefined;
  }

  /** Get all queries matching type and have required args available on the response object */
  const matchingQueries = context.queries.filter(query => {
    return (
      reduceTypeName(query.type) === type &&
      reduceListType(query.type) === listType &&
      getRequiredArgs(query.arguments).every(arg => {
        const responseField = responseFields.find(candidate => candidate.name.value === arg.name.value);
        return (
          responseField && printTypescriptType(context, responseField.type) === printTypescriptType(context, arg.type)
        );
      })
    );
  });

  /** Prefer matching query names */
  return (
    matchingQueries.find(query =>
      [fieldName.toLowerCase(), type.toLowerCase(), listType?.toLowerCase()].includes(query.name.value.toLowerCase())
    ) ?? matchingQueries[0]
  );
}

/**
 * Check whether this query does not have a skip comment.
 */
export function isValidQuery(context: PluginContext, query: FieldDefinitionNode): boolean {
  const skipComment = nodeHasSkipComment(context, query);
  return !skipComment;
}
