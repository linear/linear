import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, PluginContext, printLines, validateExtension } from "@linear/common";
import { ModelVisitor, parseOperations, SdkModel, SdkPluginConfig, SdkPluginContext } from "@linear/plugin-sdk";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";

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
    const tests = "// some comment";

    return printLines([
      /** Print all tests */
      tests,
    ]);
  } catch (e) {
    logger.fatal(e);
    throw e;
  }
};

/**
 * Validate use of the plugin
 */
export const validate: PluginValidateFn = async (
  _schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: SdkPluginConfig,
  outputFile: string
) => {
  const packageName = "@linear/plugin-test";
  logger.info(`Validating ${packageName}`);
  logger.info(config);

  const prefix = `Plugin "${packageName}" config requires`;

  /** Check the output file extension */
  validateExtension(prefix, ".test.ts", outputFile);
};
