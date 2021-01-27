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

  /** Ignore queries for connections and lists */
  if (type?.endsWith("Connection")) {
    return undefined;
  }

  const match = context.queries.find(query => {
    return reduceTypeName(query.type) === type && reduceListType(query.type) === listType;
  });

  return match;
}
