import { PluginValidateFn, Types } from "@graphql-codegen/plugin-helpers";
import { GraphQLSchema } from "graphql";
import { logger } from "./logger";
import { PluginConfig } from "./types";
import { validateExtension } from "./utils";

const log = "codegen-doc:validate:";
/**
 * Validate use of the plugin
 */
export const validate: PluginValidateFn = async (
  _schema: GraphQLSchema,
  _documents: Types.DocumentFile[],
  config: PluginConfig,
  outputFile: string
) => {
  const packageName = "@linear/codegen-doc";
  logger.info(log, `Validating ${packageName}`);
  logger.info(log, config);

  /** Check the output file extension */
  validateExtension(packageName, ".graphql", outputFile);
};
