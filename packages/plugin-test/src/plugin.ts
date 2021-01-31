import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, PluginContext, printComment, printLines } from "@linear/common";
import {
  ModelVisitor,
  parseOperations,
  SdkConstants,
  SdkModel,
  SdkPluginConfig,
  SdkPluginContext,
} from "@linear/plugin-sdk";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { printTests } from "./print-test";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
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

    logger.trace(sdkContext);

    logger.info("Printing tests");
    const tests = printTests(sdkContext);

    return printLines([
      /** Import logger and client */
      "import { logger } from '@linear/common'",
      `import * as ${SdkConstants.NAMESPACE} from '../index'`,
      'import dotenv from "dotenv"',
      "\n",
      /** Import env variables from .env file */
      printComment(["Load environment variables"]),
      "dotenv.config()",
      "\n",
      /** Create the client configured with api key */
      printComment(["Initialize Linear client with the api key"]),
      `const client = new ${SdkConstants.NAMESPACE}.LinearClient({ apiKey: process.env.E2E_API_KEY })`,
      "\n",
      /** Print all tests */
      tests,
    ]);
  } catch (e) {
    logger.fatal(e);
    throw e;
  }
};
