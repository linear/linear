import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode } from "graphql";
import { isScalarField } from "./field";
import { printLines } from "./print";
import { printOperations } from "./print-operation";
import { OperationType, PluginContext } from "./types";
import { getKeyByValue } from "./utils";

/**
 * Graphql-codegen visitor for processing the ast and generating operations
 */
export class OperationVisitor {
  private _context: PluginContext;

  /** Initialize the visitor */
  public constructor(context: PluginContext) {
    autoBind(this);

    this._context = context;
  }

  public Document = {
    /** Join all string definitions */
    leave: (node: DocumentNode): string => {
      return printLines(
        (node.definitions ?? []).map(definition => (typeof definition === "string" ? definition : "")).sort()
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
      const node = _node as unknown as ObjectTypeDefinitionNode & { operationType: OperationType };
      return printLines(
        node.fields?.map(field => {
          return field ? printOperations(this._context, node.operationType, [field]) : undefined;
        })
      );
    },
  };

  public FieldDefinition = {
    /** Filter for non scalar fields only */
    enter: (node: FieldDefinitionNode): (FieldDefinitionNode & { nullable: boolean }) | null => {
      if (isScalarField(this._context, node)) {
        return null;
      } else {
        return { ...node, nullable: node.type.kind !== Kind.NON_NULL_TYPE };
      }
    },
  };
}
