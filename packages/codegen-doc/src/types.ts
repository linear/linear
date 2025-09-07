import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import {
  ASTNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  EnumTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from "graphql";

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
 * The processed fragment object or interface definition
 */
export type Fragment = NamedFields<ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode>;

export interface PluginConfig {
  /**
   * @description A list of field names to omit
   *
   * @exampleMarkdown
   * ```yml
   * schema: ./src/schema.graphql
   * generates:
   *   src/_gen_documents.graphql:
   *     plugins:
   *       - "@linear/codegen-doc"
   *     config:
   *       skipFields:
   *         - "adminCommand"
   *
   * ```
   */
  skipFields?: string[];
  /**
   * @description A list of comment contents used to mark fields for skipping
   *
   * @exampleMarkdown
   * ```yml
   * schema: ./src/schema.graphql
   * generates:
   *   src/_gen_documents.graphql:
   *     plugins:
   *       - "@linear/codegen-doc"
   *     config:
   *       skipComments:
   *         - "[Internal]"
   *         - "-- Deprecated --"
   *
   * ```
   */
  skipComments?: string[];
  /**
   * @description A list of directives to omit
   *
   * @exampleMarkdown
   * ```yml
   * schema: ./src/schema.graphql
   * generates:
   *   src/_gen_documents.graphql:
   *     plugins:
   *       - "@linear/codegen-doc"
   *     config:
   *       skipDirectives:
   *         - "deprecated"
   *
   * ```
   */
  skipDirectives?: string[];
}

/**
 * Stateful context for document building information
 */
export interface PluginContext<C extends PluginConfig = PluginConfig> {
  /** The whole graphql schema */
  schema: GraphQLSchema;
  /** All scalars including custom */
  scalars: typeof DEFAULT_SCALARS;
  /** All generated fragments */
  fragments: Fragment[];
  /** All object definitions */
  objects: ObjectTypeDefinitionNode[];
  /** All interface definitions */
  interfaces: InterfaceTypeDefinitionNode[];
  /** All query field definitions */
  queries: readonly FieldDefinitionNode[];
  /** All mutation field definitions */
  mutations: readonly FieldDefinitionNode[];
  /** A map for determining operation type names */
  operationMap: Record<OperationType, string>;
  /** All implementations of an interface */
  interfaceImplementations: { [interfaceName: string]: ObjectTypeDefinitionNode[] };
  /** All enums */
  enums: readonly EnumTypeDefinitionNode[];
  /** All union types */
  unions: readonly UnionTypeDefinitionNode[];
  /** The plugin config */
  config: C;
}

/**
 * A description of an arg
 */
export interface ArgDefinition {
  /** The name of the argument */
  name: string;
  /** Whether the argument is optional */
  optional: boolean;
  /** The string type of the argument */
  type: string;
  /** The jsdoc definition of the argument */
  description: string;
  /** The name of a default variable */
  defaultName?: string;
}

/**
 * Processed arg definition for printing
 */
export interface ArgList {
  /** The list of arg definitions */
  args: ArgDefinition[];
  /** The jsdoc string for arguments */
  jsdoc: string[];
  /** The typescript string for argument input */
  printInput: string;
  /** The typescript string for argument output */
  printOutput: string;
}
