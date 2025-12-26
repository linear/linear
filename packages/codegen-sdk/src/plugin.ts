import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, nonNullable, PluginContext, printLines } from "@linear/codegen-doc";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { Sdk } from "./constants.js";
import { ModelVisitor } from "./model-visitor.js";
import { parseOperations } from "./parse-operation.js";
import { printConnection } from "./print-connection.js";
import { printEnumExports } from "./print-enum-exports.js";
import { printModels } from "./print-model.js";
import { printOperations } from "./print-operation.js";
import { printRequest } from "./print-request.js";
import { printScalarParsers } from "./print-scalar.js";
import { printSdk } from "./print-sdk.js";
import { SdkModel, SdkPluginConfig, SdkPluginContext } from "./types.js";

const log = "codegen-sdk:plugin:";

/**
 * Graphql-codegen plugin for outputting the typed Linear sdk
 */
export const plugin: PluginFunction<SdkPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: SdkPluginConfig
) => {
  try {
    logger.info(log, "Parsing schema");
    const ast = parse(printSchema(schema));

    logger.info(log, "Collecting context");
    const contextVisitor = new ContextVisitor<SdkPluginConfig>(schema, config);
    visit(ast, contextVisitor);
    const context: PluginContext<SdkPluginConfig> = {
      ...contextVisitor.context,
      fragments: [],
    };

    logger.info(log, "Generating models");
    const modelVisitor = new ModelVisitor(context);
    const models = visit(ast, modelVisitor) as SdkModel[];

    logger.info(log, "Parsing operations");
    const sdkDefinitions = parseOperations(context, documents, models);
    const sdkContext: SdkPluginContext = {
      ...context,
      models,
      sdkDefinitions,
    };

    logger.info(log, "Printing models");
    const printedModels = printModels(sdkContext);

    logger.info(log, "Printing operations");
    const printedOperations = printOperations(sdkContext);

    logger.info(log, "Printing sdk");
    const printedSdk = printSdk(sdkContext);

    logger.info(log, "Printing enum exports");
    const printedEnumExports = printEnumExports(sdkContext);

    return {
      prepend: [
        /** Import document namespace */
        `import * as ${Sdk.NAMESPACE} from '${config.documentFile}.js'`,
      ].filter(nonNullable),
      content: printLines([
        /** Print the requester base class */
        printRequest(),
        /** Print the connection base class */
        printConnection(),
        /** Print the custom scalar parsers */
        printScalarParsers(),
        /** Print the api models */
        printedModels,
        /** Print the api operations */
        printedOperations,
        /** Print the api root operations */
        printedSdk,
        /** Print enum re-exports */
        printedEnumExports,
      ]),
    };
  } catch (e) {
    logger.fatal(log, e);
    throw e;
  }
};
