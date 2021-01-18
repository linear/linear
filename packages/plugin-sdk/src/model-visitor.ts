import {
  findObject,
  findQuery,
  isConnection,
  isScalarField,
  isValidField,
  lowerFirst,
  OperationType,
  PluginContext,
  printTypescriptType,
  reduceListType,
} from "@linear/plugin-common";
import autoBind from "auto-bind";
import { DocumentNode, FieldDefinitionNode, Kind, ObjectTypeDefinitionNode } from "graphql";
import c from "./constants";
import { printNamespaced } from "./print";
import {
  SdkConnectionField,
  SdkListField,
  SdkModel,
  SdkModelField,
  SdkModelFieldType,
  SdkModelNode,
  SdkObjectField,
  SdkPluginConfig,
  SdkQueryField,
  SdkScalarField,
  SdkScalarListField,
} from "./types";

function isValidModel(model: ObjectTypeDefinitionNode) {
  return !Object.keys(OperationType).includes(lowerFirst(model.name.value)) && !model.name.value.endsWith("Edge");
}

/**
 * Graphql-codegen visitor for processing the ast and generating fragments
 */
export class ModelVisitor {
  private _context: PluginContext<SdkPluginConfig>;

  /** Initialize the visitor */
  public constructor(context: PluginContext<SdkPluginConfig>) {
    autoBind(this);

    this._context = context;
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
        const name = node.name.value;

        return {
          name,
          fragment: `${printNamespaced(this._context, name)}Fragment`,
          node,
          fields: {
            all: node.fields ?? [],
            scalar: (node.fields?.filter(field => field.__typename === SdkModelFieldType.scalar) ??
              []) as SdkScalarField[],
            query: (node.fields?.filter(field => field.__typename === SdkModelFieldType.query) ??
              []) as SdkQueryField[],
            object: (node.fields?.filter(field => field.__typename === SdkModelFieldType.object) ??
              []) as SdkObjectField[],
            list: (node.fields?.filter(field => field.__typename === SdkModelFieldType.list) ?? []) as SdkListField[],
            scalarList: (node.fields?.filter(field => field.__typename === SdkModelFieldType.scalarList) ??
              []) as SdkScalarListField[],
            connection: (node.fields?.filter(field => field.__typename === SdkModelFieldType.connection) ??
              []) as SdkConnectionField[],
          },
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
      if (isValidField(this._context, node)) {
        const name = node.name.value;
        const type = printTypescriptType(this._context, node.type, c.NAMESPACE_DOCUMENT);
        const query = findQuery(this._context, node);

        /** Identify query fields */
        if (query) {
          const args =
            query.arguments?.map(arg => ({
              name: arg.name.value,
              type: printTypescriptType(this._context, node.type, c.NAMESPACE_DOCUMENT),
              optional: arg.type.kind !== Kind.NON_NULL_TYPE,
              description: `${arg.name.value} to be passed to ${query.name.value}`,
            })) ?? [];

          return {
            __typename: SdkModelFieldType.query,
            node,
            name,
            type,
            query,
            args,
          };
        }

        /** Identify scalar fields */
        if (isScalarField(this._context, node)) {
          return {
            __typename: SdkModelFieldType.scalar,
            node,
            name,
            type,
          };
        }

        /** Identify list fields */
        const listType = reduceListType(node.type);
        if (listType) {
          if (Object.keys(this._context.scalars).includes(listType)) {
            return {
              __typename: SdkModelFieldType.scalarList,
              node,
              name,
              type,
              listType: this._context.scalars[listType],
            };
          } else {
            return {
              __typename: SdkModelFieldType.list,
              node,
              name,
              type,
              listType,
            };
          }
        }

        /** Identify object fields without queries */
        const object = findObject(this._context, node);
        if (object) {
          if (isConnection(object)) {
            return {
              __typename: SdkModelFieldType.connection,
              node,
              name,
              type,
              object,
            };
          } else {
            return {
              __typename: SdkModelFieldType.object,
              node,
              name,
              type,
              object,
            };
          }
        }
      }

      /** Ignore the field */
      return null;
    },
  };
}
