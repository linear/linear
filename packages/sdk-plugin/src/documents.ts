import { Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadDocuments } from "@graphql-tools/load";
import { DocumentNode, FieldNode } from "graphql";
import { RawSdkPluginConfig } from "./config";
import c from "./constants";
import { nonNullable } from "./utils";

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
 * Filter a list of documents to return only those that do not match a nested api key
 */
export function getRootDocuments(documents: Types.DocumentFile[], config: RawSdkPluginConfig): DocumentNode[] {
  return getDocumentNodes(documents).map(doc => {
    if (doc.kind === "Document") {
      const nestedDefinitions = doc.definitions.filter(def => {
        if (def.kind === "OperationDefinition" && !config.nestedApiKeys?.includes(def.name?.value ?? "")) {
          /** Operation must not have an id variable */
          const hasIdVariable = (def.variableDefinitions ?? []).find(
            v => v.kind === "VariableDefinition" && v.variable.name.value === c.ID_NAME
          );

          /** Operation must not have the first field named one of the nested api keys */
          const firstField = def.selectionSet.selections.find(s => s.kind === "Field") as FieldNode;
          const firstFieldIsKey = config.nestedApiKeys?.includes(firstField?.name.value);

          return !hasIdVariable || !firstFieldIsKey;
        } else {
          return true;
        }
      });

      return { ...doc, definitions: nestedDefinitions };
    } else {
      return doc;
    }
  });
}

/**
 * Filter a list of documents to return only those relevant to the nestedApiKey
 */
export function getApiDocuments(documents: Types.DocumentFile[], nestedApiKey: string): DocumentNode[] {
  return getDocumentNodes(documents).map(doc => {
    if (doc.kind === "Document") {
      const nestedDefinitions = doc.definitions.filter(def => {
        /** Only consider operations that are not a perfect match to the api key */
        if (def.kind === "OperationDefinition" && def.name?.value !== nestedApiKey) {
          /** Operation must have an id variable */
          const hasIdVariable = (def.variableDefinitions ?? []).find(
            v => v.kind === "VariableDefinition" && v.variable.name.value === c.ID_NAME
          );

          /** Operation must have the first field named the same as the api key */
          const firstField = def.selectionSet.selections.find(s => s.kind === "Field") as FieldNode;
          const firstFieldIsKey = firstField?.name.value === nestedApiKey;

          return hasIdVariable && firstFieldIsKey;
        } else {
          return def.kind !== "OperationDefinition";
        }
      });

      return { ...doc, definitions: nestedDefinitions };
    } else {
      return doc;
    }
  });
}
