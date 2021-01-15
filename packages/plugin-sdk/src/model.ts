import { getArgList, printComment, printDebug, printList, reduceTypeName } from "@linear/plugin-common";
import { Kind } from "graphql";
import c from "./constants";
import { printNamespaced, printPascal } from "./print";
import { getRequesterArg } from "./requester";
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
  const hasRequester = Boolean(model.queryFields.length);
  const dataType = `${printNamespaced(context, model.name)}Fragment`;
  const args = getArgList([
    getRequesterArg(),
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
      `export class ${model.name} {
        ${printList(
          [
            hasRequester ? `private _${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}` : "",
            printDebug("queryFields"),
            printList(
              model.queryFields?.map(field =>
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
          ${printList(
            [
              hasRequester ? `this._${c.REQUESTER_NAME} = ${c.REQUESTER_NAME}` : "",
              printDebug("scalarFields"),
              printList(
                model.scalarFields?.map(field => `this.${field.name} = data.${field.name} ?? undefined`),
                "\n"
              ),
              printDebug("objectFields"),
              printList(
                model.objectFields?.map(
                  field =>
                    `this.${field.name} = data.${field.name} ? new ${field.object.name.value}(${c.REQUESTER_NAME}, data.${field.name}) : undefined`
                ),
                "\n"
              ),
              printDebug("listFields"),
              printList(
                model.listFields?.map(
                  field =>
                    `this.${field.name} = data.${field.name} ? data.${field.name}.map(node => new ${field.listType}(${c.REQUESTER_NAME}, node))  : undefined`
                ),
                "\n"
              ),
              printDebug("queryFields"),
              printList(
                model.queryFields?.map(field =>
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
            printDebug("scalarFields"),
            printList(
              model.scalarFields?.map(field => printModelField(field, `public ${field.name}?: ${field.type}`)),
              "\n"
            ),
            printDebug("listFields"),
            printList(
              model.listFields?.map(field => printModelField(field, `public ${field.name}?: ${field.listType}[]`)),
              "\n"
            ),
            printDebug("objectFields"),
            printList(
              model.objectFields?.map(field =>
                printModelField(field, `public ${field.name}?: ${field.object.name.value}`)
              ),
              "\n"
            ),
          ],
          "\n"
        )}
        ${printList(
          [
            printDebug("queryFields"),
            printList(
              model.queryFields?.map(field => {
                const typeName = reduceTypeName(field.node.type);
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
                        this._${c.REQUESTER_NAME}, 
                        node,
                      ))
                    }`
                  );
                } else {
                  if (fieldQueryArgs.length) {
                    return printModelField(
                      field,
                      `public get ${field.name}(): Promise<${typeName} | undefined> | undefined {
                      return ${printList(fieldQueryArgs, " && ")} ? new ${fieldQueryName}(this._${
                        c.REQUESTER_NAME
                      }).fetch(${printList(fieldQueryArgs, ", ")}) : undefined
                    }`
                    );
                  } else {
                    return printModelField(
                      field,
                      `public get ${field.name}(): Promise<${typeName} | undefined> {
                      return new ${fieldQueryName}(this._${c.REQUESTER_NAME}).fetch(${printList(fieldQueryArgs, ", ")})
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
