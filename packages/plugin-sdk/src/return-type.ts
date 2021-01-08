import { filterJoin, getArgList, printComment } from "@linear/plugin-common";
import { getOperationArgs, getOperationObjects } from "./operation";
import { printNamespaced, printOperationReturnType, printSdkFunctionType } from "./print";
import { SdkDefinition, SdkOperation, SdkPluginContext } from "./types";

/**
 * Print a return type for all operations
 */
export function printSdkReturnTypes(context: SdkPluginContext): string {
  const returnTypes = Object.values(context.sdkDefinitions).reduce<string[]>((acc, definition) => {
    return [...acc, ...definition.operations.map(o => printSdkReturnType(context, o))];
  }, []);

  return filterJoin(returnTypes, "\n\n");
}

/**
 * Get the operations for this return type
 */
export function getReturnOperations(context: SdkPluginContext, o: SdkOperation): SdkDefinition {
  return context.sdkDefinitions[o.path.join("_")];
}

/**
 * Print the exported return type for an sdk operation
 */
function printSdkReturnType(context: SdkPluginContext, o: SdkOperation): string {
  const documentName = printNamespaced(context, o.documentVariableName);
  const operationObjects = getOperationObjects(context, o);
  const documentResultType = `ResultOf<typeof ${documentName}>`;

  /** Add the operation sdk if we have return operations */
  const operationSdkType = getReturnOperations(context, o) ? printSdkFunctionType(o.path) : undefined;

  /** Result type from api */
  const resultType = filterJoin([documentResultType, ...o.path.map(key => `['${key}']`)], "");

  /** Override any properties that will have functions attached */
  const omittedResultType = operationObjects.length
    ? `Omit<${resultType}, ${filterJoin(
        operationObjects.map(({ field }) => `'${field.name.value}'`),
        " | "
      )}>`
    : resultType;

  /** Attach the nested sdk objects */
  const objectSdkTypes = operationObjects.map(({ field, queryDefinition }) => {
    if (queryDefinition) {
      const fieldReturnType = printOperationReturnType("Query", [field.name.value]);

      // /** Argument definition for each required variable that is not in the parent scope */
      // const requiredVariables: (ArgDefinition | undefined)[] = queryDefinition.requiredVariables.map(
      //   ({ name, type }) => ({
      //     name,
      //     type,
      //     optional: false,
      //     description: `${name} to pass into the ${o.operationResultType}`,
      //   })
      // );
      // const requiredVariableNames = requiredVariables.map(v => (v ? `'${v.name}'` : undefined));

      // /** Single definition for any optional variables */
      // const optionalVariables = getOptionalVariables(queryDefinition.node);
      // const variableType = printNamespaced(context, queryDefinition.operationVariablesTypes);
      // const optionalArg = requiredVariables.length
      //   ? {
      //       name: c.VARIABLE_NAME,
      //       optional: true,
      //       type: `Omit<${variableType}, ${filterJoin(requiredVariableNames, " | ")}>`,
      //       description: `variables without ${filterJoin(requiredVariableNames, ", ")} to pass into the ${
      //         o.operationResultType
      //       }`,
      //     }
      //   : {
      //       name: c.VARIABLE_NAME,
      //       optional: true,
      //       type: variableType,
      //       description: `variables to pass into the ${o.operationResultType}`,
      //     };

      // /** Spread required variables first */
      // const fieldArgs = [...requiredVariables, optionalVariables.length ? optionalArg : undefined];

      const fieldArgs = getArgList(getOperationArgs(context, queryDefinition));

      /** Join all nested field sdks */
      return `${field.name.value}?: (${fieldArgs.printInput}) => Promise<${fieldReturnType} | undefined>`;
    } else {
      return undefined;
    }
  });

  /** Create comment */
  const comment = printComment([`Response from calling ${o.path.join(" ")} query`]);

  if (objectSdkTypes.length) {
    /** Export an interface if possible */
    const extendsType = filterJoin([operationSdkType, omittedResultType], ", ");
    return filterJoin(
      [
        comment,
        `export interface ${o.returnType} extends ${extendsType} {
          ${filterJoin(objectSdkTypes, ",\n")}
        }`,
      ],
      "\n"
    );
  } else {
    const returnType = filterJoin([operationSdkType, omittedResultType], " & ");
    return filterJoin([comment, `export type ${o.returnType} = ${returnType}`], "\n");
  }
}
