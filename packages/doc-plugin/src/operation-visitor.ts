import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin } from "@linear/common";
import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, GraphQLSchema, Kind, ObjectTypeDefinitionNode } from "graphql";
import { isScalarField } from "./field";
import { printOperations } from "./operation";
import { NamedFields, OperationType, OperationVisitorContext, Scalars } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating operations
 */
export class OperationVisitor {
  private _context: OperationVisitorContext = {
    schema: new GraphQLSchema({}),
    scalars: DEFAULT_SCALARS,
    fragments: [],
    objects: [],
    operationMap: {},
    queries: [],
  };

  /** Initialise the visitor */
  public constructor(
    schema: GraphQLSchema,
    scalars: Scalars,
    fragments: NamedFields<ObjectTypeDefinitionNode>[],
    objects: ObjectTypeDefinitionNode[]
  ) {
    autoBind(this);
    const queryType = schema.getQueryType()?.name ?? "Query";
    const operationMap = {
      [queryType]: OperationType.query,
      [schema.getMutationType()?.name ?? "Mutation"]: OperationType.mutation,
    };

    this._context = {
      schema,
      scalars,
      fragments,
      objects,
      operationMap,
      queries: objects.find(o => o.name.value === queryType)?.fields ?? [],
    };
  }

  public Document = {
    /** Join all string definitions */
    leave: (node: DocumentNode): string => {
      return filterJoin(
        (node.definitions ?? []).map(x => (typeof x === "string" ? x : "")),
        "\n"
      );
    },
  };

  public ObjectTypeDefinition = {
    /** Filter for operation types only */
    enter: (node: ObjectTypeDefinitionNode): (ObjectTypeDefinitionNode & { operationType: OperationType }) | null => {
      const operationType = this._context.operationMap[node.name.value];
      return operationType ? { ...node, operationType } : null;
    },

    /** Join all field operations */
    leave: (
      _node: ObjectTypeDefinitionNode
      // /** The index or key to this node from the parent node or Array. */
      // _key: string | number | undefined,
      // /** The parent immediately above this node, which may be an Array. */
      // _parents: ASTNode | readonly ASTNode[] | undefined,
      // /** The key path to get to this node from the root node. */
      // _path: readonly (string | number)[],
      // /**
      //  * All nodes and Arrays visited before reaching parent of this node.
      //  * These correspond to array indices in `path`.
      //  * Note: ancestors includes arrays which contain the parent of visited node.
      //  */
      // _ancestors: readonly (ASTNode | readonly ASTNode[])[]
    ): string | null => {
      const node = (_node as unknown) as ObjectTypeDefinitionNode & { operationType: OperationType };

      // console.log(
      //   "-------------------- operation-visitor --> ObjectTypeDefinition",
      //   node.name.value,
      //   require("util").inspect(
      //     {
      //       parents: Array.isArray(parents)
      //         ? parents?.map(x =>
      //             Array.isArray(x) ? x.map(y => y?.name?.value ?? y?.type?.value) : x?.name?.value ?? x?.type?.value
      //           )
      //         : ((parents as unknown) as any)?.name?.value,
      //       ancestors: Array.isArray(ancestors)
      //         ? ancestors?.map(x =>
      //             Array.isArray(x) ? x.map(y => y?.name?.value ?? y?.type?.value) : x?.name?.value ?? x?.type?.value
      //           )
      //         : ((ancestors as unknown) as any)?.name?.value,
      //       key,
      //       path,
      //       node,
      //     },
      //     false,
      //     null
      //   )
      // );
      return filterJoin(
        node.fields?.map(field => {
          return field ? printOperations(this._context, node.operationType, [field]) : undefined;
        }),
        "\n\n"
      );
    },
  };

  public FieldDefinition = {
    /** Filter for non scalar fields only */
    enter: (node: FieldDefinitionNode): (FieldDefinitionNode & { nullable: boolean }) | null => {
      // console.log(
      //   "-------------------- operation-visitor --> fielddefinition",
      //   require("util").inspect(
      //     { node, isSclar: Object.keys(this._context.scalars).includes(getTypeName(node.type)) },
      //     false,
      //     null
      //   )
      // );
      if (isScalarField(this._context.scalars, node)) {
        return null;
      } else {
        return { ...node, nullable: node.type.kind !== Kind.NON_NULL_TYPE };
      }
    },

    // /** Print an operation for each operation type field */
    // leave:(
    //   /** The current node being visiting. */
    //   node: FieldDefinitionNode,
    //   /** The index or key to this node from the parent node or Array. */
    //   key: string | number | undefined,
    //   /** The parent immediately above this node, which may be an Array. */
    //   parents: ASTNode | readonly ASTNode[] | undefined,
    //   /** The key path to get to this node from the root node. */
    //   path: readonly (string | number)[],
    //   /**
    //    * All nodes and Arrays visited before reaching parent of this node.
    //    * These correspond to array indices in `path`.
    //    * Note: ancestors includes arrays which contain the parent of visited node.
    //    */
    //   ancestors: readonly (ASTNode | readonly ASTNode[])[]
    // ): string | null => {
    //   return printFieldOperation(this._context, node, key, parents, path, ancestors);
    // },
  };
}
