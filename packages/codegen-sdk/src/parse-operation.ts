import { Types } from "@graphql-codegen/plugin-helpers";
import {
  ArgDefinition,
  getArgList,
  getOptionalVariables,
  getRequiredVariables,
  nonNullable,
  PluginContext,
  printList,
  printPascal,
  printTypescriptType,
  reduceNonNullType,
  upperFirst,
} from "@linear/codegen-doc";
import { DocumentNode, FieldNode, FragmentSpreadNode, Kind, OperationDefinitionNode } from "graphql";
import { Sdk } from "./constants";
import { printNamespaced } from "./print";
import { SdkDefinitions, SdkModel, SdkOperation, SdkOperationPrint, SdkPluginConfig } from "./types";

/**
 * Get a list of all non null document notes
 */
function getDocumentNodes(documents: Types.DocumentFile[]): DocumentNode[] {
  return documents.reduce<DocumentNode[]>((prev, node) => {
    return [...prev, node.document].filter(nonNullable);
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
          ...(document?.definitions.filter(
            definition => definition.kind === Kind.OPERATION_DEFINITION
          ) as OperationDefinitionNode[]),
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
  const operations = getOperations(documents);

  return operations.reduce<SdkDefinitions>((acc, node) => {
    const path = (node.name?.value ?? "").split("_");
    const sdkPath = path.slice(0, path.length - 1);
    const sdkKey = sdkPath.join("_");
    const operationName = printPascal(node.name?.value);
    const operationType = printPascal(node.operation);

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

    /** Find a matching query or mutation for descriptions */
    const query =
      context.queries.find(q => q.name.value === node.name?.value) ??
      context.mutations.find(q => q.name.value === node.name?.value);

    /** Identify list types */
    const queryType = printTypescriptType(context, query?.type);
    const listType = queryType?.endsWith("[]") ? queryType : undefined;

    /** Find a matching model */
    const model = models.find(b => b.name === fragment?.name.value);
    const modelName = model?.name ?? "UNKNOWN_MODEL";

    /** Find a parent operation */
    const parentSdkKey = sdkPath.slice(0, -1).join("_");
    const parent = acc[parentSdkKey]?.operations.find(operation => operation.path.join("_") === sdkKey);

    /** Build the path through the response to the data */
    const responsePath = parent
      ? printList([parent?.print.responsePath, returnedField?.name?.value], parent?.nonNull ? `.` : "?.")
      : printList([Sdk.RESPONSE_NAME, returnedField?.name?.value], ".");

    /** Identify whether the operation response data is non-nullable */
    const nonNullField = reduceNonNullType(
      parent?.model?.fields.all.find(f => f.name === returnedField?.name?.value)?.node.type ?? ""
    );
    const nonNullQuery = query?.type && reduceNonNullType(query?.type);
    const nonNull = Boolean(nonNullQuery || ((parent ? parent?.nonNull : true) && nonNullField));

    /** Store printable type names */
    const print: SdkOperationPrint = {
      /** The name of the operation */
      name: operationName,
      /** The name of the operation field */
      field: node.name?.value ?? "UNNAMED_FIELD",
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
      list: listType?.replace("[]", ""),
      /** The returned promise result from fetch  */
      promise: `${Sdk.FETCH_TYPE}<${listType ?? modelName}${nonNull ? "" : " | undefined"}>`,
      /** The typescript safe path through the response to the data */
      responsePath,
    };

    /** Argument definition for each required variable */
    const requiredVariables: ArgDefinition[] = getRequiredVariables(node).map(variable => ({
      name: variable.variable.name.value,
      type: printTypescriptType(context, variable.type, Sdk.NAMESPACE),
      optional: false,
      description: `required ${variable.variable.name.value} to pass to ${print.field}`,
    }));

    /** Single definition for any optional variables */
    const optionalVariables = getOptionalVariables(node);
    const omittedVariableNames = new Set([
      ...(parent?.requiredArgs.args.map(variable => `'${variable.name}'`) ?? []),
      ...requiredVariables.map(variable => `'${variable.name}'`),
    ]);
    const optionalArg = requiredVariables.length
      ? {
          name: Sdk.VARIABLE_NAME,
          optional: true,
          type: `Omit<${print.variables}, ${printList([...omittedVariableNames], " | ")}>`,
          description: `variables without ${printList([...omittedVariableNames])} to pass into the ${print.response}`,
        }
      : {
          name: Sdk.VARIABLE_NAME,
          optional: true,
          type: print.variables,
          description: `variables to pass into the ${print.response}`,
        };

    /** Spread required variables first */
    const args = [...requiredVariables, optionalVariables.length ? optionalArg : undefined].filter(nonNullable);

    /** Fetch args without parent required args */
    const parentArgs = parent?.requiredArgs.args ?? [];
    const parentArgNames = parentArgs.map(arg => arg.name);
    const fetchArgs = getArgList(args.filter(arg => !parentArgNames.includes(arg.name)));

    /** Create the operation */
    const sdkOperation: SdkOperation = {
      name: operationName,
      path,
      key: path.join("_"),
      sdkKey,
      sdkPath,
      node,
      query,
      model,
      fragment,
      args: getArgList(args),
      requiredArgs: getArgList(args.filter(arg => !arg.optional)),
      optionalArgs: getArgList(args.filter(arg => arg.optional)),
      parentArgs: getArgList(parentArgs),
      fetchArgs,
      parent,
      print,
      nonNull,
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
