import { Types } from "@graphql-codegen/plugin-helpers";
import {
  ArgDefinition,
  getArgList,
  logger,
  nonNullable,
  PluginContext,
  printList,
  printPascal,
  printTypescriptType,
  reduceListType,
  reduceTypeName,
  upperFirst,
} from "@linear/plugin-common";
import { DocumentNode, FieldNode, FragmentSpreadNode, Kind, OperationDefinitionNode } from "graphql";
import c from "./constants";
import { printNamespaced } from "./print";
import { SdkDefinitions, SdkModel, SdkOperation, SdkOperationPrint, SdkPluginConfig } from "./types";
import { getOptionalVariables, getRequiredVariables } from "./variable";

/**
 * Get a list of all non null document notes
 */
function getDocumentNodes(documents: Types.DocumentFile[]): DocumentNode[] {
  return documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);
}

/**
 * Get all operation definitions from an array of document files
 */
function getOperations(documents: Types.DocumentFile[]): OperationDefinitionNode[] {
  return getDocumentNodes(documents).reduce<OperationDefinitionNode[]>((acc, document) => {
    return document.kind === Kind.DOCUMENT
      ? [
          ...acc,
          ...(document?.definitions.filter(d => d.kind === Kind.OPERATION_DEFINITION) as OperationDefinitionNode[]),
        ]
      : acc;
  }, []);
}

/**
 * Process the documents and return a definition object for generating the api
 */
export function parseOperations(
  context: PluginContext<SdkPluginConfig>,
  documents: Types.DocumentFile[],
  models: SdkModel[]
): SdkDefinitions {
  return getOperations(documents).reduce<SdkDefinitions>((acc, node) => {
    const path = (node.name?.value ?? "").split("_");
    const sdkPath = path.slice(0, path.length - 1);
    const sdkKey = sdkPath.join("_");
    const operationName = printPascal(node.name?.value);
    const operationType = printPascal(node.operation);

    /** Find a matching query if it exists */
    const query = context.queries.find(q => q.name.value === node.name?.value);

    /** Identify returned field node */
    const returnedField = path.reduce<OperationDefinitionNode | FieldNode | undefined>((acc2, name) => {
      return acc2?.selectionSet?.selections.find(selection => {
        return selection.kind === Kind.FIELD && selection.name.value === name;
      }) as FieldNode | undefined;
    }, node);

    /** Identify returned fragment spread */
    const fragmentNode = returnedField?.selectionSet?.selections.find(selection => {
      return selection.kind === Kind.FRAGMENT_SPREAD;
    }) as FragmentSpreadNode | undefined;
    const fragment = context.objects.find(object => object.name.value === fragmentNode?.name.value);

    /** Store printable type names */
    const modelName = query ? reduceTypeName(query.type) : fragment?.name.value ?? "UNKNOWN_MODEL";
    const listName = query ? reduceListType(query.type) : undefined;
    const print: SdkOperationPrint = {
      name: operationName,
      /** The name of the generated graphql document */
      document: printNamespaced(context, `${operationName}Document`),
      /** The type of the graphql operation */
      type: operationType,
      /** The type of the result from the graphql operation */
      response: `${operationName}${operationType}`,
      /** The type of the variables for the graphql operation */
      variables: printNamespaced(context, `${operationName}${operationType}Variables`),
      /** The type returned from this operation */
      return: `${path.map(upperFirst).join("_")}${operationType}Response`,
      /** The name of the returned model */
      model: modelName,
      /** The name of the model in a list, if a list */
      list: listName,
      /** The returned promise result from fetch  */
      promise: `Promise<${modelName}${listName ? "[]" : ""} | undefined>`,
    };

    /** Find a matching model */
    const model = query
      ? models.find(
          b =>
            /** Find model that matches query type */
            b.name === printTypescriptType(context, query.type) ||
            /** Or the returned fragment type */
            b.name === fragment?.name.value
        )
      : undefined;

    /** Find a parent operation */
    const parentSdkKey = sdkPath.slice(0, -1).join("_");
    const parent = acc[parentSdkKey]?.operations.find(d => d.path.join("_") === sdkKey);
    if (node.name?.value === "user_assignedIssues") {
      logger.trace({ acc, sdkKey, node });
    }

    /** Argument definition for each required variable */
    const requiredVariables: ArgDefinition[] = getRequiredVariables(node).map(v => ({
      name: v.variable.name.value,
      type: printTypescriptType(context, v.type, c.NAMESPACE_DOCUMENT),
      optional: false,
      description: `required ${v.variable.name.value} variable to set the ${sdkPath.join(" ")} scope`,
    }));

    /** Single definition for any optional variables */
    const optionalVariables = getOptionalVariables(node);
    const omittedVariableNames = [
      ...(parent?.requiredArgs.args.map(v => `'${v.name}'`) ?? []),
      ...requiredVariables.map(v => `'${v.name}'`),
    ];
    const optionalArg = requiredVariables.length
      ? {
          name: c.VARIABLE_NAME,
          optional: true,
          type: `Omit<${print.variables}, ${printList(omittedVariableNames, " | ")}>`,
          description: `variables without ${printList(omittedVariableNames, ", ")} to pass into the ${print.response}`,
        }
      : {
          name: c.VARIABLE_NAME,
          optional: true,
          type: print.variables,
          description: `variables to pass into the ${print.response}`,
        };

    /** Spread required variables first */
    const args = [...requiredVariables, optionalVariables.length ? optionalArg : undefined].filter(nonNullable);

    /** Fetch args without parent required args */
    const parentArgs = parent?.requiredArgs.args ?? [];
    const parentArgNames = parentArgs.map(a => a.name);
    const fetchArgs = getArgList(args.filter(a => !parentArgNames.includes(a.name)));

    /** Create the operation */
    const sdkOperation: SdkOperation = {
      name: operationName,
      path: path,
      key: path.join("_"),
      sdkKey,
      sdkPath,
      node,
      query,
      model,
      fragment,
      requiredArgs: getArgList(args.filter(a => !a.optional)),
      optionalArgs: getArgList(args.filter(a => a.optional)),
      parentArgs: getArgList(parentArgs),
      fetchArgs,
      parent,
      print,
    };

    /** Return merged operations */
    return {
      ...acc,
      [sdkKey]: {
        sdkPath,
        operations: [...(acc[sdkKey]?.operations ?? []), sdkOperation],
      },
    };
  }, {});
}
