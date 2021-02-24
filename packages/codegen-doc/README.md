# Linear Codegen Document

This custom [graphql-code-generator](https://graphql-code-generator.com/) plugin takes the Linear GraphQL [schema](../sdk/src/schema.graphql) and generates GraphQL [fragments and operations](../sdk/src/_generated_documents.graphql). 

Usage in [codegen.doc.yml](../sdk/codegen.doc.yml).

## Output

The [@linear/sdk](../sdk/README.md) uses this code generator [plugin](./src/plugin.ts) to generate:

A fragment for each model in the Linear API containing:
- all scalar fields on the model
- required fields for any nested object with a matching query
- fragment spreads for any nested object with no matching query

An operation for each query and mutation in the Linear API containing:
- all available variables
- fragment spread for the matching model

An operation for each nested query within a model containing:
- all available variables for both the root and child query
- fragment spread for the matching child model
- a query name joining the root and child query fields (eg `query user_assignedIssues`)

## Flow

1. The GraphQL schema is parsed using a reusable [ContextVisitor](./src/context-visitor.ts) to provide consistent information across the Linear code generator plugins
2. The context is visited using the [FragmentVisitor](./src/fragment-visitor.ts) to return a list of printed GraphQL fragments
3. The fragments and context are visited using the [OperationVisitor](./src/operation-visitor.ts) to return a list of printed GraphQL operations
4. The printed fragments and operations are returned to be printed 

<!-- AUTO-GENERATED-CONTENT:START (TEXT_SECTION:id=license&src=../../README.md) -->
## License

<br/>

Licensed under the [MIT License](./LICENSE).
<!-- AUTO-GENERATED-CONTENT:END -->
