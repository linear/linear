import autoBind from "auto-bind";
import {
  InputValueDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  VariableDefinitionNode,
} from "graphql";
import { printList } from "./print";
import { printTypescriptScalar } from "./scalar";
import { Named, PluginContext } from "./types";

/**
 * Graphql-codegen visitor for printing a typescript argument
 */
export class ArgumentTypescriptVisitor {
  private _context: PluginContext;
  private _namespace?: string;

  /** Initialize the visitor */
  public constructor(context: PluginContext, namespace?: string) {
    autoBind(this);

    this._context = context;
    this._namespace = namespace;
  }

  public VariableDefinition = {
    /** Print variable type */
    leave(_node: VariableDefinitionNode): string {
      const node = _node as unknown as Named<VariableDefinitionNode>;
      return node.type;
    },
  };

  public Name = {
    /** Print name value */
    leave(node: NameNode): string {
      return node.value;
    },
  };

  public NamedType = {
    /** Print scalar name if present or attach namespace */
    leave: (_node: NamedTypeNode): string => {
      const node = _node as unknown as Named<NamedTypeNode>;
      if (this._context.scalars[node.name]) {
        return printTypescriptScalar(node.name, this._namespace);
      } else {
        return printList([this._namespace, node.name], ".");
      }
    },
  };

  public NonNullType = {
    /** Print non null type */
    leave: (_node: NonNullTypeNode): string => {
      const node = _node as unknown as Named<NonNullTypeNode>;
      return node.type;
    },
  };

  public ListType = {
    /** Print the list type */
    leave: (_node: ListTypeNode): string => {
      const node = _node as unknown as Named<ListTypeNode>;
      return `${node.type}[]`;
    },
  };

  public InputValueDefinition = {
    /** Print the input type */
    leave: (_node: InputValueDefinitionNode): string => {
      const node = _node as unknown as Named<InputValueDefinitionNode>;
      return node.type;
    },
  };
}
