import {
  getArgList,
  getLast,
  lowerFirst,
  printComment,
  printDebug,
  printLines,
  printList,
  printPascal,
  printSet,
  printTernary,
  printTypescriptType,
  reduceNonNullType,
} from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { findMutations, getMutationTypeFromPrefixedName } from "./mutation";
import { isConnectionModel, printConnectionModel } from "./print-connection";
import { getRequestArg } from "./print-request";
import { printModelScalar } from "./print-scalar";
import { SdkModel, SdkModelField, SdkPluginContext } from "./types";

/**
 * Print all models
 */
export function printModels(context: SdkPluginContext): string {
  return printLines(context.models?.map(model => printModel(context, model)));
}

/**
 * Wrap any field in the field description comment
 */
function printModelField(field: SdkModelField, content: string): string {
  const fieldDescription = field.node.description ? printComment([field.node.description?.value]) : "";
  return printLines([fieldDescription, printDebug(field), content]);
}

/**
 * Print the exported return type for an sdk operation
 */
function printModel(context: SdkPluginContext, model: SdkModel): string {
  const mutations = findMutations(context, model);
  const operations = context.sdkDefinitions[lowerFirst(model.name)]?.operations ?? [];
  const modelObjectNames = model.fields.object.map(field => field.name);

  /** Handle connection models separately */
  if (isConnectionModel(model)) {
    return printConnectionModel(context, model);
  }

  const args = getArgList([
    getRequestArg(),
    {
      name: Sdk.DATA_NAME,
      optional: false,
      type: model.fragment,
      description: `${model.fragment} response data`,
    },
  ]);

  return printLines([
    printDebug(model),
    printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
    `export class ${model.name} extends ${Sdk.REQUEST_CLASS} {
      ${printLines([
        printDebug("fields.query"),
        printLines(
          model.fields.query.map(field =>
            field.args.some(arg => !arg.optional)
              ? `private _${field.name}${field.nonNull ? "" : "?"}: ${model.fragment}['${field.name}']`
              : undefined
          )
        ),
      ])}

      public constructor(${args.printInput}) {
        ${printLines([
          `super(${Sdk.REQUEST_NAME})`,
          printDebug("fields.scalar"),
          printLines(
            model.fields.scalar.map(field =>
              printSet(`this.${field.name}`, `${printModelScalar(field)}${field.nonNull ? "" : " ?? undefined"}`)
            )
          ),
          printDebug("fields.scalarList"),
          printLines(
            model.fields.scalarList.map(field =>
              printSet(`this.${field.name}`, `${printModelScalar(field)}${field.nonNull ? "" : " ?? undefined"}`)
            )
          ),
          printDebug("fields.object"),
          printLines(
            model.fields.object.map(field => {
              const operationCall = `new ${field.object.name.value}(${Sdk.REQUEST_NAME}, ${Sdk.DATA_NAME}.${field.name})`;
              return field.nonNull
                ? printSet(`this.${field.name}`, operationCall)
                : printTernary(printSet(`this.${field.name}`, `${Sdk.DATA_NAME}.${field.name}`), operationCall);
            })
          ),
          printDebug("fields.list"),
          printLines(
            model.fields.list.map(field => {
              const operationCall = `${Sdk.DATA_NAME}.${field.name}.map(node => new ${field.listType}(${Sdk.REQUEST_NAME}, node))`;
              return field.nonNull
                ? printSet(`this.${field.name}`, operationCall)
                : printTernary(printSet(`this.${field.name}`, `${Sdk.DATA_NAME}.${field.name}`), operationCall);
            })
          ),
          printDebug("fields.query"),
          printLines(
            model.fields.query.map(field =>
              field.args.some(arg => !arg.optional)
                ? printSet(
                    `this._${field.name}`,
                    `${Sdk.DATA_NAME}.${field.name}${field.nonNull ? "" : " ?? undefined"}`
                  )
                : undefined
            )
          ),
        ])}
      }

      ${printLines([
        printDebug("fields.scalar"),
        printLines(
          model.fields.scalar.map(field =>
            printModelField(field, `public ${field.name}${field.nonNull ? "" : "?"}: ${field.type}`)
          )
        ),
        printDebug("fields.scalarList"),
        printLines(
          model.fields.scalarList.map(field =>
            printModelField(field, `public ${field.name}${field.nonNull ? "" : "?"}: ${field.type}`)
          )
        ),
        printDebug("fields.list"),
        printLines(
          model.fields.list.map(field =>
            printModelField(field, `public ${field.name}${field.nonNull ? "" : "?"}: ${field.listType}[]`)
          )
        ),
        printDebug("fields.object"),
        printLines(
          model.fields.object.map((field /** Ignore objects returned by an operation */) =>
            printModelField(field, `public ${field.name}${field.nonNull ? "" : "?"}: ${field.object.name.value}`)
          )
        ),
      ])}
      ${printLines([
        printDebug("fields.query"),
        printLines(
          model.fields.query.map(field => {
            const typeName = printTypescriptType(context, field.node.type);
            const fieldQueryName = `${printPascal(field.query.name.value)}Query`;
            const fieldQueryArgs = field.args?.map(arg => `this._${field.name}${field.nonNull ? "" : "?"}.${arg.name}`);

            if (fieldQueryArgs.length) {
              const operationCall = `new ${fieldQueryName}(this._${Sdk.REQUEST_NAME}).${Sdk.FETCH_NAME}(${printList(
                fieldQueryArgs
              )})`;
              return printModelField(
                field,
                `public get ${field.name}(): ${Sdk.FETCH_TYPE}<${typeName}${
                  reduceNonNullType(field.query.type) ? "" : " | undefined"
                }> | undefined {
                  return ${
                    field.nonNull ? operationCall : printTernary(printList(fieldQueryArgs, " && "), operationCall)
                  }
                }`
              );
            } else {
              return printModelField(
                field,
                `public get ${field.name}(): ${Sdk.FETCH_TYPE}<${typeName}${
                  reduceNonNullType(field.query.type) ? "" : " | undefined"
                }> {
                  return new ${fieldQueryName}(this._${Sdk.REQUEST_NAME}).${Sdk.FETCH_NAME}()
                }`
              );
            }
          })
        ),
      ])}
      ${printLines([
        printDebug("operations"),
        printLines(
          operations
            .filter(operation => !modelObjectNames.includes(getLast(operation.path) ?? ""))
            .map(operation => {
              const fieldName = getLast(operation.path);
              const field = model.fields.all.find(_field => _field.name === fieldName);

              const operationArgs = printList([
                `this._${Sdk.REQUEST_NAME}`,
                ...operation.requiredArgs.args.map(variable => `this.${variable.name}`),
                operation.optionalArgs.printOutput,
              ]);
              const variableCheck = printList(
                operation.requiredArgs.args.map(variable => `this.${variable.name}`),
                " && "
              );
              const operationCall = `new ${operation.print.name}${operation.print.type}(${operationArgs}).${
                Sdk.FETCH_NAME
              }(${operation.optionalArgs.printOutput ?? ""})`;

              return printLines([
                printComment([field?.node.description?.value]),
                printDebug(operation),
                `public ${operation.optionalArgs.args.length ? "" : "get"} ${fieldName}(${
                  operation.optionalArgs?.printInput ?? ""
                }) {
                return ${field?.nonNull ? operationCall : printTernary(variableCheck, operationCall)}
              }`,
              ]);
            })
        ),
      ])}
      ${printLines([
        printDebug("mutations"),
        printLines(
          mutations.map(({ field, operation }) => {
            const modelFieldNames = [
              ...model.fields.scalar,
              ...model.fields.scalarList,
              ...model.fields.object,
              ...model.fields.list,
            ].map(f => f.name);

            const modelArgs = getArgList(
              operation.requiredArgs.args.filter(variable => modelFieldNames.includes(variable.name))
            );
            const mutationArgs = getArgList(
              operation.args.args.filter(variable => !modelFieldNames.includes(variable.name))
            );

            const variableCheck = printList(
              modelArgs.args.map(variable => `this.${variable.name}`),
              " && "
            );

            const operationArgs = printList([
              ...operation.requiredArgs.args.map(variable =>
                modelFieldNames.includes(variable.name) ? `this.${variable.name}` : variable.name
              ),
              operation.optionalArgs.printOutput,
            ]);

            const operationCall = `new ${operation.print.name}${operation.print.type}(this._${Sdk.REQUEST_NAME}).${Sdk.FETCH_NAME}(${operationArgs})`;

            return printLines([
              printComment([field.description?.value]),
              printDebug(operation),
              `public ${getMutationTypeFromPrefixedName(model, operation.name)}(${
                printList([mutationArgs.printInput]) ?? ""
              }) {
                return ${reduceNonNullType(field.type) ? operationCall : printTernary(variableCheck, operationCall)}
              }`,
            ]);
          })
        ),
      ])}
    }`,
  ]);
}
