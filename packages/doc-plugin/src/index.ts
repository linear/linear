import { PluginFunction, PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { debug } from "@linear/common";
import { RawDocPluginConfig } from "config";
import { GraphQLSchema, parse, printSchema, visit } from "graphql";
import { extname } from "path";
import { DocVisitor } from "./doc-visitor";

/**
 * Graphql-codegen plugin for outputting the typed Linear documents
 */
export const plugin: PluginFunction<RawDocPluginConfig> = async (schema: GraphQLSchema) => {
  try {
    /** Get ast from schema */
    const ast = parse(printSchema(schema));

    /** Create the document visitor */
    const visitor = new DocVisitor();

    /** Visit each node in the ast */
    const result = visit(ast, visitor);
    console.log("-------------------- index --> ", require("util").inspect(result, false, null));
    /** Print the result */
    return result;
  } catch (error) {
    console.error(error);
    throw error;
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

  debug("config", config);

  if (extname(outputFile) !== ".graphql") {
    throw new Error(`${prefix} output file extension to be ".graphql" but is "${outputFile}"`);
  }
};

export { DocVisitor };
