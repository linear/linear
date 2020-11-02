<<<<<<< HEAD
export * from "./client";
export * from "./error";
export * from "./types";
export * as LinearDocument from "./_generated_documents";
export * from "./_generated_sdk";
=======
import schema from "./_generated/graphql.schema.json";
import * as types from "./_generated/schema-types";
import * as documents from "./_generated/schema-documents";
import * as sdk from "./_generated/schema-sdk";

export function double(x: string): string {
  return x + x;
}

export default {
  schema,
  types,
  documents,
  sdk,
};
>>>>>>> Initial sdk generation plugin
