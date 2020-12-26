import { Types } from "@graphql-codegen/plugin-helpers";
import { nonNullable } from "@linear/common";
import { DocumentNode, Kind, OperationDefinitionNode } from "graphql";
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
  return getOperations(documents).reduce<ApiDefinitions>((acc, operation) => {
    const path = (operation.name?.value ?? "").split("_");
    const key = path.slice(0, path.length - 1).join("_");
    const apiDefinition: ApiDefinition = {
      path,
      operation,
    };

    return { ...acc, [key]: [...(acc[key] ?? []), apiDefinition] };
  }, {});
}
