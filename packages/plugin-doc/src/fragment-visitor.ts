import {
  findObject,
  findQuery,
  getRequiredArgs,
  isConnection,
  isValidFragment,
  Named,
  NamedFields,
  nonNullable,
  PluginContext,
  printGraphqlComment,
  printGraphqlDebug,
  printGraphqlDescription,
  printLines,
  reduceTypeName,
} from "@linear/plugin-common";
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
      return printLines((node.definitions ?? []).map(definition => (typeof definition === "string" ? definition : ``)));
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
        return printLines([
          printGraphqlDescription(node.description?.value),
          printGraphqlDebug(node),
          `fragment ${node.name} on ${node.name} {
              ${printLines(node.fields)}
            }`,
          " ",
        ]);
      }

      /** Ignore this object */
      return null;
    },
  };

  public FieldDefinition = {
    leave: (_node: FieldDefinitionNode): string | null => {
      const type = reduceTypeName(_node.type);

      /** Skip objects defined in constants */
      if (!this._context.config.skipObjects?.includes(type)) {
        const node = (_node as unknown) as Named<FieldDefinitionNode>;
        const description = node.description?.value ? printGraphqlComment([node.description?.value]) : undefined;

        /** Print field name if it is a scalar */
        if (Object.values(this._context.scalars).includes(type)) {
          return printLines([description, printGraphqlDebug(_node), node.name]);
        }

        /** Print all fields required for matching query */
        const query = findQuery(this._context, node);
        if (query) {
          const queryRequiredArgs = getRequiredArgs(query.arguments).map(arg => arg.name.value);

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
          const fragment = findObject(this._context, node);

          if (fragment && !isConnection(fragment)) {
            return printLines([
              description,
              printGraphqlDebug(_node),
              printGraphqlDebug(fragment),
              `${node.name} {
                  ...${fragment.name.value}
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
