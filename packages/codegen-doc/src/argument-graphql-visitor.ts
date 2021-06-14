import autoBind from "auto-bind";
import { InputValueDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode } from "graphql";
import { Named } from "./types";

/**
 * Graphql-codegen visitor for printing a graphql argument
 */
export class ArgumentGraphqlVisitor {
  /** Initialize the visitor */
  public constructor() {
    autoBind(this);
  }

  public Name = {
    /** Print name value */
    leave(node: NameNode): string {
      return node.value;
    },
  };

  public NamedType = {
    /** Print type value */
    leave(_node: NamedTypeNode): string {
      const node = _node as unknown as Named<NamedTypeNode>;
      return node.name;
    },
  };

  public NonNullType = {
    /** Print non null type */
    leave(_node: NonNullTypeNode): string {
      const node = _node as unknown as Named<NonNullTypeNode>;
      return `${node.type}!`;
    },
  };

  public ListType = {
    /** Print the list type */
    leave(_node: ListTypeNode): string {
      const node = _node as unknown as Named<ListTypeNode>;
      return `[${node.type}]`;
    },
  };

  public InputValueDefinition = {
    /** Print the input type */
    leave(_node: InputValueDefinitionNode): string {
      const node = _node as unknown as Named<InputValueDefinitionNode>;
      return node.type;
    },
  };
}
