import {
  findEnum,
  findObject,
  findQuery,
  findUnion,
  getObjectName,
  isConnection,
  isEdge,
  isScalarField,
  isValidField,
  isValidObject,
  isValidQuery,
  lowerFirst,
  nodeHasSkipComment,
  OperationType,
  PluginContext,
  printTypescriptType,
  reduceListType,
  reduceNonNullType,
} from "@linear/codegen-doc";
import autoBind from "auto-bind";
import {
  DocumentNode,
  FieldDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
} from "graphql";
import { Sdk } from "./constants";
import { printNamespaced } from "./print";
import {
  SdkConnectionField,
  SdkEnumField,
  SdkInterfaceField,
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
  SdkUnionField,
} from "./types";

/**
 * Ensure the models is not a root operation, an edge, or has a skip comment.
 */
function isValidModel(model: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode, context: PluginContext): boolean {
  const skipComment = nodeHasSkipComment(context, model);
  let skipConnection = false;

  const connection = isConnection(model);
  if (connection && model) {
    // Check the type of this connection is valid
    const rootTypeName = getObjectName(model).replace("Connection", "");
    skipConnection = !isValidObject(
      context,
      context.objects.find(obj => rootTypeName === obj.name.value)
    );
  }

  return (
    !Object.keys(OperationType).includes(lowerFirst(model.name.value)) &&
    !isEdge(model) &&
    !skipComment &&
    !skipConnection
  );
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
      return (node.definitions ?? []).filter(
        definition => typeof (definition as unknown as SdkModel).name === "string"
      ) as unknown as SdkModel[];
    },
  };

  public ObjectTypeDefinition = {
    /** Return an processed valid models */
    leave: leaveObjectOrInterface,
  };

  public InterfaceTypeDefinition = {
    /** Return an processed valid models */
    leave: leaveObjectOrInterface,
  };

  public FieldDefinition = {
    /** Process fields for use in the model output */
    leave: (node: FieldDefinitionNode): SdkModelField | null => {
      if (isValidField(this._context, node)) {
        const name = node.name.value;
        const type = printTypescriptType(this._context, node.type, Sdk.NAMESPACE);
        const query = findQuery(this._context, node);
        const nonNull = Boolean(reduceNonNullType(node.type));

        /** Identify query fields */
        if (query) {
          const args =
            query.arguments?.map(arg => ({
              name: arg.name.value,
              type: printTypescriptType(this._context, node.type, Sdk.NAMESPACE),
              optional: arg.type.kind !== Kind.NON_NULL_TYPE,
              description: `${arg.name.value} to be passed to ${query.name.value}`,
            })) ?? [];

          if (isValidQuery(this._context, query)) {
            return {
              __typename: SdkModelFieldType.query,
              node,
              name,
              type,
              query,
              args,
              nonNull,
            };
          } else {
            return null;
          }
        }

        /** Identify scalar fields */
        if (isScalarField(this._context, node)) {
          return {
            __typename: SdkModelFieldType.scalar,
            node,
            name,
            type,
            nonNull,
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
              nonNull,
            };
          } else {
            return {
              __typename: SdkModelFieldType.list,
              node,
              name,
              type,
              listType,
              nonNull,
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
              nonNull,
            };
          } else {
            return {
              __typename: SdkModelFieldType.object,
              node,
              name,
              type,
              object,
              nonNull,
            };
          }
        }

        /** Identify enum fields */
        const enumField = findEnum(this._context, node);
        if (enumField) {
          return {
            __typename: SdkModelFieldType.enum,
            node,
            name,
            type,
            nonNull,
          };
        }

        /** Identify union fields */
        const unionField = findUnion(this._context, node);
        if (unionField) {
          return {
            __typename: SdkModelFieldType.union,
            node,
            name,
            type,
            union: unionField,
            nonNull,
          };
        }
      }

      /** Ignore the field */
      return null;
    },
  };
}

function leaveObjectOrInterface(_node: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode): SdkModel | undefined {
  if (isValidModel(_node, this._context) && _node.fields?.length) {
    const node = _node as SdkModelNode;
    const name = node.name.value;
    const fields = node.fields;

    return {
      name,
      fragment: `${printNamespaced(this._context, name)}Fragment`,
      node,
      fields: {
        all: fields ?? [],
        scalar: (fields?.filter(field => field.__typename === SdkModelFieldType.scalar) ?? []) as SdkScalarField[],
        query: (fields?.filter(field => field.__typename === SdkModelFieldType.query) ?? []) as SdkQueryField[],
        object: (fields?.filter(field => field.__typename === SdkModelFieldType.object) ?? []) as SdkObjectField[],
        interface: (fields?.filter(field => field.__typename === SdkModelFieldType.interface) ??
          []) as SdkInterfaceField[],
        list: (fields?.filter(field => field.__typename === SdkModelFieldType.list) ?? []) as SdkListField[],
        scalarList: (fields?.filter(field => field.__typename === SdkModelFieldType.scalarList) ??
          []) as SdkScalarListField[],
        connection: (fields?.filter(field => field.__typename === SdkModelFieldType.connection) ??
          []) as SdkConnectionField[],
        enum: (fields?.filter(field => field.__typename === SdkModelFieldType.enum) ?? []) as SdkEnumField[],
        union: (fields?.filter(field => field.__typename === SdkModelFieldType.union) ?? []) as SdkUnionField[],
      },
    };
  } else {
    /** Ignore this object */
    return undefined;
  }
}
