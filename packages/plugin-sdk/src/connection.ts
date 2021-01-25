import {
  getArgList,
  isConnection,
  printComment,
  printDebug,
  printLines,
  printList,
  printSet,
  printTernary,
} from "@linear/plugin-common";
import c from "./constants";
import { getRequestArg } from "./request";
import { SdkModel, SdkPluginContext } from "./types";

/**
 * Determine whether this is a connection model
 * Must contain nodes and pagination information
 */
export function isConnectionModel(model?: SdkModel): boolean {
  return model
    ? Boolean(
        isConnection(model.name) &&
          model.fields.list.find(field => field.name === c.NODE_NAME) &&
          model.fields.object.find(field => field.name === c.PAGEINFO_NAME)
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
    `abstract class ${c.CONNECTION_TYPE}<${c.NODE_TYPE}> extends ${c.REQUEST_CLASS} {
      public ${c.PAGEINFO_NAME}?: ${c.PAGEINFO_TYPE}
      public ${c.NODE_NAME}?: ${c.NODE_TYPE}[]
    }`,
  ]);
}

/**
 * Print the type for updating paginated variables
 */
function printConnectionVariables(): string {
  return printLines([
    printComment(["Variables required for pagination", "Follows the Relay spec"]),
    `type ${c.CONNECTION_TYPE}${c.VARIABLE_TYPE} = { after?: string; before?: string }`,
  ]);
}

/**
 * Print a fetch result promise wrapper
 */
function printFetchType(): string {
  return printLines([
    printComment(["Fetch return type wrapped in a promise"]),
    `type ${c.FETCH_TYPE}<Response> = Promise<Response | undefined>`,
  ]);
}

/**
 * Print the connection base class to provide fetch helper functions
 */
export function printConnection(): string {
  const fetchType = `(${c.VARIABLE_NAME}?: ${c.CONNECTION_TYPE}${c.VARIABLE_TYPE}) => ${c.FETCH_TYPE}<${c.CONNECTION_TYPE}<${c.NODE_TYPE}>>`;

  const args = getArgList([
    getRequestArg(),
    {
      name: c.FETCH_NAME,
      type: fetchType,
      optional: false,
      description: `Function to refetch the connection given different pagination variables`,
    },
    {
      name: c.NODE_NAME,
      type: `${c.NODE_TYPE}[]`,
      optional: true,
      description: "The list of models to initialize the connection",
    },
    {
      name: c.PAGEINFO_NAME,
      type: c.PAGEINFO_TYPE,
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
    `class ${c.CONNECTION_CLASS}<${c.NODE_TYPE}> extends ${c.CONNECTION_TYPE}<${c.NODE_TYPE}> {
      private _${c.FETCH_NAME}: ${fetchType}
    
      public constructor(${args.printInput}) {
        super(${c.REQUEST_NAME})
        ${printSet(`this._${c.FETCH_NAME}`, c.FETCH_NAME)}
        ${printSet(`this.${c.NODE_NAME}`, c.NODE_NAME)}
        ${printSet(`this.${c.PAGEINFO_NAME}`, c.PAGEINFO_NAME)}
      }
      
      ${printComment(["Add nodes to the end of the existing nodes"])}
      private _appendNodes(${c.NODE_NAME}?: ${c.NODE_TYPE}[]) {
        ${printSet(
          `this.${c.NODE_NAME}`,
          printTernary(c.NODE_NAME, `[...(this.${c.NODE_NAME} ?? []), ...${c.NODE_NAME}]`, `this.${c.NODE_NAME}`)
        )}
      }
    
      ${printComment(["Add nodes to the start of the existing nodes"])}
      private _prependNodes(${c.NODE_NAME}?: ${c.NODE_TYPE}[]) {
        ${printSet(
          `this.${c.NODE_NAME}`,
          printTernary(c.NODE_NAME, `[...${c.NODE_NAME}, ...(this.${c.NODE_NAME} ?? [])]`, `this.${c.NODE_NAME}`)
        )}
      }

      ${printComment(["Update the pagination end cursor"])}
      private _appendPageInfo(${c.PAGEINFO_NAME}?: ${c.PAGEINFO_TYPE}) {
        if (this.${c.PAGEINFO_NAME}) {
          ${printSet(
            `this.${c.PAGEINFO_NAME}.endCursor`,
            `${c.PAGEINFO_NAME}?.endCursor ?? this.${c.PAGEINFO_NAME}.startCursor`
          )}
          ${printSet(
            `this.${c.PAGEINFO_NAME}.hasNextPage`,
            `${c.PAGEINFO_NAME}?.hasNextPage ?? this.${c.PAGEINFO_NAME}.hasNextPage`
          )}
        }
      }
    
      ${printComment(["Update the pagination start cursor"])}
      private _prependPageInfo(${c.PAGEINFO_NAME}?: ${c.PAGEINFO_TYPE}) {
        if (this.${c.PAGEINFO_NAME}) {
          ${printSet(
            `this.${c.PAGEINFO_NAME}.startCursor`,
            `${c.PAGEINFO_NAME}?.startCursor ?? this.${c.PAGEINFO_NAME}.startCursor`
          )}
          ${printSet(
            `this.${c.PAGEINFO_NAME}.hasPreviousPage`,
            `${c.PAGEINFO_NAME}?.hasPreviousPage ?? this.${c.PAGEINFO_NAME}.hasPreviousPage`
          )}
        }
      }
    
      ${printComment(["Fetch the next page of results and append to nodes"])}
      public get ${c.FETCH_NAME}Next(): Promise<this> {
        return ${printTernary(
          `this.${c.PAGEINFO_NAME}?.hasNextPage`,
          `this._${c.FETCH_NAME}({ after: this.${c.PAGEINFO_NAME}?.endCursor }).then(${c.RESPONSE_NAME} => {
            this._appendNodes(${c.RESPONSE_NAME}?.${c.NODE_NAME})
            this._appendPageInfo(${c.RESPONSE_NAME}?.${c.PAGEINFO_NAME})
            return this
          })`,
          `Promise.resolve(this)`
        )}
      }
    
      ${printComment(["Fetch the previous page of results and prepend to nodes"])}
      public get ${c.FETCH_NAME}Previous(): Promise<this> {
        return ${printTernary(
          `this.${c.PAGEINFO_NAME}?.hasPreviousPage`,
          `this._${c.FETCH_NAME}({ before: this.${c.PAGEINFO_NAME}?.startCursor }).then(${c.RESPONSE_NAME} => {
            this._prependNodes(${c.RESPONSE_NAME}?.${c.NODE_NAME})
            this._prependPageInfo(${c.RESPONSE_NAME}?.${c.PAGEINFO_NAME})
            return this
          })`,
          `Promise.resolve(this)`
        )}
      }
    }`,
  ]);
}

/**
 * Print the model class for a connection
 */
export function printConnectionModel(context: SdkPluginContext, model: SdkModel): string {
  const nodesField = model.fields.list.find(field => field.name === c.NODE_NAME);
  const modelType = nodesField?.listType;

  const args = getArgList([
    getRequestArg(),
    {
      name: c.FETCH_NAME,
      optional: false,
      type: `(${c.VARIABLE_NAME}?: ${c.CONNECTION_TYPE}${c.VARIABLE_TYPE}) => ${c.FETCH_TYPE}<${c.CONNECTION_TYPE}<${modelType}>>`,
      description: `function to trigger a refetch of this ${model.name} model`,
    },
    {
      name: c.DATA_NAME,
      optional: false,
      type: model.fragment,
      description: `${model.name} response data`,
    },
  ]);

  return printLines([
    printDebug(model),
    printComment([model.node.description?.value ?? `${model.name} model`, ...args.jsdoc]),
    `class ${model.name} extends ${c.CONNECTION_CLASS}<${modelType}> {
        public constructor(${args.printInput}) {
          super(${printList([
            c.REQUEST_NAME,
            c.FETCH_NAME,
            printTernary(
              `${c.DATA_NAME}?.${c.NODE_NAME}`,
              `${c.DATA_NAME}.${c.NODE_NAME}.map(node => new ${modelType}(${c.REQUEST_NAME}, node))`
            ),
            printTernary(
              `${c.DATA_NAME}?.${c.PAGEINFO_NAME}`,
              `new ${c.PAGEINFO_TYPE}(${c.REQUEST_NAME}, ${c.DATA_NAME}.${c.PAGEINFO_NAME})`
            ),
          ])})
        }
      }`,
  ]);
}
