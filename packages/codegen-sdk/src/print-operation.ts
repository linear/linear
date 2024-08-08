import {
  getArgList,
  printComment,
  printDebug,
  printLines,
  printList,
  printSet,
  printTernary,
} from "@linear/codegen-doc";
import { ObjectTypeDefinitionNode } from "graphql";
import { Sdk } from "./constants";
import { printNamespaced } from "./print";
import { isConnectionModel } from "./print-connection";
import { getRequestArg } from "./print-request";
import { SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a return type for all operations
 */
export function printOperations(context: SdkPluginContext): string {
  const returnTypes = Object.values(context.sdkDefinitions).reduce<string[]>((acc, definition) => {
    return [
      ...acc,
      ...definition.operations
        .filter(operation => operation.print.model !== Sdk.UNKNOWN_MODEL)
        .map(operation => printOperation(context, operation)),
    ];
  }, []);

  return printLines(returnTypes);
}

/**
 * Print the exported return type for an sdk operation
 */
function printOperation(context: SdkPluginContext, operation: SdkOperation): string {
  const optionalArgs = operation.sdkPath.length > 0 ? operation.optionalArgs.args : [];
  const constructorArgs = getArgList([getRequestArg(), ...(operation.parentArgs.args ?? []), ...optionalArgs]);

  return printLines([
    printComment([`A fetchable ${operation.name} ${operation.print.type}`, ...constructorArgs.jsdoc]),
    printDebug(operation),
    `export class ${operation.print.response} extends ${Sdk.REQUEST_CLASS} {
        ${printLines(operation.parentArgs.args.map(arg => `private _${arg.name}: ${arg.type}`))}
        ${printLines(optionalArgs.map(arg => `private _${arg.name}?: ${arg.type}`))}

        public constructor(${constructorArgs.printInput}) {
          super(${Sdk.REQUEST_NAME})
          ${printLines(operation.parentArgs.args.map(arg => printSet(`this._${arg.name}`, `${arg.name}`)))}
          ${printLines(optionalArgs.map(arg => printSet(`this._${arg.name}`, `${arg.name}`)))}
        }

        ${printComment([
          `Call the ${operation.print.name} ${operation.print.type.toLowerCase()} and return a ${
            operation.print.model
          }${operation.print.list ? " list" : ""}`,
          ...operation.fetchArgs.jsdoc,
          `@returns parsed response from ${operation.print.response}`,
        ])}
        ${printOperationCall(context, operation)}
      }
    `,
  ]);
}

/**
 * Print the fetch function for calling the api
 */
function printOperationCall(context: SdkPluginContext, operation: SdkOperation): string {
  const optionalArgs = operation.sdkPath.length > 0 ? operation.optionalArgs.args : [];
  const parentArgNames = operation.parentArgs.args.map(arg => arg.name);
  const responseType = printNamespaced(context, operation.print.response);

  const returnsInterface = context.interfaces?.some(i => i.name.value === operation.print.model);

  const implementations: string[] = returnsInterface
    ? (context.interfaceImplementations[operation.print.model]?.map(
        (imp: ObjectTypeDefinitionNode) => imp.name.value
      ) ?? [])
    : [];

  const operationCall = operation.print.list
    ? `return ${Sdk.DATA_NAME}.map(node => {
          ${
            returnsInterface
              ? printObjectInstantiationSwitch(implementations, operation, "node")
              : printObjectInstantiation(operation, "node")
          }
        })`
    : isConnectionModel(operation.model)
      ? `return new ${operation.print.model}(${printList([
          `this._${Sdk.REQUEST_NAME}`,
          `${Sdk.CONNECTION_NAME} => this.${Sdk.FETCH_NAME}(${printList([
            ...operation.requiredArgs.args.filter(arg => !parentArgNames.includes(arg.name)).map(arg => arg.name),
            `${Sdk.CONNECTION_DEFAULT}({
            ${printList([
              ...optionalArgs.map(arg => `...this._${arg.name}`),
              `...${Sdk.VARIABLE_NAME}`,
              `...${Sdk.CONNECTION_NAME}`,
            ])}
          })`,
          ])})`,
          Sdk.DATA_NAME,
        ])})`
      : returnsInterface
        ? printObjectInstantiationSwitch(implementations, operation)
        : printObjectInstantiation(operation);

  const isNullableConnectionOperation = isConnectionModel(operation.model) && !operation.nonNull;

  return printLines([
    `public async ${Sdk.FETCH_NAME}(${operation.fetchArgs.printInput}): ${operation.print.promise} {
      const ${Sdk.RESPONSE_NAME} = await this._${Sdk.REQUEST_NAME}<${responseType}, ${
        operation.print.variables
      }>(${printList([operation.print.document, printOperationArgs(operation)])})
        ${printSet(`const ${Sdk.DATA_NAME}`, `${operation.print.responsePath}`)}
        ${isNullableConnectionOperation ? `if(${Sdk.DATA_NAME}){` : ""}
        ${operationCall}
        ${isNullableConnectionOperation ? `} else { return ${Sdk.UNDEFINED};}` : ""}
      }
    `,
  ]);
}

/**
 * Print a (possibly ternary) instantiation of an object.
 */
function printObjectInstantiation(op: SdkOperation, nodeName: string = Sdk.DATA_NAME) {
  const name = op.print.list ?? op.print.model;
  const nonNull = op.nonNull;
  const instantiation = `new ${name}(${printList([`this._${Sdk.REQUEST_NAME}`, nodeName])})`;
  return `return ${nonNull ? instantiation : printTernary(nodeName, instantiation)}`;
}

/**
 * Print a switch based on the __typename. Used to instantiate interface type objects.
 */
function printObjectInstantiationSwitch(impl: string[], op: SdkOperation, nodeName: string = Sdk.DATA_NAME) {
  const name = op.print.list ?? op.print.model;
  const nonNull = op.nonNull;

  return `
  ${
    nonNull
      ? ""
      : `
    if (!${nodeName}) {
      return undefined
    }`
  }

  switch (${nodeName}.__typename) {
    ${impl
      .map(
        objectType => `case "${objectType}":
        return new ${objectType}(this._${Sdk.REQUEST_NAME}, ${nodeName} as L.${objectType}Fragment)
      `
      )
      .join("")}

    default:
      return new ${name}(this._${Sdk.REQUEST_NAME}, ${nodeName})
  }`;
}

/**
 * Get the request args from the operation variables
 */
export function printOperationArgs(operation: SdkOperation): string {
  const parentVariableNames = operation.parentArgs.args.map(arg => arg.name) ?? [];

  if (parentVariableNames.length || operation.requiredArgs.args.length) {
    return `{
      ${printList([
        /** Merge required variables from parent scope */
        ...parentVariableNames.map(variable => `${variable}: this._${variable}`),
        /** Merge remaining required variables */
        ...operation.requiredArgs.args.map(variable =>
          parentVariableNames.includes(variable.name) ? undefined : variable.name
        ),
        /** Spread parent optional variables */
        ...(operation.sdkPath.length > 0 ? operation.optionalArgs.args.map(arg => `...this._${arg.name}`) : []),
        /** Spread optional variables */
        ...operation.optionalArgs.args.map(arg => `...${arg.name}`),
      ])}
    }`;
  }

  return operation.optionalArgs.args.length ? Sdk.VARIABLE_NAME : "{}";
}
