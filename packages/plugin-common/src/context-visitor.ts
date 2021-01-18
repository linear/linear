import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import { FieldDefinitionNode, GraphQLSchema, ObjectTypeDefinitionNode, ScalarTypeDefinitionNode } from "graphql";
import { OperationType, PluginConfig, PluginContext } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class ContextVisitor<C extends PluginConfig> {
  private _schema: GraphQLSchema;
  private _config: C;
  private _scalars: typeof DEFAULT_SCALARS = DEFAULT_SCALARS;
  private _objects: ObjectTypeDefinitionNode[] = [];
  private _queries: readonly FieldDefinitionNode[] = [];

  /** Initialize the visitor */
  public constructor(schema: GraphQLSchema, config: C) {
    autoBind(this);

    this._schema = schema;
    this._config = config;
  }

  /**
   * Return a context object for recording state
   */
  public get context(): Omit<PluginContext<C>, "fragments"> {
    return {
      schema: this._schema,
      config: this._config,
      scalars: this._scalars,
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

  public ObjectTypeDefinition = {
    /** Record all object types */
    enter: (node: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode => {
      if (!node.name.value.endsWith("Edge")) {
        this._objects = [...this._objects, node];
      }

      if (node.name.value === this.context.operationMap[OperationType.query]) {
        /** Record all queries */
        this._queries = node.fields ?? [];
      }

      return node;
    },
  };
}
