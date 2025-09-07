import { ArgDefinition, ArgList, PluginConfig, PluginContext } from "@linear/codegen-doc";
import {
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  OperationDefinitionNode,
} from "graphql";

/**
 * Parsed sdk plugin config
 */
export interface SdkPluginConfig extends PluginConfig {
  documentFile: string;
}

/**
 * The plugin context specific to the sdk plugin config
 */
export interface SdkPluginContext extends PluginContext<SdkPluginConfig> {
  /** Processed models for output */
  models: SdkModel[];
  /** All definitions for the sdk */
  sdkDefinitions: SdkDefinitions;
}

/**
 * Parsed names for printing
 */
export interface SdkOperationPrint {
  /** The name of the operation */
  name: string;
  /** The name of the operation field */
  field: string;
  /** The name of the generated graphql document */
  document: string;
  /** The type of the graphql operation */
  type: string;
  /** The type of the result from the graphql operation */
  response: string;
  /** The typescript safe path through the response to the data */
  responsePath: string;
  /** The type of the variables for the graphql operation */
  variables: string;
  /** The type returned from this operation */
  return: string;
  /** The name of the returned model */
  model: string;
  /** The name of the model in a list, if a list */
  list?: string;
  /** The returned promise result from fetch  */
  promise: string;
}

/**
 * Definition for generating an sdk operation
 */
export interface SdkOperation {
  /** The name of this operation */
  name: string;
  /** The path through the schema to return this data */
  path: string[];
  /** The stringified path through the schema to return this data */
  key: string;
  /** The path through the schema to return the parent operation */
  sdkPath: string[];
  /** The stringified path through the schema to return the parent operation */
  sdkKey: string;
  /** The graphql node being processed with chain info added */
  node: OperationDefinitionNode;
  /** The query for this operation */
  query?: FieldDefinitionNode;
  /** The fragment returned by this operation */
  fragment?: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode;
  /** The model for this operation */
  model?: SdkModel;
  /** All args for this operation */
  args: ArgList;
  /** The required args for this operation */
  requiredArgs: ArgList;
  /** The optional args for this operation */
  optionalArgs: ArgList;
  /** The args for the fetch operation */
  fetchArgs: ArgList;
  /** The required args for the parent operation */
  parentArgs: ArgList;
  /** The parent operation if it exists */
  parent?: SdkOperation;
  /** THe parsed and printed type names required for generation */
  print: SdkOperationPrint;
  /** Whether the response data is non-nullable */
  nonNull: boolean;
}

/**
 * A pairing between an operation field and the definitions corresponding to the field
 */
export interface SdkOperationObject {
  /** The operation field node */
  field: FieldDefinitionNode;
  /** The matching sdk definition */
  definition: SdkDefinition;
  /** The matching query definition */
  queryDefinition: SdkOperation;
}

/**
 * Definition for generating an sdk
 */
export interface SdkDefinition {
  /** The api keys by which to nest operations */
  sdkPath: string[];
  /** The operations to generate */
  operations: SdkOperation[];
}

/**
 * A map from api key to each sdk definition
 */
export type SdkDefinitions = Record<string, SdkDefinition>;

/**
 * Available field types
 */
export enum SdkModelFieldType {
  scalar = "SdkScalarField ",
  query = "SdkQueryField ",
  object = "SdkObjectField ",
  interface = "SdkInterfaceField ",
  list = "SdkListField ",
  scalarList = "SdkScalarListField",
  connection = "SdkConnectionField",
  enum = "SdkEnumField",
  union = "SdkUnionField",
}

/**
 * A field with scalar type
 */
export interface SdkScalarField {
  __typename: SdkModelFieldType.scalar;
  /** The field definition */
  node: FieldDefinitionNode;
  /** The name of the field */
  name: string;
  /** Printed typescript type */
  type: string;
  /** Whether the field is non-nullable */
  nonNull: boolean;
}

/**
 * A field with list type
 */
export interface SdkScalarListField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.scalarList;
  /** The type of the list */
  listType: string;
}

/**
 * A field with object type and a matching query
 */
export interface SdkQueryField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.query;
  /** A query for returning this field if it exists */
  query: FieldDefinitionNode;
  /** The list of all arguments for the query */
  args: ArgDefinition[];
}

/**
 * A field with object type
 */
export interface SdkObjectField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.object;
  /** The object matching this field */
  object: ObjectTypeDefinitionNode;
}

/**
 * A field with interface type
 */
export interface SdkInterfaceField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.interface;
  /** The interface matching this field */
  object: InterfaceTypeDefinitionNode;
}

/**
 * A field with connection object type
 */
export interface SdkConnectionField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.connection;
  /** The connection object matching this field */
  object: ObjectTypeDefinitionNode;
}

/**
 * A field with list type
 */
export interface SdkListField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.list;
  /** The type of the list */
  listType: string;
}

/**
 * A field with enum type
 */
export interface SdkEnumField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.enum;
}

/**
 * A field with union type
 */
export interface SdkUnionField extends Omit<SdkScalarField, "__typename"> {
  __typename: SdkModelFieldType.union;
  /** The union type matching this field */
  union: import("graphql").UnionTypeDefinitionNode;
}

/**
 * One of the model field types
 */
export type SdkModelField =
  | SdkScalarField
  | SdkQueryField
  | SdkObjectField
  | SdkInterfaceField
  | SdkListField
  | SdkScalarListField
  | SdkConnectionField
  | SdkEnumField
  | SdkUnionField;

/**
 * The processed sdk model node
 */
export interface SdkModelNode extends Omit<ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode, "fields"> {
  /** The processed field nodes */
  fields?: SdkModelField[];
}

/**
 * A model definition for the sdk
 */
export interface SdkModel {
  /** The name of the object */
  name: string;
  /** The name of the matching fragment */
  fragment: string;
  /** The object definition */
  node: SdkModelNode;
  /** The map of fields keyed by type */
  fields: {
    all: SdkModelField[];
    scalar: SdkScalarField[];
    query: SdkQueryField[];
    object: SdkObjectField[];
    interface: SdkInterfaceField[];
    list: SdkListField[];
    scalarList: SdkScalarListField[];
    connection: SdkConnectionField[];
    enum: SdkEnumField[];
    union: SdkUnionField[];
  };
}
