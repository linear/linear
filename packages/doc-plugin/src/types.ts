import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { ASTNode, FieldDefinitionNode, GraphQLSchema, ObjectTypeDefinitionNode } from "graphql";

export type Scalars = typeof DEFAULT_SCALARS;

/**
 * Changes name and type properties to string
 */
export type Named<T extends ASTNode> = Omit<T, "name" | "type"> & {
  name: string;
  type: string;
};

/**
 * Changes fields property to a list of strings
 */
export type NamedFields<T extends ASTNode> = Omit<Named<T>, "fields"> & {
  fields: string[];
};

/**
 * Types of operation handled by the plugin
 */
export enum OperationType {
  "query" = "query",
  "mutation" = "mutation",
}

/**
 * The processed fragment object definition
 */
export type Fragment = NamedFields<ObjectTypeDefinitionNode>;

/**
 * Stateful context for document building information
 */
export interface DocPluginContext {
  schema: GraphQLSchema;
  scalars: Scalars;
  fragments: Fragment[];
  objects: ObjectTypeDefinitionNode[];
  queries: readonly FieldDefinitionNode[];
  operationMap: Record<OperationType, string>;
}
