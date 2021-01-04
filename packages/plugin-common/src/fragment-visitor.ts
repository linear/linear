import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
} from "graphql";
import { requiredArgs } from "./args";
import { getTypeName } from "./field";
import { isValidFragment } from "./fragment";
import { printGraphqlDebug, printGraphqlDescription } from "./print";
import { findQuery } from "./query";
import { Named, NamedFields, PluginContext } from "./types";
import { filterJoin, nonNullable } from "./utils";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class FragmentVisitor {
  private _context: PluginContext;

  /** Initialize the visitor */
  public constructor(context: Omit<PluginContext, "fragments">) {
    autoBind(this);

    this._context = { ...context, fragments: [] };
  }

  /**
   * Return the plugin context with fragments
   */
  public get context(): PluginContext {
    return this._context;
  }

  public Document = {
    /** Join all string definitions */
    leave: (node: DocumentNode): string => {
      return filterJoin(
        (node.definitions ?? []).map(x => (typeof x === "string" ? x : ``)),
        "\n"
      );
    },
  };

  public ObjectTypeDefinition = {
    /** Print a fragment if there are fields */
    leave: (_node: ObjectTypeDefinitionNode): string | null => {
      const node = (_node as unknown) as NamedFields<ObjectTypeDefinitionNode>;

      /** Process non empty object definitions */
      if (isValidFragment(this._context, node)) {
        /** Record fragment on context */
        this._context.fragments = [...this._context.fragments, node];

        /** Print fragment */
        return filterJoin(
          [
            printGraphqlDescription(node.description?.value),
            printGraphqlDebug(node),
            `fragment ${node.name} on ${node.name} {
              ${filterJoin(node.fields, "\n")}
            }`,
            " ",
          ],
          "\n"
        );
      }

      /** Ignore this object */
      return null;
    },
  };

  public FieldDefinition = {
    leave: (_node: FieldDefinitionNode): string | null => {
      const node = (_node as unknown) as Named<FieldDefinitionNode>;

      /** Print field name if it is a scalar */
      if (Object.values(this._context.scalars).includes(getTypeName(node.type))) {
        return filterJoin([printGraphqlDebug(_node), node.name], "\n");
      }

      /** Find a query that can return this field */
      const query = findQuery(this._context, node);

      if (query) {
        /** Get all fields required for query arguments */
        const queryRequiredArgs = requiredArgs(query.arguments).map(a => a.name.value);

        return filterJoin(
          [
            printGraphqlDebug(_node),
            printGraphqlDebug(query),
            queryRequiredArgs.length
              ? `${node.name} {
                ${filterJoin(queryRequiredArgs, "\n")}
              }`
              : "",
          ],
          "\n"
        );
      }

      /** Ignore this field */
      return null;
    },
  };

  public Name = {
    /** Print name value */
    leave: (node: NameNode): string => {
      return node.value;
    },
  };

  public NamedType = {
    /** Print type value using scalar map */
    leave: (_node: NamedTypeNode): string => {
      const node = (_node as unknown) as Named<NamedTypeNode>;
      return this._context.scalars[node.name] ?? node.name;
    },
  };

  public NonNullType = {
    /** Return the non nullable type */
    leave: (node: NonNullTypeNode, _: unknown, parent?: unknown): NamedTypeNode | NonNullTypeNode | ListTypeNode => {
      return nonNullable(parent) ? node.type : node;
    },
  };
}
