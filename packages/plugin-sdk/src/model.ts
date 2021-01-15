import {
  getArgList,
  printComment,
  printDebug,
  printList,
  printTypescriptType,
  reduceListType,
} from "@linear/plugin-common";
import { Kind } from "graphql";
import c from "./constants";
import { printNamespaced, printPascal } from "./print";
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
  const dataType = `${printNamespaced(context, model.name)}Fragment`;
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
                const typeName = reduceListType(field.node.type) ?? printTypescriptType(context, field.node.type);
                const fieldQueryName = `${printPascal(field.query.name.value)}Query`;
                const fieldQueryArgs = field.args?.map(arg => `this._${field.name}?.${arg.name}`);

                if (
                  field.node.type.kind === Kind.LIST_TYPE ||
                  (field.node.type.kind === Kind.NON_NULL_TYPE && field.node.type.type.kind === Kind.LIST_TYPE)
                ) {
                  return printModelField(
                    field,
                    `public get ${field.name}(): ${typeName}[] | undefined {
                      return this._${field.name}?.map(node => new ${typeName}(
                        this.${c.REQUEST_NAME}, 
                        node,
                      ))
                    }`
                  );
                } else {
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
                }
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
