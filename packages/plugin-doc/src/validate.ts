import { PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logger, PluginConfig, validateExtension } from "@linear/common";
import { GraphQLSchema } from "graphql";

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
