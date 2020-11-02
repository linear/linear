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
