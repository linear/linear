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

  /** Select query if matching name and type */
  const queryMatchingNameAndType = context.queries.find(query => {
    return (
      query.name.value.toLowerCase() === fieldName.toLowerCase() &&
      reduceTypeName(query.type) === type &&
      reduceListType(query.type) === listType
    );
  });
  if (queryMatchingNameAndType) {
    return queryMatchingNameAndType;
  }

  /** Otherwise look for a matching type */
  const queryMatchingType = context.queries.find(query => {
    return reduceTypeName(query.type) === type && reduceListType(query.type) === listType;
  });
  if (!queryMatchingType) {
    return undefined;
  }

  /** Get the matching object definition */
  const responseFieldNames = context.objects
    .find(obj => reduceTypeName(queryMatchingType.type) === obj.name.value)
    ?.fields?.map(responseField => responseField.name.value);

  if (!responseFieldNames) {
    return undefined;
  }

  /** Ensure the fields are available on the object */
  const responseHasFields = getRequiredArgs(queryMatchingType.arguments).every(arg => {
    return responseFieldNames.includes(arg.name.value);
  });
  if (responseHasFields) {
    return queryMatchingType;
  } else {
    return undefined;
  }
}
