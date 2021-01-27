import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, logger, PluginConfig, printLines, validateExtension } from "@linear/common";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { FragmentVisitor } from "./fragment-visitor";
import { OperationVisitor } from "./operation-visitor";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: PluginConfig
) => {
  try {
    logger.info("Parsing schema");
    const ast = parse(printSchema(schema));

    logger.info("Collecting context");
    const contextVisitor = new ContextVisitor(schema, config);
    visit(ast, contextVisitor);

    logger.info("Generating fragments");
    const fragmentVisitor = new FragmentVisitor(contextVisitor.context);
    const fragments = visit(ast, fragmentVisitor);

    logger.info("Generating operations");
    const operations = visit(ast, new OperationVisitor(fragmentVisitor.context));

    return printLines([
      /** Print all fragments */
      fragments,
      /** Print all operations */
      operations,
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
  config: PluginConfig,
  outputFile: string
) => {
  const packageName = "@linear/plugin-doc";
  logger.info(`Validating ${packageName}`);
  logger.info(config);

  /** Check the output file extension */
  validateExtension(packageName, ".graphql", outputFile);
};
