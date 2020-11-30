import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logDebug, logError } from "@linear/common";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { extname } from "path";
import { RawDocPluginConfig } from "./config";
import { FragmentVisitor } from "./fragment-visitor";
import { OperationVisitor } from "./operation-visitor";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction<RawDocPluginConfig> = async (schema: GraphQLSchema) => {
  try {
    /** Get ast from schema */
    const ast = parse(printSchema(schema));

    /** Generate fragments */
    const fragmentVisitor = new FragmentVisitor();
    const fragments = visit(ast, fragmentVisitor);

    /** Generate queries */
    const operations = visit(
      parse(printSchema(schema)),
      new OperationVisitor(schema, fragmentVisitor.scalars, fragmentVisitor.fragments, fragmentVisitor.objects)
    );

    /** Print the result */
    return [fragments, operations].join("\n\n");
  } catch (e) {
    logError(e);
    throw e;
  }
};

/**
 * Validate use of the plugin
 */
export const validate: PluginValidateFn = async (
  schema: GraphQLSchema,
  documents: Types.DocumentFile[],
  config: RawDocPluginConfig,
  outputFile: string
) => {
  const prefix = `Plugin "${process.env.npm_package_name}" config requires`;

  logDebug("config", config);

  if (extname(outputFile) !== ".graphql") {
    throw new Error(`${prefix} output file extension to be ".graphql" but is "${outputFile}"`);
  }
};

export { FragmentVisitor, OperationVisitor };
