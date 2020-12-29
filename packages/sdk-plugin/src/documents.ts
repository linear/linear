import { Types } from "@graphql-codegen/plugin-helpers";
import { logger, nonNullable } from "@linear/common";
import { DocumentNode, Kind, OperationDefinitionNode } from "graphql";
import { pascalCase } from "pascal-case";
import { ApiDefinition, ApiDefinitions } from "./types";

/**
 * Get a list of all non null document notes
 */
export function getDocumentNodes(documents: Types.DocumentFile[]): DocumentNode[] {
  return documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);
}

/**
 * Get all operation definitions from an array of document files
 */
function getOperations(documents: Types.DocumentFile[]): OperationDefinitionNode[] {
  return getDocumentNodes(documents).reduce<OperationDefinitionNode[]>((acc, document) => {
    return document.kind === Kind.DOCUMENT
      ? [
          ...acc,
          ...(document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION) as OperationDefinitionNode[]),
        ]
      : acc;
  }, []);
}

/**
 * Process the documents and return a definition object for generating the api
 */
export function getApiDefinitions(documents: Types.DocumentFile[]): ApiDefinitions {
  return getOperations(documents).reduce<ApiDefinitions>((acc, node) => {
    const path = (node.name?.value ?? "").split("_");
    const key = path.slice(0, path.length - 1).join("_");

    logger.trace({ ...node, path, documentVariableName: pascalCase(node.name?.value ?? "UNNAMED_OPERATION") });

    const name = pascalCase(node.name?.value ?? "UNNAMED_OPERATION");
    const apiDefinition: ApiDefinition = {
      path,
      node,
      // /** The name of the generated graphql document */
      documentVariableName: `${name}Document`,
      // /** The type of the graphql operation */
      operationType: node.operation,
      // /** The type of the result from the graphql operation */
      operationResultType: `${name}Query`,
      // /** The type of the variables for the graphql operation */
      operationVariablesTypes: `${name}QueryVariables`,
    };

    return { ...acc, [key]: [...(acc[key] ?? []), apiDefinition] };
  }, {});
}
