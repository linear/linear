import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin } from "@linear/common";
import autoBind from "auto-bind";
import { ASTNode, DocumentNode, FieldDefinitionNode, GraphQLSchema, Kind, ObjectTypeDefinitionNode } from "graphql";
import { printOperationBody, printOperationWrapper } from "./operation";
import { NamedFields, Scalars } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating operations
 */
export class OperationVisitor {
  private _schema: GraphQLSchema = new GraphQLSchema({});
  private _scalars: Scalars = DEFAULT_SCALARS;
  private _fragments: NamedFields<ObjectTypeDefinitionNode>[] = [];
  private _objects: ObjectTypeDefinitionNode[] = [];
  private _operationMap: Record<string, "query" | "mutation"> = {};

  /** Initialise the visitor */
  public constructor(
    schema: GraphQLSchema,
    scalars: Scalars,
    fragments: NamedFields<ObjectTypeDefinitionNode>[],
    objects: ObjectTypeDefinitionNode[]
  ) {
    autoBind(this);
    this._schema = schema;
    this._scalars = scalars;
    this._fragments = fragments;
    this._objects = objects;
    this._operationMap = {
      [schema.getQueryType()?.name ?? "Query"]: "query",
      [schema.getMutationType()?.name ?? "Mutation"]: "mutation",
    };
  }

  public Document = {
    /** Join all string definitions */
    leave(node: DocumentNode): string {
      return filterJoin(
        (node.definitions ?? []).map(x => (typeof x === "string" ? x : "")),
        "\n"
      );
    },
  };

  public ObjectTypeDefinition = {
    _operationMap: this._operationMap,

    /** Filter for operation types only */
    enter(node: ObjectTypeDefinitionNode): ObjectTypeDefinitionNode | null {
      return Object.keys(this._operationMap).includes(node.name.value) ? node : null;
    },

    /** Join all field operations */
    leave(_node: ObjectTypeDefinitionNode): string {
      const node = (_node as unknown) as NamedFields<ObjectTypeDefinitionNode>;
      return filterJoin(node.fields, "\n\n");
    },
  };

  public FieldDefinition = {
    _schema: this._schema,
    _scalars: this._scalars,
    _fragments: this._fragments,
    _objects: this._objects,
    _operationMap: this._operationMap,

    /** Filter for non scalar fields only */
    enter(node: FieldDefinitionNode): (FieldDefinitionNode & { nullable: boolean }) | null {
      if (Object.values(this._scalars).includes(node.type)) {
        return null;
      } else {
        return { ...node, nullable: node.type.kind !== Kind.NON_NULL_TYPE };
      }
    },

    /** Print an operation for each operation type field */
    leave(
      /** The current node being visiting. */
      node: FieldDefinitionNode,
      /** The index or key to this node from the parent node or Array. */
      key: string | number | undefined,
      /** The parent immediately above this node, which may be an Array. */
      p: ASTNode | readonly ASTNode[] | undefined,
      /** The key path to get to this node from the root node. */
      path: readonly (string | number)[],
      /**
       * All nodes and Arrays visited before reaching parent of this node.
       * These correspond to array indices in `path`.
       * Note: ancestors includes arrays which contain the parent of visited node.
       */
      ancestors: readonly (ASTNode | readonly ASTNode[])[]
    ): string | null {
      const operationBody = printOperationBody(node.type, this._fragments, this._objects);

      if (operationBody) {
        const operationTypes = Object.keys(this._operationMap);
        const operation: ObjectTypeDefinitionNode | undefined = Array.isArray(ancestors)
          ? ancestors.find(a => a.kind === Kind.OBJECT_TYPE_DEFINITION && operationTypes.includes(a.name.value))
          : undefined;
        const operationName: string | undefined = this._operationMap[operation?.name.value ?? ""];

        return printOperationWrapper(node, operationName, operationBody);
      }

      return null;
    },
  };
}
