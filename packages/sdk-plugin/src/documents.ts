import { Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadDocuments } from "@graphql-tools/load";
import { nonNullable } from "@linear/common";
import { DefinitionNode, DocumentNode, Kind, OperationDefinitionNode } from "graphql";
import { isChildDefinition } from "./definitions";
import { SdkOperationDefinition } from "./operation";

/**
 * A processed document containing operations with additional detail
 */
export interface SdkDocument extends DocumentNode {
  definitions: (DefinitionNode | SdkOperationDefinition)[];
}

/**
 * A list of documents that may have chained api detail
 */
export type SdkDocuments = (DocumentNode | SdkDocument)[];

/**
 * Get a list of all non null document notes
 *
 * @param documents list of document files
 */
export function getDocumentNodes(documents: Types.DocumentFile[]): DocumentNode[] {
  return documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);
}

/**
 * Load graphql files from a .graphql glob
 *
 * @param fileGlob the file path to load graphql documents from
 */
export function loadDocumentFiles(fileGlob: string): Promise<Types.DocumentFile[]> {
  return loadDocuments(fileGlob, {
    loaders: [new GraphQLFileLoader()],
  });
}

/**
 * Return all operation definitions keyed by the chain key
 */
export function getDocumentOperations(documents: Types.DocumentFile[]): Record<string, OperationDefinitionNode[]> {
  const operations = getDocumentNodes(documents).reduce<OperationDefinitionNode[]>((acc, document) => {
    return document.kind === Kind.DOCUMENT
      ? [
          ...acc,
          ...(document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION) as OperationDefinitionNode[]),
        ]
      : acc;
  }, []);

  return operations.reduce<Record<string, OperationDefinitionNode[]>>((acc, definition) => {
    const chainKey = definition.name?.value.split("_").slice(0, -1).join("_") ?? "";
    const existing = acc[chainKey] ?? [];
    return { ...acc, [chainKey]: [...existing, definition] };
  }, {});
}

/**
 * Get all documents to be added to the root of the sdk
 */
export function getRootDocuments(documents: SdkDocuments): SdkDocuments {
  return documents
    .map(document => ({
      ...document,
      definitions: document.definitions.filter(definition => {
        /** Get all operations that are not to be chained */
        return !isChildDefinition(definition);
      }),
    }))
    .filter(document => document.definitions.length);
}

/**
 * Get all chain keys for creating chained apis
 */
export function getChainKeys(documents: SdkDocuments): string[] {
  const chainKeys = documents.reduce<string[]>((acc, document) => {
    if (document.kind === Kind.DOCUMENT && Array.isArray(document.definitions)) {
      /** Get all chain keys from document definitions */
      return [...acc, ...document.definitions.map(d => (d as SdkOperationDefinition).chainKey).filter(nonNullable)];
    } else {
      return acc;
    }
  }, []);

  return [...new Set(chainKeys)];
}

/**
 * Get all documents to be added to the chained api with matching chain key
 */
export function getChildDocuments(documents: SdkDocuments, chainKey: string): SdkDocuments {
  return documents
    .map(document => ({
      ...document,
      definitions: document.definitions.filter(definition => {
        /** Get all chained operations with the chain key */
        return isChildDefinition(definition) && definition.chainKey === chainKey;
      }),
    }))
    .filter(document => document.definitions.length);
}
