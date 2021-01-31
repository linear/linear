import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, nonNullable, PluginContext, printLines } from "@linear/common";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import c from "./constants";
import { ModelVisitor } from "./model-visitor";
import { parseOperations } from "./parse-operation";
import { printConnection } from "./print-connection";
import { printModels } from "./print-model";
import { printOperations } from "./print-operation";
import { printRequest } from "./print-request";
import { printSdk } from "./print-sdk";
import { SdkModel, SdkPluginConfig, SdkPluginContext } from "./types";

/**
 * Graphql-codegen plugin for outputting the typed Linear sdk
 */
export const plugin: PluginFunction<SdkPluginConfig> = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: SdkPluginConfig
) => {
  try {
    logger.info("Parsing schema");
    const ast = parse(printSchema(schema));

    logger.info("Collecting context");
    const contextVisitor = new ContextVisitor<SdkPluginConfig>(schema, config);
    visit(ast, contextVisitor);
    const context: PluginContext<SdkPluginConfig> = {
      ...contextVisitor.context,
      fragments: [],
    };

    logger.info("Generating models");
    const modelVisitor = new ModelVisitor(context);
    const models = visit(ast, modelVisitor) as SdkModel[];

    logger.info("Parsing operations");
    const sdkDefinitions = parseOperations(context, documents, models);
    const sdkContext: SdkPluginContext = {
      ...context,
      models,
      sdkDefinitions,
    };

    logger.info("Printing models");
    const printedModels = printModels(sdkContext);

    logger.info("Printing operations");
    const printedOperations = printOperations(sdkContext);

    logger.info("Printing sdk");
    const printedSdk = printSdk(sdkContext);

    return {
      prepend: [
        /** Ignore unused variables */
        "/* eslint-disable @typescript-eslint/no-unused-vars */",
        /** Import DocumentNode */
        "import { DocumentNode } from 'graphql'",
        /** Import document namespace */
        `import * as ${c.NAMESPACE} from '${config.documentFile}'`,
      ].filter(nonNullable),
      content: printLines([
        /** Print the requester base class */
        printRequest(),
        /** Print the connection base class */
        printConnection(),
        /** Print the api models */
        printedModels,
        /** Print the api operations */
        printedOperations,
        /** Print the api root operations */
        printedSdk,
      ]),
    };
  } catch (e) {
    logger.fatal(e);
    throw e;
  }
};
