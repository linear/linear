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

// Creating a new issue through mutation
const newIssue = await linear.mutation.issueCreate({
  input: {
    projectId: projects[0].id,
    title: "Serious bug"
  }
});
```

## Documentation

- **[API reference](https://github.com/linearapp/linear-node-sdk/blob/master/schema.md)**

## License

[MIT](https://github.com/linearapp/linear-node-sdk/blob/master/LICENSE.md)
