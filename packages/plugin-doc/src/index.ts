import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { ContextVisitor, FragmentVisitor, getTypeName, logger, OperationVisitor } from "@linear/plugin-common";
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
    /** Get ast from schema */
    const ast = parse(printSchema(schema));

    /** Collect plugin context */
    logger.info("Gathering context");
    const contextVisitor = new ContextVisitor(schema, config);
    visit(ast, contextVisitor);

    /** Generate fragments */
    logger.info("Generating fragments");
    const fragmentVisitor = new FragmentVisitor(contextVisitor.context);
    const fragments = visit(ast, fragmentVisitor);
    logger.debug({
      scalars: fragmentVisitor.context.scalars,
      fragments: fragmentVisitor.context.fragments.map(x => x.name),
      objects: fragmentVisitor.context.objects.map(x => x.name.value),
      queries: fragmentVisitor.context.queries.map(x => getTypeName(x.type)),
      operationMap: fragmentVisitor.context.operationMap,
    });

    /** Generate queries */
    logger.info("Generating operations");
    const operations = visit(ast, new OperationVisitor(fragmentVisitor.context));

    /** Print the result */
    logger.info("Printing fragments and operations");
    return [fragments, operations].join("\n\n");
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
  logger.debug({ config });

  const prefix = `Plugin "${packageName}" config requires`;

  /** Check the output file extension */
  if (extname(outputFile) !== ".graphql") {
    throw new Error(`${prefix} output file extension to be ".graphql" but is "${outputFile}"`);
  }
};

export { FragmentVisitor, OperationVisitor };
