import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, PluginContext, printLines } from "@linear/codegen-doc";
import { ModelVisitor, parseOperations, Sdk, SdkModel, SdkPluginConfig, SdkPluginContext } from "@linear/codegen-sdk";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { printTests } from "./print-test";

const log = "codegen-test:plugin:";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
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

    logger.info(log, "Printing tests");
    const tests = printTests(sdkContext);

    return printLines([
      "/* eslint-disable no-console */",
      `import * as ${Sdk.NAMESPACE} from '../index'`,
      `import { startTestClient, stopTestClient } from './test-client'`,
      "\n",
      /** Print all tests */
      tests,
    ]);
  } catch (e) {
    logger.fatal(log, e);
    throw e;
  }
};
