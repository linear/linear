import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, nonNullable } from "@linear/common";
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
import c from "./constants";
import { getTypeName } from "./field";
import { findQuery } from "./query";
import { Named, NamedFields, OperationType, Scalars } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class FragmentVisitor {
  private _schema: GraphQLSchema;
  private _scalars: Scalars = DEFAULT_SCALARS;
  private _fragments: NamedFields<ObjectTypeDefinitionNode>[] = [];
  private _objects: ObjectTypeDefinitionNode[] = [];
  private _queries: readonly FieldDefinitionNode[] = [];

  /** Initialise the visitor */
  public constructor(schema: GraphQLSchema) {
    autoBind(this);

    this._schema = schema;
  }

  /**
   * Return all scalar definitions
   */
  public get scalars(): Scalars {
    return this._scalars;
  }

  /**
   * Return all fragment definitions
   */
  public get fragments(): NamedFields<ObjectTypeDefinitionNode>[] {
    return this._fragments;
  }

  /**
   * Return all object definitions
   */
  public get objects(): ObjectTypeDefinitionNode[] {
    return this._objects;
  }

  /**
   * Return all query definitions
   */
  public get queries(): readonly FieldDefinitionNode[] {
    return this._queries;
  }

  /**
   * Return a map between operation types and the schema name
   */
  public get operationMap(): Record<OperationType, string> {
    return {
      [OperationType.query]: this._schema.getQueryType()?.name ?? "Query",
      [OperationType.mutation]: this._schema.getMutationType()?.name ?? "Mutation",
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

      if (node.name.value === this.operationMap[OperationType.query]) {
        /** Record all queries */
        this._queries = node.fields ?? [];
      }

      return node;
    },

    /** Print a fragment if there are fields */
    leave: (_node: ObjectTypeDefinitionNode): string | null => {
      const node = (_node as unknown) as NamedFields<ObjectTypeDefinitionNode>;
      const hasFields = (node.fields ?? []).filter(x => Boolean(x && x !== "cursor")).length;
      const isConnection = node.name.endsWith(c.CONNECTION_TYPE);
      const isEdge = node.name.endsWith(c.EDGE_TYPE);
      const isOperationRoot = Object.values(this.operationMap).includes(node.name);

      /** Print non empty object definitions */
      if (hasFields && !isConnection && !isEdge && !isOperationRoot) {
        this._fragments = [...this._fragments, node];
        return filterJoin(
          [
            `fragment ${node.name} on ${node.name} {
              ${filterJoin(node.fields, "\n")}
            }`,
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
        return node.name;
      }

      /** Find a query that can return this field */
      const query = findQuery(this.queries, node);

      if (query) {
        /** Get all fields required for query arguments */
        const queryRequiredArgs = requiredArgs(query.arguments).map(a => a.name.value);

        return queryRequiredArgs.length
          ? `${node.name} {
            ${filterJoin(queryRequiredArgs, "\n")}
          }`
          : "";
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
