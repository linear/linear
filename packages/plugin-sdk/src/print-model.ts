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
} from "@linear/common";
import c from "./constants";
import { isConnectionModel, printConnectionModel } from "./print-connection";
import { getRequestArg } from "./print-request";
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
  const operations = context.sdkDefinitions[lowerFirst(model.name)]?.operations ?? [];
  const operationFieldNames = operations.map(operation => getLast(operation.path));

  /** Handle connection models separately */
  if (isConnectionModel(model)) {
    return printConnectionModel(context, model);
  }

  const args = getArgList([
    getRequestArg(),
    {
      name: c.DATA_NAME,
      optional: false,
      type: model.fragment,
      description: `${model.fragment} response data`,
    },
  ]);

  return printLines([
    printDebug(model),
    printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
    `class ${model.name} extends ${c.REQUEST_CLASS} {
      ${printLines([
        printDebug("fields.query"),
        printLines(
          model.fields.query.map(field =>
            field.args.some(arg => !arg.optional)
              ? `private _${field.name}?: ${model.fragment}['${field.name}']`
              : undefined
          )
        ),
      ])}

      public constructor(${args.printInput}) {
        ${printLines([
          `super(${c.REQUEST_NAME})`,
          printDebug("fields.scalar"),
          printLines(
            model.fields.scalar.map(field =>
              printSet(`this.${field.name}`, `${c.DATA_NAME}.${field.name} ?? undefined`)
            )
          ),
          printDebug("fields.scalarList"),
          printLines(
            model.fields.scalarList.map(field =>
              printSet(`this.${field.name}`, `${c.DATA_NAME}.${field.name} ?? undefined`)
            )
          ),
          printDebug("fields.object"),
          printLines(
            model.fields.object.map(field =>
              /** Ignore objects returned by an operation */
              operationFieldNames.includes(field.name)
                ? undefined
                : printTernary(
                    printSet(`this.${field.name}`, `${c.DATA_NAME}.${field.name}`),
                    `new ${field.object.name.value}(${c.REQUEST_NAME}, ${c.DATA_NAME}.${field.name}) `
                  )
            )
          ),
          printDebug("fields.list"),
          printLines(
            model.fields.list.map(field =>
              printTernary(
                printSet(`this.${field.name}`, `${c.DATA_NAME}.${field.name}`),
                `${c.DATA_NAME}.${field.name}.map(node => new ${field.listType}(${c.REQUEST_NAME}, node))`
              )
            )
          ),
          printDebug("fields.query"),
          printLines(
            model.fields.query.map(field =>
              field.args.some(arg => !arg.optional)
                ? printSet(`this._${field.name}`, `${c.DATA_NAME}.${field.name} ?? undefined`)
                : undefined
            )
          ),
        ])}
      }

      ${printLines([
        printDebug("fields.scalar"),
        printLines(model.fields.scalar.map(field => printModelField(field, `public ${field.name}?: ${field.type}`))),
        printDebug("fields.scalarList"),
        printLines(
          model.fields.scalarList.map(field => printModelField(field, `public ${field.name}?: ${field.type}`))
        ),
        printDebug("fields.list"),
        printLines(
          model.fields.list.map(field => printModelField(field, `public ${field.name}?: ${field.listType}[]`))
        ),
        printDebug("fields.object"),
        printLines(
          model.fields.object.map((field /** Ignore objects returned by an operation */) =>
            operationFieldNames.includes(field.name)
              ? undefined
              : printModelField(field, `public ${field.name}?: ${field.object.name.value}`)
          )
        ),
      ])}
      ${printLines([
        printDebug("fields.query"),
        printLines(
          model.fields.query.map(field => {
            const typeName = printTypescriptType(context, field.node.type);
            const fieldQueryName = `${printPascal(field.query.name.value)}Query`;
            const fieldQueryArgs = field.args?.map(arg => `this._${field.name}?.${arg.name}`);

            if (fieldQueryArgs.length) {
              return printModelField(
                field,
                `public get ${field.name}(): ${c.FETCH_TYPE}<${typeName}> | undefined {
                  return ${printTernary(
                    printList(fieldQueryArgs, " && "),
                    `new ${fieldQueryName}(this._${c.REQUEST_NAME}).${c.FETCH_NAME}(${printList(fieldQueryArgs)})`
                  )}
                }`
              );
            } else {
              return printModelField(
                field,
                `public get ${field.name}(): ${c.FETCH_TYPE}<${typeName}> {
                  return new ${fieldQueryName}(this._${c.REQUEST_NAME}).${c.FETCH_NAME}(${printList(fieldQueryArgs)})
                }`
              );
            }
          })
        ),
      ])}
      ${printLines([
        printDebug("operations"),
        printLines(
          operations.map(operation => {
            const fieldName = getLast(operation.path);
            const field = model.fields.all.find(_field => _field.name === fieldName);

            const operationArgs = printList([
              `this._${c.REQUEST_NAME}`,
              ...operation.requiredArgs.args.map(variable => `this.${variable.name}`),
              ,
            ]);
            const variableCheck = printList(
              operation.requiredArgs.args.map(variable => `this.${variable.name}`),
              " && "
            );
            const operationCall = `new ${operation.print.name}${operation.print.type}(${operationArgs}).${
              c.FETCH_NAME
            }(${operation.optionalArgs.printOutput ?? ""})`;

            return printLines([
              printComment([field?.node.description?.value]),
              printDebug(operation),
              `public ${operation.optionalArgs.args.length ? "" : "get"} ${fieldName}(${
                operation.optionalArgs?.printInput ?? ""
              }) {
                return ${printTernary(variableCheck, operationCall)}
              }`,
            ]);
          })
        ),
      ])}
    }`,
  ]);
}
