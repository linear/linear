import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { ContextVisitor } from "./context-visitor.js";
import { FragmentVisitor } from "./fragment-visitor.js";
import { logger } from "./logger.js";
import { OperationVisitor } from "./operation-visitor.js";
import { printLines } from "./print.js";
import { PluginConfig } from "./types.js";

const log = "codegen-doc:plugin:";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction = async (
  schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: PluginConfig
) => {
  try {
    logger.info(log, "Parsing schema");
    const ast = parse(printSchema(schema));

    logger.info(log, "Collecting context");
    const contextVisitor = new ContextVisitor(schema, config);
    visit(ast, contextVisitor);

    logger.info(log, "Generating fragments");
    const fragmentVisitor = new FragmentVisitor(contextVisitor.context);
    const fragments = visit(ast, fragmentVisitor);

    logger.info(log, "Generating operations");
    const operations = visit(ast, new OperationVisitor(fragmentVisitor.context));

    return printLines([
      /** Print all fragments */
      fragments,
      /** Print all operations */
      operations,
    ]);
  } catch (e) {
    logger.fatal(log, e);
    throw e;
  }
};
