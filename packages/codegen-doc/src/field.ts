import { FieldDefinitionNode } from "graphql";
import { PluginContext } from "./types";
import { reduceTypeName } from "./utils";

/**
 * Determine whether the node is a scalar field
 */
export function isScalarField(context: PluginContext, field: FieldDefinitionNode): boolean {
  return Object.keys(context.scalars).includes(reduceTypeName(field.type));
}

/**
 * Determine whether to the field is valid to be output
 *
 * Use config skipFields to skip fields with specific names
 * Use config skipComments to skip fields with comments containing specific strings
 * Use config skipDirectives to skip fields with specific directives
 */
export function isValidField(context: PluginContext, field?: FieldDefinitionNode): field is FieldDefinitionNode {
  if (field && field.name.value !== "edges") {
    const skipFieldName = context.config.skipFields?.includes(field?.name?.value ?? field?.name ?? "");
    const skipComment = context.config.skipComments?.some(comment => field.description?.value.includes(comment));
    const skipDirective = field?.directives?.find(directive =>
      context.config.skipDirectives?.includes(directive.name.value)
    );
    return Boolean(!skipDirective && !skipFieldName && !skipComment);
  } else {
    return false;
  }
}
