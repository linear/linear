import {
  ArgumentTypescriptVisitor,
  findObject,
  findQuery,
  isConnection,
  isValidField,
  OperationType,
  PluginContext,
  reduceListType,
  reduceTypeName,
} from "@linear/plugin-common";
import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode, TypeNode, visit } from "graphql";
import c from "./constants";
import {
  SdkListField,
  SdkModel,
  SdkModelField,
  SdkModelNode,
  SdkObjectField,
  SdkQueryField,
  SdkScalarField,
} from "./types";

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
      if (isValidModel(_node) && _node.fields?.length) {
        const node = _node as SdkModelNode;
        return {
          name: node.name.value,
          node,
          scalarFields: (node.fields?.filter(field => field.__typename === "SdkScalarField") ?? []) as SdkScalarField[],
          queryFields: (node.fields?.filter(field => field.__typename === "SdkQueryField") ?? []) as SdkQueryField[],
          objectFields: (node.fields?.filter(field => field.__typename === "SdkObjectField") ?? []) as SdkObjectField[],
          listFields: (node.fields?.filter(field => field.__typename === "SdkListField") ?? []) as SdkListField[],
        };
      } else {
        /** Ignore this object */
        return undefined;
      }
    },
  };

  public FieldDefinition = {
    /** Process fields for use in the model output */
    leave: (node: FieldDefinitionNode): SdkModelField | null => {
      if (isValidField(node)) {
        const name = node.name.value;
        const type = this._printType(node.type);
        const query = findQuery(this._context, node);

        /** Identify query fields */
        if (query) {
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
        }

        /** Identify scalar fields */
        if (Object.keys(this._context.scalars).includes(reduceTypeName(node.type))) {
          return {
            __typename: "SdkScalarField",
            node,
            name,
            type,
          };
        }

        /** Identify list fields */
        const listType = reduceListType(node.type);
        if (listType) {
          return {
            __typename: "SdkListField",
            node,
            name,
            type,
            listType: reduceListType(node.type) as string,
          };
        }

        /** Identify object fields without queries */
        const object = findObject(this._context, node);
        if (object && !isConnection(object)) {
          return {
            __typename: "SdkObjectField",
            node,
            name,
            type,
            object,
          };
        }
      }

      /** Ignore the field */
      return null;
    },
  };
}
