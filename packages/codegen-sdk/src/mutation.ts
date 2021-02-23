import { lowerFirst, nonNullable } from "@linear/codegen-doc";
import { FieldDefinitionNode } from "graphql";
import { Sdk } from "./constants";
import { SdkModel, SdkOperation, SdkPluginContext } from "./types";

/**
 * Find mutations that are applied to a model
 * */
export function findMutations(
  context: SdkPluginContext,
  model?: SdkModel
): { operation: SdkOperation; field: FieldDefinitionNode }[] {
  const rootOperations = context.sdkDefinitions[""].operations;

  return model
    ? context.mutations
        .filter(mutation => {
          return (
            mutation.name.value.startsWith(lowerFirst(model.name)) &&
            Sdk.MUTATION_TYPES.find(mutationType => getMutationName(model, mutation.name.value) === mutationType)
          );
        })
        .map(mutation => {
          const operation = rootOperations.find(
            rootOperation => rootOperation.node.name?.value === mutation.name.value
          );
          return operation
            ? {
                field: mutation,
                operation,
              }
            : undefined;
        })
        .filter(nonNullable)
    : [];
}

/**
 * Remove the model name from the mutation name
 */
export function getMutationName(model: SdkModel, mutationName: string): string {
  return lowerFirst(lowerFirst(mutationName).replace(lowerFirst(model.name), ""));
}
