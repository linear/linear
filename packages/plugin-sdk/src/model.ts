import { filterJoin, getTypeName, printComment, printDebug } from "@linear/plugin-common";
import { Kind } from "graphql";
import c from "./constants";
import { printNamespaced, printPascal } from "./print";
import { SdkModel, SdkPluginContext } from "./types";

/**
 * Print all models
 */
export function printSdkModels(context: SdkPluginContext): string {
  return filterJoin(
    context.models?.map(model => printSdkModel(context, model)),
    "\n\n"
  );
}

/**
 * Print the exported return type for an sdk operation
 */
function printSdkModel(context: SdkPluginContext, model: SdkModel): string {
  if (model.scalarFields.length || model.queryFields.length) {
    const hasRequester = Boolean(model.queryFields.length);
    const dataType = `${printNamespaced(context, model.name)}Fragment`;

    return `
      ${printDebug(model)}
      export class ${model.name} {
        ${hasRequester ? `private _${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}` : ""}
        ${filterJoin(
          model.queryFields?.map(field =>
            field.args.some(arg => !arg.optional) ? `private _${field.name}?: ${dataType}['${field.name}']` : undefined
          ),
          "\n"
        )}

        public constructor(${c.REQUESTER_NAME}: ${c.REQUESTER_TYPE}, data: ${dataType}) {
          ${hasRequester ? `this._${c.REQUESTER_NAME} = ${c.REQUESTER_NAME}` : ""}
          ${filterJoin(
            model.scalarFields?.map(field => `this.${field.name} = data.${field.name} ?? undefined`),
            "\n"
          )}
          ${filterJoin(
            model.queryFields?.map(field =>
              field.args.some(arg => !arg.optional)
                ? `this._${field.name} = data.${field.name} ?? undefined`
                : undefined
            ),
            "\n"
          )}
        }

        ${filterJoin(
          model.scalarFields?.map(field =>
            filterJoin(
              [
                field.node.description?.value ? printComment([field.node.description.value]) : "",
                `public ${field.name}?: ${field.type}`,
              ],
              "\n"
            )
          ),
          "\n\n"
        )}

        ${filterJoin(
          model.queryFields?.map(field => {
            const typeName = getTypeName(field.node.type);
            const fieldQueryName = `${printPascal(field.query.name.value)}Query`;
            const fieldDescription = field.node.description ? printComment([field.node.description?.value]) : "";
            const fieldQueryArgs = field.args?.map(arg => `this._${field.name}?.${arg.name}`);

            if (
              field.node.type.kind === Kind.LIST_TYPE ||
              (field.node.type.kind === Kind.NON_NULL_TYPE && field.node.type.type.kind === Kind.LIST_TYPE)
            ) {
              return filterJoin(
                [
                  fieldDescription,
                  printDebug(field),
                  printDebug(field.type),
                  `public get ${field.name}(): ${typeName}[] | undefined {
                    return this._${field.name}?.map(node => new ${typeName}(
                      this._${c.REQUESTER_NAME}, 
                      node,
                    ))
                  }`,
                ],
                "\n"
              );
            } else {
              if (fieldQueryArgs.length) {
                return filterJoin(
                  [
                    fieldDescription,
                    printDebug(field),
                    printDebug(field.type),
                    `public get ${field.name}(): Promise<${typeName} | undefined> | undefined {
                      return ${filterJoin(fieldQueryArgs, " && ")} ? new ${fieldQueryName}(this._${
                      c.REQUESTER_NAME
                    }).fetch(${filterJoin(fieldQueryArgs, ", ")}) : undefined
                    }`,
                  ],
                  "\n"
                );
              } else {
                return filterJoin(
                  [
                    fieldDescription,
                    printDebug(field),
                    printDebug(field.type),
                    `public get ${field.name}(): Promise<${typeName} | undefined> {
                      return new ${fieldQueryName}(this._${c.REQUESTER_NAME}).fetch(${filterJoin(fieldQueryArgs, ", ")})
                    }`,
                  ],
                  "\n"
                );
              }
            }
          }),
          "\n\n"
        )}
      }
    `;
  } else {
    return "";
  }
}
