import { OperationDefinitionNode } from "graphql";

/**
 * Description for generating a chained api function
 */
export interface ApiDefinition {
  /** The path through the schema to return this data */
  path: string[];
  /** The operation node itself */
  operation: OperationDefinitionNode;
}

/**
 * A map from api path to a list of definitions for that path
 */
export type ApiDefinitions = Record<string, ApiDefinition[]>;
