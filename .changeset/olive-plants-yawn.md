---
"@linear/codegen-sdk": major
"@linear/sdk": major
---

Removed support for calling LinearClient::request with GraphQL document nodes

`LinearClient::request` allows for raw access to Linear's GraphQL API. Previously this method would be called with either
a GraphQL query string, or a document node object. We are removing support for calling this with a document node to
remove the SDK's runtime dependency on the `graphql-js` library. If you were previously using this functionality, the
migration is straightforward. Before calling `request`, stringify your document node using the
[`print`](https://www.graphql-js.org/api-v16/language/#print) function from `graphql-js`:

**Before:**

```ts
import { DocumentNode } from "graphql";

const documentNode: DocumentNode = { /* ... */ };
const graphQLClient = linearClient.client;

await client.request(documentNode);
```

**After:**

```ts
import { DocumentNode, print } from "graphql";

const documentNode: DocumentNode = { /* ... */ };
const graphQLClient = linearClient.client;

await client.request(print(documentNode));
```