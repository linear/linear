import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, FragmentVisitor, logger, OperationVisitor } from "@linear/plugin-common";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { extname } from "path";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: unknown
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

    return [
      /** Print all fragments */
      fragments,
      /** Print all operations */
      operations,
    ].join("\n\n");
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
  config: unknown,
  outputFile: string
) => {
  const packageName = "@linear/plugin-doc";
  logger.info(`Validating ${packageName}`);
  logger.info({ config });

  const prefix = `Plugin "${packageName}" config requires`;

  /** Check the output file extension */
  if (extname(outputFile) !== ".graphql") {
    throw new Error(`${prefix} output file extension to be ".graphql" but is "${outputFile}"`);
  }
};

export { FragmentVisitor, OperationVisitor };
