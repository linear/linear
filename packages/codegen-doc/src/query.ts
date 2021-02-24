import { FieldDefinitionNode } from "graphql";
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

  const matchedNameAndType = context.queries.find(query => {
    return (
      query.name.value.toLowerCase() === fieldName.toLowerCase() &&
      reduceTypeName(query.type) === type &&
      reduceListType(query.type) === listType
    );
  });

  const matchedType = context.queries.find(query => {
    return reduceTypeName(query.type) === type && reduceListType(query.type) === listType;
  });

  return matchedNameAndType ?? matchedType;
}
