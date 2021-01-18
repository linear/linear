import { FieldDefinitionNode } from "graphql";
import c from "./constants";
import { reduceListType, reduceTypeName } from "./field";
import { Named, PluginContext } from "./types";

/**
 * Find a query that can return this field
 * */
export function findQuery<C>(
  context: PluginContext<C>,
  field: Named<FieldDefinitionNode> | FieldDefinitionNode
): FieldDefinitionNode | undefined {
  const type = reduceTypeName(field.type);
  const listType = reduceListType(field.type);

  /** Ignore queries for connections and lists */
  if (type?.endsWith(c.CONNECTION_TYPE)) {
    return undefined;
  }

  const match = context.queries.find(q => {
    return reduceTypeName(q.type) === type && reduceListType(q.type) === listType;
  });

  return match;
}
