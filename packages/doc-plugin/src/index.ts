import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logger } from "@linear/common";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { extname } from "path";
import { getTypeName } from "./field";
import { FragmentVisitor } from "./fragment-visitor";
import { OperationVisitor } from "./operation-visitor";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction = async (schema: GraphQLSchema) => {
  try {
    /** Get ast from schema */
    const ast = parse(printSchema(schema));

    /** Generate fragments */
    logger.info("Generating fragments");
    const fragmentVisitor = new FragmentVisitor(schema);
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
  const packageName = "@linear/doc-plugin";
  logger.info(`Validating ${packageName}`);
  logger.debug({ config });

  const prefix = `Plugin "${packageName}" config requires`;

  /** Check the output file extension */
  if (extname(outputFile) !== ".graphql") {
    throw new Error(`${prefix} output file extension to be ".graphql" but is "${outputFile}"`);
  }
};

export { FragmentVisitor, OperationVisitor };
