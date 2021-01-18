import { Types } from "@graphql-codegen/plugin-helpers";
import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import {
  ArgumentTypescriptVisitor,
  getArgList,
  nonNullable,
  PluginContext,
  printComment,
  printDebug,
  printList,
} from "@linear/plugin-common";
import { DocumentNode, FieldNode, FragmentSpreadNode, Kind, OperationDefinitionNode, visit } from "graphql";
import c from "./constants";
import { getParentOperation, printOperation } from "./operation";
import { printOperationReturnType, printPascal, printSdkFunctionName, printSdkFunctionType } from "./print";
import { getRequestArg } from "./request";
import { SdkDefinition, SdkDefinitions, SdkModel, SdkOperation, SdkPluginContext } from "./types";
import { getRequiredVariables } from "./variable";

/**
 * Get a list of all non null document notes
 */
export function getDocumentNodes(documents: Types.DocumentFile[]): DocumentNode[] {
  return documents.reduce<DocumentNode[]>((prev, v) => {
    return [...prev, v.document].filter(nonNullable);
  }, []);
}

/**
 * Get all operation definitions from an array of document files
 */
function getSdkOperations(documents: Types.DocumentFile[]): OperationDefinitionNode[] {
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
export function getSdkDefinitions<C>(
  context: PluginContext<C>,
  documents: Types.DocumentFile[],
  models: SdkModel[]
): SdkDefinitions {
  return getSdkOperations(documents).reduce<SdkDefinitions>((acc, node) => {
    const operationPath = (node.name?.value ?? "").split("_");
    const sdkPath = operationPath.slice(0, operationPath.length - 1);
    const sdkKey = sdkPath.join("_");
    const operationName = printPascal(node.name?.value);
    const operationType = printPascal(node.operation);

    /** Initialise arg visitors */
    const argVisitor = new ArgumentTypescriptVisitor(context);
    const argNamespacedVisitor = new ArgumentTypescriptVisitor(context, c.NAMESPACE_DOCUMENT);

    /** Find a matching query if it exists */
    const query = context.queries.find(q => q.name.value === node.name?.value);

    /** Identify returned fragment */
    const returnedField = operationPath.reduce<OperationDefinitionNode | FieldNode | undefined>((acc2, name) => {
      return acc2?.selectionSet?.selections.find(selection => {
        return selection.kind === Kind.FIELD && selection.name.value === name;
      }) as FieldNode | undefined;
    }, node);
    const fragmentNode = returnedField?.selectionSet?.selections.find(selection => {
      return selection.kind === Kind.FRAGMENT_SPREAD;
    }) as FragmentSpreadNode | undefined;
    const fragment = context.objects.find(object => object.name.value === fragmentNode?.name.value);

    /** Find a matching model */
    const model = query
      ? models.find(
          b =>
            /** Find model that matches query type */
            b.name === visit(query.type, argVisitor) ||
            /** Or the returned fragment type */
            b.name === fragment?.name.value
        )
      : undefined;

    /** Identify the required variables */
    const requiredVariables = getRequiredVariables(node).reduce(
      (acc2, v) => ({
        ...acc2,
        [v.variable.name.value]: {
          name: v.variable.name.value,
          type: visit(v, argNamespacedVisitor),
          optional: false,
          description: `required ${v.variable.name.value} variable to set the ${operationPath.join(" ")} scope`,
        },
      }),
      {}
    );

    /** Create the operation */
    const sdkOperation: SdkOperation = {
      name: operationName,
      path: operationPath,
      sdkPath,
      node,
      query,
      model,
      fragment,
      requiredVariables,
      /** The name of the generated graphql document */
      documentVariableName: `${operationName}Document`,
      /** The type of the graphql operation */
      operationType,
      /** The type of the result from the graphql operation */
      operationResultType: `${operationName}${operationType}`,
      /** The type of the variables for the graphql operation */
      operationVariablesTypes: `${operationName}${operationType}Variables`,
      /** The type returned from this operation */
      returnType: printOperationReturnType(operationType, operationPath),
    };

    /** Return merged operations */
    return {
      ...acc,
      [sdkKey]: {
        sdkPath,
        sdkName: printSdkFunctionName(sdkPath),
        sdkType: printSdkFunctionType(sdkPath),
        operations: [...(acc[sdkKey]?.operations ?? []), sdkOperation],
      },
    };
  }, {});
}

/**
 * Print the typescript definition for this sdk
 */
export function printSdkDefinition(context: SdkPluginContext, definition: SdkDefinition): string {
  /** Get the required variables for the parent operation */
  const parentOperation = getParentOperation(context, definition.sdkPath);

  const args = getArgList([
    /** The requester function arg */
    getRequestArg(),
    /** Args required by the parent operations */
    ...Object.values(parentOperation?.requiredVariables ?? {}).map(({ name, type }) => ({
      name,
      type,
      optional: false,
      description: `${name} to scope the returned operations by`,
    })),
  ]);

  const description = definition.sdkPath.length
    ? `Initialize a set of operations, scoped to ${definition.sdkPath}, to run against the Linear api`
    : "Initialize a set of operations to run against the Linear api";

  /** For each operation get the function string content */
  const content = printList(
    definition.operations.map(o => printOperation(context, definition, o)).map(s => indentMultiline(s, 2)),
    ",\n"
  );

  return printList(
    [
      "\n",
      printComment([
        description,
        ...args.jsdoc,
        definition.sdkPath.length
          ? `@returns The set of available operations scoped to a single ${definition.sdkPath}`
          : "@returns The set of available operations",
      ]),
      printDebug({
        sdkName: definition.sdkName,
        sdkType: definition.sdkType,
        sdkPath: definition.sdkPath,
        parentOperation,
      }),
      `export function ${definition.sdkName}(${args.printInput}) {
          return {
            ${content}
          };
        }`,
      "\n",
      printComment([`The returned type from calling ${definition.sdkName}`, description]),
      `export type ${definition.sdkType} = ReturnType<typeof ${definition.sdkName}>;`,
      "\n",
    ],
    "\n"
  );
}
