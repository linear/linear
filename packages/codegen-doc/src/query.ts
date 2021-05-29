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

  /** Get all queries matching type */
  const queriesMatchingType = context.queries.filter(query => {
    return reduceTypeName(query.type) === type && reduceListType(query.type) === listType;
  });
  if (!queriesMatchingType.length) {
    return undefined;
  }

  /** Select query if matching name and type */
  const queryMatchingNameAndType = queriesMatchingType.find(query => {
    return query.name.value.toLowerCase() === fieldName.toLowerCase();
  });
  if (queryMatchingNameAndType) {
    return queryMatchingNameAndType;
  }

  /** Get the matching object definition */
  const responseObject = context.objects.find(obj => type === obj.name.value);
  const responseFieldNames = responseObject?.fields?.map(responseField => responseField.name.value);
  if (!responseFieldNames?.length) {
    return undefined;
  }

  /** Find a query with required args available on the response object */
  return queriesMatchingType.find(query => {
    const hasAvailableArgs = getRequiredArgs(query.arguments).every(arg => responseFieldNames.includes(arg.name.value));
    return hasAvailableArgs ? query : undefined;
  });
}
