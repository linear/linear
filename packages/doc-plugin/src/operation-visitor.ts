import { DEFAULT_SCALARS } from "@graphql-codegen/visitor-plugin-common";
import { filterJoin, getKeyByValue } from "@linear/common";
import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, GraphQLSchema, Kind, ObjectTypeDefinitionNode } from "graphql";
import { isScalarField } from "./field";
import { printOperations } from "./operation";
import { OperationType, OperationVisitorContext } from "./types";

/**
 * Graphql-codegen visitor for processing the ast and generating operations
 */
export class OperationVisitor {
  private _context: OperationVisitorContext = {
    schema: new GraphQLSchema({}),
    scalars: DEFAULT_SCALARS,
    fragments: [],
    objects: [],
    operationMap: { [OperationType.query]: "Query", [OperationType.mutation]: "Mutation" },
    queries: [],
  };

  /** Initialise the visitor */
  public constructor(context: OperationVisitorContext) {
    autoBind(this);

    this._context = context;
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
      const operationType = getKeyByValue(this._context.operationMap, node.name.value);
      return operationType ? { ...node, operationType } : null;
    },

    /** Print all field operations */
    leave: (_node: ObjectTypeDefinitionNode): string | null => {
      const node = (_node as unknown) as ObjectTypeDefinitionNode & { operationType: OperationType };
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
      if (isScalarField(this._context.scalars, node)) {
        return null;
      } else {
        return { ...node, nullable: node.type.kind !== Kind.NON_NULL_TYPE };
      }
    },
  };
}
