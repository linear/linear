import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, nonNullable, printGraphqlDebug, printGraphqlDescription } from "@linear/common";
import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  GraphQLSchema,
  ListTypeNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
} from "graphql";
import { requiredArgs } from "./args";
import { getTypeName } from "./field";
import { isConnection, isEdge, isOperationRoot } from "./object";
import { findQuery } from "./query";
import { DocPluginContext, Named, NamedFields, OperationType, Scalars } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class FragmentVisitor {
  private _schema: GraphQLSchema;
  private _scalars: Scalars = DEFAULT_SCALARS;
  private _fragments: NamedFields<ObjectTypeDefinitionNode>[] = [];
  private _objects: ObjectTypeDefinitionNode[] = [];
  private _queries: readonly FieldDefinitionNode[] = [];

  /** Initialize the visitor */
  public constructor(schema: GraphQLSchema) {
    autoBind(this);

    this._schema = schema;
  }

  /**
   * Return a context object for recording state
   */
  public get context(): DocPluginContext {
    return {
      schema: this._schema,
      scalars: this._scalars,
      fragments: this._fragments,
      objects: this._objects,
      queries: this._queries,
      operationMap: {
        [OperationType.query]: this._schema.getQueryType()?.name ?? "Query",
        [OperationType.mutation]: this._schema.getMutationType()?.name ?? "Mutation",
      },
    };
  }

  public ScalarTypeDefinition = {
    /** Record all scalars */
    enter: (node: ScalarTypeDefinitionNode): ScalarTypeDefinitionNode => {
      this._scalars = { ...this._scalars, [node.name.value]: node.name.value };
      return node;
    },
  };

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
    /** Record all object types */
    enter: (node: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode => {
      this._objects = [...this._objects, node];

      if (node.name.value === this.context.operationMap[OperationType.query]) {
        /** Record all queries */
        this._queries = node.fields ?? [];
      }

      return node;
    },

    /** Print a fragment if there are fields */
    leave: (_node: ObjectTypeDefinitionNode): string | null => {
      const node = (_node as unknown) as NamedFields<ObjectTypeDefinitionNode>;
      const hasFields = (node.fields ?? []).filter(x => Boolean(x && x !== "cursor")).length;

      /** Print non empty object definitions */
      if (hasFields && !isConnection(node) && !isEdge(node) && !isOperationRoot(this.context, node)) {
        this._fragments = [...this._fragments, node];
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
      if (Object.values(this._scalars).includes(getTypeName(node.type))) {
        return filterJoin([printGraphqlDebug(_node), node.name], "\n");
      }

      /** Find a query that can return this field */
      const query = findQuery(this.context, node);

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
      return this._scalars[node.name] ?? node.name;
    },
  };

  public NonNullType = {
    /** Return the non nullable type */
    leave: (node: NonNullTypeNode, _: unknown, parent?: unknown): NamedTypeNode | NonNullTypeNode | ListTypeNode => {
      return nonNullable(parent) ? node.type : node;
    },
  };
}
