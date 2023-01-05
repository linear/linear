import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
} from "graphql";
import { getRequiredArgs } from "./args";
import { isValidField } from "./field";
import { isValidObject } from "./fragment";
import { findInterface, findObject, isConnection } from "./object";
import { printGraphqlComment, printGraphqlDebug, printGraphqlDescription, printLines } from "./print";
import { findQuery } from "./query";
import { Fragment, Named, NamedFields, PluginContext } from "./types";
import { nonNullable, reduceTypeName } from "./utils";
import { conflictsWithInterfaceDefinition } from "./interface";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class FragmentVisitor {
  private _context: PluginContext;
  private _fragments: Fragment[] = [];

  /** Initialize the visitor */
  public constructor(context: Omit<PluginContext, "fragments">) {
    autoBind(this);

    this._context = { ...context, fragments: [] };
  }

  /**
   * Return the plugin context with fragments
   */
  public get context(): PluginContext {
    return {
      ...this._context,
      fragments: this._fragments,
    };
  }

  public Document = {
    /** Join all string definitions */
    leave: (node: DocumentNode): string => {
      return printLines(
        (node.definitions ?? []).map(definition => (typeof definition === "string" ? definition : ``)).sort()
      );
    },
  };

  public ObjectTypeDefinition = {
    /** Print a fragment if there are fields */
    leave: (_node: ObjectTypeDefinitionNode): string | null => {
      const node = _node as unknown as NamedFields<ObjectTypeDefinitionNode>;

      /** Process non empty object definitions */
      if (isValidObject(this._context, node)) {
        /** Record fragment on context */
        this._fragments = [...this._fragments, node];

        /** Print fragment */
        return printLines([
          printGraphqlDescription(node.description?.value),
          printGraphqlDebug(node),
          `fragment ${node.name} on ${node.name} {
            __typename
            ${printLines(node.fields.sort())}
          }`,
          " ",
        ]);
      }

      /** Ignore this object */
      return null;
    },
  };

  public InterfaceTypeDefinition = {
    /** Print a fragment if there are fields */
    leave: (_node: InterfaceTypeDefinitionNode): string | null => {
      const node = _node as unknown as NamedFields<InterfaceTypeDefinitionNode>;

      this._fragments = [...this._fragments, node];

      return printLines([
        printGraphqlDescription(node.description?.value),
        printGraphqlDebug(node),
        `fragment ${node.name} on ${node.name} {
          __typename
          ${printLines(node.fields.sort())}
            ${(
              this._context.interfaceImplementations[node.name]
                ?.filter(
                  interfaceImplementation =>
                    !conflictsWithInterfaceDefinition(interfaceImplementation, this._context.interfaces)
                )
                .map(
                  obj => `
                ... on ${obj.name.value} {
                  ... ${obj.name.value}
                }`
                ) ?? []
            ).join("\n")}
          }
        `,
      ]);
    },
  };

  public FieldDefinition = {
    leave: (_node: FieldDefinitionNode): string | null => {
      const type = reduceTypeName(_node.type);

      /** Skip objects defined in constants */
      if (isValidField(this._context, _node)) {
        const node = _node as unknown as Named<FieldDefinitionNode>;
        const description = node.description?.value ? printGraphqlComment([node.description?.value]) : undefined;

        /** Print field name if it is a scalar */
        if (Object.values(this._context.scalars).includes(type)) {
          return printLines([description, printGraphqlDebug(_node), node.name]);
        }

        /** Print all fields required for matching query */
        const query = findQuery(this._context, node);

        if (query) {
          const queryRequiredArgs = getRequiredArgs(query.arguments)
            .map(arg => arg.name.value)
            .sort();

          if (queryRequiredArgs.length) {
            return printLines([
              description,
              printGraphqlDebug(_node),
              printGraphqlDebug(query),
              queryRequiredArgs.length
                ? `${node.name} {
                      ${printLines(queryRequiredArgs)}
                    }`
                : "",
            ]);
          }
        } else {
          /** Print a matching fragment if no query */
          const objectFragment = findObject(this._context, node);
          const interfaceFragment = findInterface(this._context, node);

          if (objectFragment && !isConnection(objectFragment)) {
            return printLines([
              description,
              printGraphqlDebug(_node),
              printGraphqlDebug(objectFragment),
              `${node.name} {
                ...${objectFragment.name.value}
              }`,
            ]);
          } else if (interfaceFragment) {
            return printLines([
              description,
              printGraphqlDebug(_node),
              printGraphqlDebug(interfaceFragment),
              `${node.name} {
                ...${interfaceFragment.name.value}
              }`,
            ]);
          }
        }
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
      const node = _node as unknown as Named<NamedTypeNode>;
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
