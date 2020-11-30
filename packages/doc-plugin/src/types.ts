import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { ASTNode } from "graphql";

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
