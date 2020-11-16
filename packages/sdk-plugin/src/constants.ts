import { upperFirst } from "./utils";

const labels = {
  HANDLER_NAME: "linearHandler",
  HANDLER_TYPE: "LinearHandler",
  ID_NAME: "id",
  ID_TYPE: "string",
  NAMESPACE_DOCUMENT: "D",
  NAMESPACE_TYPE: "T",
  OPTIONS_NAME: "opts",
  REQUESTER_NAME: "requester",
  REQUESTER_TYPE: "Requester",
  RESPONSE_TYPE: "LinearResponse",
  SDK_NAME: "createRawLinearSdk",
  SDK_TYPE: "LinearSdk",
  STATUS_TYPE: "LinearStatus",
  VARIABLE_NAME: "vars",
  WRAPPER_DEFAULT_NAME: "defaultWrapper",
  WRAPPER_NAME: "wrapper",
  WRAPPER_TYPE: "LinearWrapper",
};

/**
 * Get the name of the sdk function scoped to the api key
 */
export function getApiFunctionName(apiKey?: string): string {
  return `${labels.SDK_NAME}${upperFirst(apiKey)}`;
}

/**
 * Get the type of the sdk function scoped to the api key
 */
export function getApiFunctionType(apiKey?: string): string {
  return `${labels.SDK_TYPE}${upperFirst(apiKey)}`;
}

export default labels;
