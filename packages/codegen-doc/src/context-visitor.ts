import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import autoBind from "auto-bind";
import {
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  GraphQLSchema,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from "graphql";
import { OperationType, PluginConfig, PluginContext } from "./types";
import { nodeHasSkipComment } from "./utils";

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class ContextVisitor<Config extends PluginConfig> {
  private _schema: GraphQLSchema;
  private _config: Config;
  private _scalars: typeof DEFAULT_SCALARS = DEFAULT_SCALARS;
  private _objects: ObjectTypeDefinitionNode[] = [];
  private _interfaces: InterfaceTypeDefinitionNode[] = [];
  private _queries: FieldDefinitionNode[] = [];
  private _mutations: FieldDefinitionNode[] = [];
  private _interfaceImplementations: { [interfaceName: string]: ObjectTypeDefinitionNode[] } = {};
  private _enums: EnumTypeDefinitionNode[] = [];
  private _unions: UnionTypeDefinitionNode[] = [];

  /** Initialize the visitor */
  public constructor(schema: GraphQLSchema, config: Config) {
    autoBind(this);

    this._schema = schema;
    this._config = config;
  }

  /**
   * Return a context object for recording state
   */
  public get context(): Omit<PluginContext<Config>, "fragments"> {
    return {
      schema: this._schema,
      config: this._config,
      scalars: this._scalars,
      objects: this._objects,
      interfaces: this._interfaces,
      queries: this._queries,
      mutations: this._mutations,
      operationMap: {
        [OperationType.query]: this._schema.getQueryType()?.name ?? "Query",
        [OperationType.mutation]: this._schema.getMutationType()?.name ?? "Mutation",
      },
      interfaceImplementations: Object.fromEntries(
        this._interfaces
          .filter(interfaceDefinition => !["Node", "Entity"].includes(interfaceDefinition.name.value))
          .map(interfaceDefinition => [
            interfaceDefinition.name.value,
            this._objects.filter(
              objectDefinition =>
                !nodeHasSkipComment({ config: this._config } as unknown as PluginContext, objectDefinition) &&
                objectDefinition.interfaces?.some(i => i.name.value === interfaceDefinition.name.value)
            ),
          ])
      ),
      enums: this._enums,
      unions: this._unions,
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
        this._queries = node.fields as FieldDefinitionNode[];
      } else if (node.name.value === this.context.operationMap[OperationType.mutation]) {
        /** Record all mutations */
        this._mutations = node.fields as FieldDefinitionNode[];
      }

      return node;
    },
  };

  public InterfaceTypeDefinition = {
    /** Record all interface types */
    enter: (node: InterfaceTypeDefinitionNode): InterfaceTypeDefinitionNode => {
      this._interfaces = [...this._interfaces, node];
      return node;
    },
  };

  public EnumTypeDefinition = {
    /** Record all enums types */
    enter: (node: EnumTypeDefinitionNode): EnumTypeDefinitionNode => {
      this._enums = [...this._enums, node];
      return node;
    },
  };

  public UnionTypeDefinition = {
    /** Record all union types */
    enter: (node: UnionTypeDefinitionNode): UnionTypeDefinitionNode => {
      this._unions = [...this._unions, node];
      return node;
    },
  };
}
