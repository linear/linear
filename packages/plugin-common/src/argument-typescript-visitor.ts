import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import {
  InputValueDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  VariableDefinitionNode,
} from "graphql";
import { Named, PluginContext } from "./types";
import { filterJoin } from "./utils";

/**
 * Graphql-codegen visitor for printing a typescript argument
 */
export class ArgumentTypescriptVisitor<C> {
  private _context: PluginContext<C>;
  private _namespace?: string;

  /** Initialize the visitor */
  public constructor(context: PluginContext<C>, namespace?: string) {
    autoBind(this);

    this._context = context;
    this._namespace = namespace;
  }

  public VariableDefinition = {
    /** Print variable type */
    leave(_node: VariableDefinitionNode): string {
      const node = (_node as unknown) as Named<VariableDefinitionNode>;
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
      const node = (_node as unknown) as Named<NamedTypeNode>;
      if (this._context.scalars[node.name]) {
        return DEFAULT_SCALARS[node.name] ?? `${filterJoin([this._namespace, "Scalars"], ".")}['${node.name}']`;
      } else {
        return filterJoin([this._namespace, node.name], ".");
      }
    },
  };

  public NonNullType = {
    /** Print non null type */
    leave: (_node: NonNullTypeNode): string => {
      const node = (_node as unknown) as Named<NonNullTypeNode>;
      return node.type;
    },
  };

  public ListType = {
    /** Print the list type */
    leave: (_node: ListTypeNode): string => {
      const node = (_node as unknown) as Named<ListTypeNode>;
      return `${node.type}[]`;
    },
  };

  public InputValueDefinition = {
    /** Print the input type */
    leave: (_node: InputValueDefinitionNode): string => {
      const node = (_node as unknown) as Named<InputValueDefinitionNode>;
      return node.type;
    },
  };
}
