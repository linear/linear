import {
  getArgList,
  isConnection,
  printComment,
  printDebug,
  printLines,
  printList,
  printSet,
  printTernary,
} from "@linear/codegen-doc";
import { Sdk } from "./constants";
import { getRequestArg } from "./print-request";
import { SdkModel, SdkPluginContext } from "./types";

/**
 * Determine whether this is a connection model
 * Must contain nodes and pagination information
 */
export function isConnectionModel(model?: SdkModel): boolean {
  return model
    ? Boolean(
        isConnection(model.name) &&
          model.fields.list.find(field => field.name === Sdk.NODE_NAME) &&
          model.fields.object.find(field => field.name === Sdk.PAGEINFO_NAME)
      )
    : false;
}

/**
 * Print an abstract class for identifying connection models
 */
function printAbstractConnection(): string {
  return printLines([
    printComment([
      "Abstract class for connection models containing a list of nodes and pagination information",
      "Follows the Relay spec",
    ]),
    `export abstract class ${Sdk.CONNECTION_TYPE}<${Sdk.NODE_TYPE}> extends ${Sdk.REQUEST_CLASS} {
      public ${Sdk.PAGEINFO_NAME}?: ${Sdk.PAGEINFO_TYPE}
      public ${Sdk.NODE_NAME}?: ${Sdk.NODE_TYPE}[]
    }`,
  ]);
}

/**
 * Print the type for updating paginated variables
 */
function printConnectionVariables(): string {
  return printLines([
    printComment(["Variables required for pagination", "Follows the Relay spec"]),
    `export type ${Sdk.CONNECTION_TYPE}${Sdk.VARIABLE_TYPE} = { after?: string; before?: string }`,
  ]);
}

/**
 * Print a fetch result promise wrapper
 */
function printFetchType(): string {
  return printLines([
    printComment(["Fetch return type wrapped in a promise"]),
    `export type ${Sdk.FETCH_TYPE}<${Sdk.RESPONSE_TYPE}> = Promise<${Sdk.RESPONSE_TYPE} | undefined>`,
  ]);
}

/**
 * Print the connection base class to provide fetch helper functions
 */
export function printConnection(): string {
  const fetchType = `(${Sdk.VARIABLE_NAME}?: ${Sdk.CONNECTION_TYPE}${Sdk.VARIABLE_TYPE}) => ${Sdk.FETCH_TYPE}<${Sdk.CONNECTION_TYPE}<${Sdk.NODE_TYPE}>>`;

  const args = getArgList([
    getRequestArg(),
    {
      name: Sdk.FETCH_NAME,
      type: fetchType,
      optional: false,
      description: `Function to refetch the connection given different pagination variables`,
    },
    {
      name: Sdk.NODE_NAME,
      type: `${Sdk.NODE_TYPE}[]`,
      optional: true,
      description: "The list of models to initialize the connection",
    },
    {
      name: Sdk.PAGEINFO_NAME,
      type: Sdk.PAGEINFO_TYPE,
      optional: true,
      description: "The pagination information to initialize the connection",
    },
  ]);

  return printLines([
    printFetchType(),
    "\n",
    printConnectionVariables(),
    "\n",
    printAbstractConnection(),
    "\n",
    printComment([`The base connection class to provide pagination`, "Follows the Relay spec", ...args.jsdoc]),
    `export class ${Sdk.CONNECTION_CLASS}<${Sdk.NODE_TYPE}> extends ${Sdk.CONNECTION_TYPE}<${Sdk.NODE_TYPE}> {
      private _${Sdk.FETCH_NAME}: ${fetchType}
    
      public constructor(${args.printInput}) {
        super(${Sdk.REQUEST_NAME})
        ${printSet(`this._${Sdk.FETCH_NAME}`, Sdk.FETCH_NAME)}
        ${printSet(`this.${Sdk.NODE_NAME}`, Sdk.NODE_NAME)}
        ${printSet(`this.${Sdk.PAGEINFO_NAME}`, Sdk.PAGEINFO_NAME)}
      }
      
      ${printComment(["Add nodes to the end of the existing nodes"])}
      private _appendNodes(${Sdk.NODE_NAME}?: ${Sdk.NODE_TYPE}[]) {
        ${printSet(
          `this.${Sdk.NODE_NAME}`,
          printTernary(
            Sdk.NODE_NAME,
            `[...(this.${Sdk.NODE_NAME} ?? []), ...${Sdk.NODE_NAME}]`,
            `this.${Sdk.NODE_NAME}`
          )
        )}
      }
    
      ${printComment(["Add nodes to the start of the existing nodes"])}
      private _prependNodes(${Sdk.NODE_NAME}?: ${Sdk.NODE_TYPE}[]) {
        ${printSet(
          `this.${Sdk.NODE_NAME}`,
          printTernary(
            Sdk.NODE_NAME,
            `[...${Sdk.NODE_NAME}, ...(this.${Sdk.NODE_NAME} ?? [])]`,
            `this.${Sdk.NODE_NAME}`
          )
        )}
      }

      ${printComment(["Update the pagination end cursor"])}
      private _appendPageInfo(${Sdk.PAGEINFO_NAME}?: ${Sdk.PAGEINFO_TYPE}) {
        if (this.${Sdk.PAGEINFO_NAME}) {
          ${printSet(
            `this.${Sdk.PAGEINFO_NAME}.endCursor`,
            `${Sdk.PAGEINFO_NAME}?.endCursor ?? this.${Sdk.PAGEINFO_NAME}.startCursor`
          )}
          ${printSet(
            `this.${Sdk.PAGEINFO_NAME}.hasNextPage`,
            `${Sdk.PAGEINFO_NAME}?.hasNextPage ?? this.${Sdk.PAGEINFO_NAME}.hasNextPage`
          )}
        }
      }
    
      ${printComment(["Update the pagination start cursor"])}
      private _prependPageInfo(${Sdk.PAGEINFO_NAME}?: ${Sdk.PAGEINFO_TYPE}) {
        if (this.${Sdk.PAGEINFO_NAME}) {
          ${printSet(
            `this.${Sdk.PAGEINFO_NAME}.startCursor`,
            `${Sdk.PAGEINFO_NAME}?.startCursor ?? this.${Sdk.PAGEINFO_NAME}.startCursor`
          )}
          ${printSet(
            `this.${Sdk.PAGEINFO_NAME}.hasPreviousPage`,
            `${Sdk.PAGEINFO_NAME}?.hasPreviousPage ?? this.${Sdk.PAGEINFO_NAME}.hasPreviousPage`
          )}
        }
      }
    
      ${printComment(["Fetch the next page of results and append to nodes"])}
      public async ${Sdk.FETCH_NAME}Next(): Promise<this> {
        if (this.${Sdk.PAGEINFO_NAME}?.hasNextPage) {
          const ${Sdk.RESPONSE_NAME} = await this._${Sdk.FETCH_NAME}({ after: this.${Sdk.PAGEINFO_NAME}?.endCursor })
          this._appendNodes(${Sdk.RESPONSE_NAME}?.${Sdk.NODE_NAME})
          this._appendPageInfo(${Sdk.RESPONSE_NAME}?.${Sdk.PAGEINFO_NAME})
        }
        return Promise.resolve(this)
      }
    
      ${printComment(["Fetch the previous page of results and prepend to nodes"])}
      public async ${Sdk.FETCH_NAME}Previous(): Promise<this> {
        if (this.${Sdk.PAGEINFO_NAME}?.hasPreviousPage) {
          const ${Sdk.RESPONSE_NAME} = await this._${Sdk.FETCH_NAME}({ before: this.${Sdk.PAGEINFO_NAME}?.startCursor })
          this._prependNodes(${Sdk.RESPONSE_NAME}?.${Sdk.NODE_NAME})
          this._prependPageInfo(${Sdk.RESPONSE_NAME}?.${Sdk.PAGEINFO_NAME})
        }
        return Promise.resolve(this)
      }
    }`,
  ]);
}

/**
 * Print the model class for a connection
 */
export function printConnectionModel(context: SdkPluginContext, model: SdkModel): string {
  const nodesField = model.fields.list.find(field => field.name === Sdk.NODE_NAME);
  const modelType = nodesField?.listType;

  const args = getArgList([
    getRequestArg(),
    {
      name: Sdk.FETCH_NAME,
      optional: false,
      type: `(${Sdk.CONNECTION_NAME}?: ${Sdk.CONNECTION_TYPE}${Sdk.VARIABLE_TYPE}) => ${Sdk.FETCH_TYPE}<${Sdk.CONNECTION_TYPE}<${modelType}>>`,
      description: `function to trigger a refetch of this ${model.name} model`,
    },
    {
      name: Sdk.DATA_NAME,
      optional: false,
      type: model.fragment,
      description: `${model.name} response data`,
    },
  ]);

  return printLines([
    printDebug(model),
    printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
    `export class ${model.name} extends ${Sdk.CONNECTION_CLASS}<${modelType}> {
        public constructor(${args.printInput}) {
          super(${printList([
            Sdk.REQUEST_NAME,
            Sdk.FETCH_NAME,
            printTernary(
              `${Sdk.DATA_NAME}?.${Sdk.NODE_NAME}`,
              `${Sdk.DATA_NAME}.${Sdk.NODE_NAME}.map(node => new ${modelType}(${Sdk.REQUEST_NAME}, node))`
            ),
            printTernary(
              `${Sdk.DATA_NAME}?.${Sdk.PAGEINFO_NAME}`,
              `new ${Sdk.PAGEINFO_TYPE}(${Sdk.REQUEST_NAME}, ${Sdk.DATA_NAME}.${Sdk.PAGEINFO_NAME})`
            ),
          ])})
        }
      }`,
  ]);
}
