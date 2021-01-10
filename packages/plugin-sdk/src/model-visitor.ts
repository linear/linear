import { ArgumentTypescriptVisitor, findQuery, getTypeName, OperationType, PluginContext } from "@linear/plugin-common";
import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode, TypeNode, visit } from "graphql";
import c from "./constants";
import { SdkModel, SdkModelNode, SdkQueryField, SdkScalarField } from "./types";

function isValidModel(model: ObjectTypeDefinitionNode) {
  return !Object.keys(OperationType).includes(model.name.value.toLowerCase()) && !model.name.value.endsWith("Edge");
}

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class ModelVisitor<C> {
  private _context: PluginContext<C>;
  private _argVisitor: ArgumentTypescriptVisitor<C>;

  /** Initialize the visitor */
  public constructor(context: PluginContext<C>) {
    autoBind(this);

    this._context = context;
    this._argVisitor = new ArgumentTypescriptVisitor(context, c.NAMESPACE_DOCUMENT);
  }

  private _printType(node: TypeNode) {
    return visit(node, this._argVisitor);
  }

  public Document = {
    /** Return the definitions */
    leave: (node: DocumentNode): SdkModel[] => {
      return ((node.definitions ?? []).filter(
        definition => typeof ((definition as unknown) as SdkModel).name === "string"
      ) as unknown) as SdkModel[];
    },
  };

  public ObjectTypeDefinition = {
    /** Return an processed valid models */
    leave: (_node: ObjectTypeDefinitionNode): SdkModel | undefined => {
      if (isValidModel(_node)) {
        const node = _node as SdkModelNode;
        return {
          name: node.name.value,
          node,
          scalarFields: (node.fields?.filter(field => field.__typename === "SdkScalarField") ?? []) as SdkScalarField[],
          queryFields: (node.fields?.filter(field => field.__typename === "SdkQueryField") ?? []) as SdkQueryField[],
        };
      } else {
        /** Ignore this object */
        return undefined;
      }
    },
  };

  public FieldDefinition = {
    /** Process fields for use in the model output */
    leave: (node: FieldDefinitionNode): SdkQueryField | SdkScalarField | null => {
      const name = node.name.value;
      const type = this._printType(node.type);
      const query = findQuery(this._context, node);

      if (query) {
        /** Attach query detail to field */
        const args =
          query.arguments?.map(arg => ({
            name: arg.name.value,
            type: this._printType(node.type),
            optional: arg.type.kind !== Kind.NON_NULL_TYPE,
            description: `${arg.name.value} to be passed to ${query.name.value}`,
          })) ?? [];

        return {
          __typename: "SdkQueryField",
          node,
          name,
          type,
          query,
          args,
        };
      } else if (Object.keys(this._context.scalars).includes(getTypeName(node.type))) {
        /** Identify scalar fields */
        return {
          __typename: "SdkScalarField",
          node,
          name,
          type,
        };
      } else {
        /** Ignore the field */
        return null;
      }
    },
  };
}
