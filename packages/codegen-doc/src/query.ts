import { FieldDefinitionNode } from "graphql";
import { getRequiredArgs } from "./args";
import { Named, PluginContext } from "./types";
import { reduceListType, reduceTypeName } from "./utils";

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
  if (type?.endsWith("Connection")) {
    return undefined;
  }

  /** Get the matching object definition */
  const responseObject = context.objects.find(obj => type === obj.name.value);
  const responseFieldNames = responseObject?.fields?.map(responseField => responseField.name.value);
  if (!responseFieldNames?.length) {
    return undefined;
  }

  /** Get all queries matching type and have required args available on the response object */
  const matchingQueries = context.queries.filter(query => {
    return (
      reduceTypeName(query.type) === type &&
      reduceListType(query.type) === listType &&
      getRequiredArgs(query.arguments).every(arg => responseFieldNames.includes(arg.name.value))
    );
  });

  /** Prefer matching query names */
  return (
    matchingQueries.find(query => query.name.value.toLowerCase() === fieldName.toLowerCase()) ?? matchingQueries[0]
  );
}
