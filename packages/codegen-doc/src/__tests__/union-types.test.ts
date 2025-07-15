import { ArgumentTypescriptVisitor } from "../argument-typescript-visitor";
import { PluginContext } from "../types";
import {
  Kind,
  NamedTypeNode,
  UnionTypeDefinitionNode,
  GraphQLSchema,
  buildASTSchema,
  parse,
} from "graphql";

/**
* Construct a minimal plugin context containing a single union and no other types.
*/
function createContext(): PluginContext {
  const schemaSDL = `
    type A { id: ID }
    type B { id: ID }
    union Example = A | B
  `;
  const schema: GraphQLSchema = buildASTSchema(parse(schemaSDL));

  // Extract the union definition node
  const unionDef = parse(schemaSDL).definitions.find(
    def => def.kind === Kind.UNION_TYPE_DEFINITION && (def as UnionTypeDefinitionNode).name.value === "Example"
  ) as UnionTypeDefinitionNode;

  return {
    schema,
    scalars: {},
    fragments: [],
    objects: [],
    interfaces: [],
    queries: [],
    mutations: [],
    operationMap: { query: "Query", mutation: "Mutation" },
    interfaceImplementations: {},
    enums: [],
    unions: [unionDef],
    config: {},
  } as unknown as PluginContext;
}

describe("ArgumentTypescriptVisitor – union types", () => {
  it("prints a union as a discriminated union of member fragments", () => {
    const context = createContext();
    const visitor = new ArgumentTypescriptVisitor(context, "Sdk");

    const node: NamedTypeNode = {
      kind: Kind.NAMED_TYPE,
      name: { kind: Kind.NAME, value: "Example" },
    };

    const printed = visitor.NamedType.leave(node);

    expect(printed).toBe("Sdk.A | Sdk.B");
  });
});
