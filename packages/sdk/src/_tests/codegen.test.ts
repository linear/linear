import { plugin as generateDocuments } from "@linear/codegen-doc";
import { plugin as generateSdk } from "@linear/codegen-sdk";
import { buildSchema, parse, validate } from "graphql";
import { describe, expect, it } from "vitest";

async function generatePreferenceModel(fieldType: string, argument: string) {
  const schema = buildSchema(`
    enum ViewType { issues projects }
    type ViewPreferences {
      id: ID!
      viewType: ${fieldType}
    }
    type CustomView {
      id: ID!
      preferences: ViewPreferences
    }
    type Query {
      customView(id: String!): CustomView
      viewPreferences(${argument}): ViewPreferences
    }
  `);
  const documents = await generateDocuments(schema, [], {});
  if (typeof documents !== "string") {
    throw new Error("Expected GraphQL documents");
  }
  const document = parse(documents);
  expect(validate(schema, document)).toEqual([]);

  const sdk = await generateSdk(schema, [{ document }], { documentFile: "./documents" });
  if (typeof sdk === "string") {
    throw new Error("Expected SDK output");
  }
  return sdk.content;
}

describe("SDK query field generation", () => {
  it("embeds objects when a string field cannot supply an enum query argument", async () => {
    const sdk = await generatePreferenceModel("String!", "viewType: ViewType!");

    expect(sdk).toContain("public preferences?: ViewPreferences | null");
    expect(sdk).not.toContain("get preferences()");
    expect(sdk).not.toContain("get preferencesId()");
  });

  it.each(["String!", "ViewType!"])("fetches by a compatible %s field without an ID getter", async type => {
    const sdk = await generatePreferenceModel(type, `viewType: ${type}`);

    expect(sdk).toContain("get preferences()");
    expect(sdk).toContain("this._preferences?.viewType");
    expect(sdk).not.toContain("get preferencesId()");
  });

  it.each(["String!", "String"])("preserves ID getters for %s ID arguments", async type => {
    const sdk = await generatePreferenceModel("String!", `id: ${type}`);

    expect(sdk).toContain("get preferences()");
    expect(sdk).toContain("get preferencesId()");
    expect(sdk).toContain("return this._preferences?.id");
  });
});
