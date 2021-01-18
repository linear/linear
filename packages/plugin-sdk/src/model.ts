import {
  getArgList,
  getLast,
  lowerFirst,
  printComment,
  printDebug,
  printList,
  printPascal,
  printTernary,
  printTypescriptType,
} from "@linear/plugin-common";
import c from "./constants";
import { getRequestArg } from "./request";
import { SdkModel, SdkModelField, SdkPluginContext } from "./types";

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
  const operations = context.sdkDefinitions[lowerFirst(model.name)]?.operations ?? [];
  const operationFieldNames = operations.map(o => getLast(o.path));

  const args = getArgList([
    getRequestArg(),
    {
      name: "data",
      optional: false,
      type: model.fragment,
      description: `${model.name}Fragment response data`,
    },
  ]);

  return printList(
    [
      printDebug(model),
      printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
      `class ${model.name} extends ${c.REQUEST_CLASS} {
        ${printList(
          [
            printDebug("fields.query"),
            printList(
              model.fields.query.map(field =>
                field.args.some(arg => !arg.optional)
                  ? `private _${field.name}?: ${model.fragment}['${field.name}']`
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
                model.fields.object.map(field =>
                  /** Ignore objects returned by an operation */
                  operationFieldNames.includes(field.name)
                    ? undefined
                    : printTernary(
                        `this.${field.name} = data.${field.name}`,
                        `new ${field.object.name.value}(${c.REQUEST_NAME}, data.${field.name}) `
                      )
                ),
                "\n"
              ),
              printDebug("fields.list"),
              printList(
                model.fields.list.map(field =>
                  printTernary(
                    `this.${field.name} = data.${field.name}`,
                    `data.${field.name}.map(node => new ${field.listType}(${c.REQUEST_NAME}, node))`
                  )
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
              model.fields.object.map((field /** Ignore objects returned by an operation */) =>
                operationFieldNames.includes(field.name)
                  ? undefined
                  : printModelField(field, `public ${field.name}?: ${field.object.name.value}`)
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
                        return ${printTernary(
                          printList(fieldQueryArgs, " && "),
                          `new ${fieldQueryName}(this.${c.REQUEST_NAME}).fetch(${printList(fieldQueryArgs, ", ")})`
                        )}
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
                const field = model.fields.all.find(f => f.name === fieldName);

                const operationArgs = printList(
                  [`this.${c.REQUEST_NAME}`, ...o.requiredArgs.args.map(v => `this.${v.name}`), ,],
                  ", "
                );
                const variableCheck = printList(
                  o.requiredArgs.args.map(v => `this.${v.name}`),
                  " && "
                );
                const operationCall = `new ${o.print.name}${o.print.type}(${operationArgs}).fetch(${
                  o.optionalArgs.printOutput ?? ""
                })`;

                return printList(
                  [
                    printComment([field?.node.description?.value]),
                    printDebug(o),
                    `public ${o.optionalArgs.args.length ? "" : "get"} ${fieldName}(${
                      o.optionalArgs?.printInput ?? ""
                    }) {
                        return ${printTernary(variableCheck, operationCall)}
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
