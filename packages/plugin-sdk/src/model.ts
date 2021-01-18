import {
  getArgList,
  getLast,
  printComment,
  printDebug,
  printList,
  printPascal,
  printTypescriptType,
} from "@linear/plugin-common";
import c from "./constants";
import { printNamespaced } from "./print";
import { getRequestArg } from "./request";
import { SdkModel, SdkModelField, SdkPluginContext } from "./types";
import { getOptionalVariables } from "./variable";

/**
 * Print all models
 */
export function printModels(context: SdkPluginContext): string {
  return printList(
    context.models?.map(model => printModel(context, model)),
    "\n\n"
  );
}

/**
 * Wrap any field in the field description comment
 */
function printModelField(field: SdkModelField, content: string): string {
  const fieldDescription = field.node.description ? printComment([field.node.description?.value]) : "";
  return printList([fieldDescription, printDebug(field), content], "\n");
}

/**
 * Print the exported return type for an sdk operation
 */
function printModel(context: SdkPluginContext, model: SdkModel): string {
  const dataType = `${printNamespaced(context, model.name)}Fragment`;
  const operations = context.sdkDefinitions[model.name.toLowerCase()]?.operations ?? [];
  const args = getArgList([
    getRequestArg(),
    {
      name: "data",
      optional: false,
      type: dataType,
      description: `the initial ${model.name}Fragment response data`,
    },
  ]);

  return printList(
    [
      printDebug(model),
      printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
      `export class ${model.name} extends ${c.REQUEST_CLASS} {
        ${printList(
          [
            printDebug("fields.query"),
            printList(
              model.fields.query.map(field =>
                field.args.some(arg => !arg.optional)
                  ? `private _${field.name}?: ${dataType}['${field.name}']`
                  : undefined
              ),
              "\n"
            ),
          ],
          "\n"
        )}

        public constructor(${args.printInput}) {
          super(${c.REQUEST_NAME})
          ${printList(
            [
              printDebug("fields.scalar"),
              printList(
                model.fields.scalar.map(field => `this.${field.name} = data.${field.name} ?? undefined`),
                "\n"
              ),
              printDebug("fields.scalarList"),
              printList(
                model.fields.scalarList.map(field => `this.${field.name} = data.${field.name} ?? undefined`),
                "\n"
              ),
              printDebug("fields.object"),
              printList(
                model.fields.object.map(
                  field =>
                    `this.${field.name} = data.${field.name} 
                      ? new ${field.object.name.value}(${c.REQUEST_NAME}, data.${field.name}) 
                      : undefined`
                ),
                "\n"
              ),
              printDebug("fields.list"),
              printList(
                model.fields.list.map(
                  field =>
                    `this.${field.name} = data.${field.name}
                      ? data.${field.name}.map(node => new ${field.listType}(${c.REQUEST_NAME}, node))
                      : undefined`
                ),
                "\n"
              ),
              printDebug("fields.query"),
              printList(
                model.fields.query.map(field =>
                  field.args.some(arg => !arg.optional)
                    ? `this._${field.name} = data.${field.name} ?? undefined`
                    : undefined
                ),
                "\n"
              ),
            ],
            "\n"
          )}
        }

        ${printList(
          [
            printDebug("fields.scalar"),
            printList(
              model.fields.scalar.map(field => printModelField(field, `public ${field.name}?: ${field.type}`)),
              "\n"
            ),
            printDebug("fields.scalarList"),
            printList(
              model.fields.scalarList.map(field => printModelField(field, `public ${field.name}?: ${field.type}`)),
              "\n"
            ),
            printDebug("fields.list"),
            printList(
              model.fields.list.map(field => printModelField(field, `public ${field.name}?: ${field.listType}[]`)),
              "\n"
            ),
            printDebug("fields.object"),
            printList(
              model.fields.object.map(field =>
                printModelField(field, `public ${field.name}?: ${field.object.name.value}`)
              ),
              "\n"
            ),
          ],
          "\n"
        )}
        ${printList(
          [
            printDebug("fields.query"),
            printList(
              model.fields.query.map(field => {
                const typeName = printTypescriptType(context, field.node.type);
                const fieldQueryName = `${printPascal(field.query.name.value)}Query`;
                const fieldQueryArgs = field.args?.map(arg => `this._${field.name}?.${arg.name}`);

                if (fieldQueryArgs.length) {
                  return printModelField(
                    field,
                    `public get ${field.name}(): Promise<${typeName} | undefined> | undefined {
                        return ${printList(fieldQueryArgs, " && ")} ? new ${fieldQueryName}(this.${
                      c.REQUEST_NAME
                    }).fetch(${printList(fieldQueryArgs, ", ")}) : undefined
                      }`
                  );
                } else {
                  return printModelField(
                    field,
                    `public get ${field.name}(): Promise<${typeName} | undefined> {
                      return new ${fieldQueryName}(this.${c.REQUEST_NAME}).fetch(${printList(fieldQueryArgs, ", ")})
                    }`
                  );
                }
              }),
              "\n"
            ),
          ],
          "\n"
        )}
        ${printList(
          [
            printDebug("operations"),
            printList(
              operations.map(o => {
                const fieldName = getLast(o.path);
                const field = model.fields.connection.find(f => f.name === fieldName);
                const requiredVariableNames = Object.keys(o.requiredVariables).map(v => `'${v}'`);
                const optionalArgs = getOptionalVariables(o.node);
                const variableType = printNamespaced(context, o.operationVariablesTypes);
                const optionalArg = optionalArgs
                  ? getArgList([
                      {
                        name: c.VARIABLE_NAME,
                        optional: true,
                        type: requiredVariableNames.length
                          ? `Omit<${variableType}, ${printList(requiredVariableNames, " | ")}>`
                          : variableType,
                        description: `variables without ${printList(requiredVariableNames, ", ")} to pass into the ${
                          o.operationResultType
                        }`,
                      },
                    ])
                  : undefined;
                const operationArgs = printList(
                  [`this.${c.REQUEST_NAME}`, ...Object.keys(o.requiredVariables).map(v => `this.${v}`), ,],
                  ", "
                );
                const variableCheck = printList([...Object.keys(o.requiredVariables).map(v => `this.${v}`), ,], " && ");
                const operationCall = `new ${o.name}${o.operationType}(${operationArgs}).fetch(${optionalArg?.printOutput})`;

                return printList(
                  [
                    printComment([field?.node.description?.value]),
                    printDebug(o),
                    `public ${optionalArg ? "" : "get"} ${fieldName}(${optionalArg?.printInput}) {
                        return ${variableCheck ? `${variableCheck} ?` : ""} ${operationCall} ${
                      variableCheck ? `: undefined` : ""
                    }
                    }`,
                  ],
                  "\n"
                );
              }),
              "\n"
            ),
          ],
          "\n"
        )}
        
      }`,
    ],
    "\n"
  );
}
