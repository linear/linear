import { PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { logger } from "@linear/common";
import { validateExtension } from "@linear/plugin-doc";
import { SdkPluginConfig } from "@linear/plugin-sdk";
import { GraphQLSchema } from "graphql";

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
