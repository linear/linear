import { FieldDefinitionNode } from "graphql";
import { requiredArgs } from "./args";
import c from "./constants";
import { getTypeName } from "./field";
import { Named } from "./types";

/**
 * Find a query that can return this field
 * */
export function findQuery(
  queries: readonly FieldDefinitionNode[],
  field: Named<FieldDefinitionNode> | FieldDefinitionNode
): FieldDefinitionNode | undefined {
  return queries.find(q => {
    return (
      /** Matches return type */
      getTypeName(q.type) === getTypeName(field.type) &&
      /** Takes an id argument */
      requiredArgs(q.arguments)?.find(a => a.name.value === c.ID_NAME)
    );
  });
}
