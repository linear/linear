# @linear/sdk

Node library for querying Linear's API and creating new issues and tasks. It's a light wrapper around Linear's GraphQL API and ships with Typescript types out of the box.

## Usage

```
yarn install @linear/sdk
```

```js
import { Linear } from "@linear/sdk";

const linear = new Linear({
  token: "<your developer key>"
});

// Making a query
const projects = await linear.query.projects();

// Creating a new issue through mutation with return value
const newIssue = await linear.mutation.issueCreate(
  {
    input: {
      projectId: projects[0].id,
      title: "Serious bug"
    }
  },
  `
{
  issue {
    id
  }
}
`
);
```

If you want to be more specific on return values with your queries, you can also pass GraphQL query with the query call:

```js
// Get project id for an issue
const issue = await linear.getIssue(issueId, "{ id project { id } }");
console.log(issue.project.id);

// Fetch project states with associated projects ids
const states = await linear.client.query.projectStates(
  {},
  `{ id name project { id } }`
);
```

## Documentation

- **[API reference](https://github.com/linearapp/linear-node-sdk/blob/master/schema.md)**

## License

[MIT](https://github.com/linearapp/linear-node-sdk/blob/master/LICENSE.md)
