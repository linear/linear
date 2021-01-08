import { Types } from "@graphql-codegen/plugin-helpers";
import { indentMultiline } from "@graphql-codegen/visitor-plugin-common";
import {
  ArgumentTypescriptVisitor,
  filterJoin,
  getArgList,
  nonNullable,
  PluginContext,
  printComment,
  printDebug,
} from "@linear/plugin-common";
import { DocumentNode, Kind, OperationDefinitionNode, visit } from "graphql";
import { pascalCase } from "pascal-case";
import c from "./constants";
import { getParentOperation, printOperation } from "./operation";
import { printOperationReturnType, printSdkFunctionName, printSdkFunctionType } from "./print";
import { getRequesterArg } from "./requester";
import { SdkDefinition, SdkDefinitions, SdkOperation, SdkPluginContext } from "./types";
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
export function getSdkDefinitions<C>(context: PluginContext<C>, documents: Types.DocumentFile[]): SdkDefinitions {
  return getSdkOperations(documents).reduce<SdkDefinitions>((acc, node) => {
    const operationPath = (node.name?.value ?? "").split("_");
    const sdkPath = operationPath.slice(0, operationPath.length - 1);
    const sdkKey = sdkPath.join("_");

    const name =
      node.name?.value
        .split("_")
        .map(s => pascalCase(s))
        .join("_") ?? "UNNAMED_OPERATION";

    const operationType = pascalCase(node.operation);

    /** Create a visitor to print the arg type */
    const argVisitor = new ArgumentTypescriptVisitor(context, c.NAMESPACE_DOCUMENT);

    const sdkOperation: SdkOperation = {
      name,
      path: operationPath,
      node,
      /** The parsed and printed required variables */
      requiredVariables: getRequiredVariables(node).reduce(
        (acc2, v) => ({
          ...acc2,
          [v.variable.name.value]: {
            name: v.variable.name.value,
            type: visit(v, argVisitor),
            optional: false,
          },
        }),
        {}
      ),
      /** The name of the generated graphql document */
      documentVariableName: `${name}Document`,
      /** The type of the graphql operation */
      operationType,
      /** The type of the result from the graphql operation */
      operationResultType: `${name}${operationType}`,
      /** The type of the variables for the graphql operation */
      operationVariablesTypes: `${name}${operationType}Variables`,
      /** The type returned from this operation */
      returnType: printOperationReturnType(operationType, operationPath),
    };

    const existingDefinition = acc[sdkKey];
    const sdkDefinition: SdkDefinition = {
      sdkPath,
      sdkName: printSdkFunctionName(sdkPath),
      sdkType: printSdkFunctionType(sdkPath),
      operations: [...(existingDefinition?.operations ?? []), sdkOperation],
    };

    return { ...acc, [sdkKey]: sdkDefinition };
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
    getRequesterArg(),
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
  const content = filterJoin(
    definition.operations.map(o => printOperation(context, definition, o)).map(s => indentMultiline(s, 2)),
    ",\n"
  );

  return filterJoin(
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
