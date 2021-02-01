import { PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logger } from "@linear/common";
import { GraphQLSchema } from "graphql";
import { PluginConfig } from "./types";
import { validateExtension } from "./utils";

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
