import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { ASTNode, InputValueDefinitionNode } from "graphql";

export type Scalars = typeof DEFAULT_SCALARS;

/**
 * Changes name and type properties to string
 */
export type Named<T extends ASTNode> = Omit<T, "name" | "type"> & {
  name: string;
  type: string;
};

/**
 * Changes arguments property to a named list of nodes
 */
export type NamedArgs<T extends ASTNode> = Omit<Named<T>, "arguments"> & {
  arguments?: WithNullable<InputValueDefinitionNode>[];
};

/**
 * Changes fields property to a list of strings
 */
export type NamedFields<T extends ASTNode> = Omit<Named<T>, "fields"> & {
  fields: string[];
};

export type WithNullable<T extends ASTNode> = T & {
  nullable: boolean;
};
