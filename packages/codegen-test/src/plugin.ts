import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, PluginContext, printComment, printLines } from "@linear/codegen-doc";
import { ModelVisitor, parseOperations, Sdk, SdkModel, SdkPluginConfig, SdkPluginContext } from "@linear/codegen-sdk";
import { logger } from "@linear/common";
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
      "import { logger } from '@linear/common'",
      'import dotenv from "dotenv"',
      'import execa, { ExecaChildProcess } from "execa"',
      'import getPort from "get-port"',
      'import { promisify } from "util"',
      `import * as ${Sdk.NAMESPACE} from '../index'`,
      "\n",
      printComment(["Load environment variables"]),
      "dotenv.config()",
      "\n",
      /** Print all tests */
      tests,
    ]);
  } catch (e) {
    logger.fatal(e);
    throw e;
  }
};
