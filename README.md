<p align="center">
  <a href="https://linear.app" target="_blank" rel="noopener noreferrer">
    <img width="64" src="./docs/logo.svg" alt="Linear logo">
  </a> 
</p>
<h1 align="center">
  Linear API
</h1>
<h3 align="center">
  The issue tracking tool you'll enjoy using
</h3>
<p align="center">
  Linear helps streamline software projects, sprints, tasks, and bug tracking. It's built for high-performance teams.
</p>
<p align="center">
  <a href="https://github.com/linearapp/linear/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Linear is released under the MIT license." />
  </a>
  <a href="https://github.com/linearapp/linear/workflows/build">
    <img src="https://github.com/linearapp/linear/workflows/build/badge.svg" alt="Current Github Action build status." />
  </a>
</p>

## 🦋 Make your first query

You can connect to the Linear API and start interacting with your data in a few steps:

1. **Install the Linear Client**

    Using npm:
    ```shell
    npm install @linear/client
    ```

    Or yarn:
    ```shell
    yarn add @linear/client
    ```

2. **Create a Linear API authentication token**

    Login or signup to [Linear](https://linear.app/)

    Go to `Settings > Api`

    Create a `Personal API Key`

3. **Create a Linear Client**

    Using the API key created in step 2:
    ```javascript
    import { LinearClient } from '@linear/client'

    const client = new LinearClient({
      apiKey: YOUR_PERSONAL_API_KEY
    })
    ```

4. **Query for your email address**

    Using async await syntax:
    ```javascript
    const me = await client.viewer;
    console.log('My email address is:', me?.email);
    ```

    Or promises:
    ```javascript
    client.viewer.then(me => {
      if (me) {
        console.log('My email address is:', me.email);
      }
    });
    ```

## 🦄 Using the Client

The Linear Client exposes the Linear GraphQL API through strongly typed models and operations.

All operations return models, which can be used to perform operations for other models.


### Typescript

All types are accessible through the Linear Client package. It is itself written in Typescript:
```typescript
import { Fetch, LinearClient, User } from "@linear/client";

const client = new LinearClient({ apiKey });

async function getCurrentUser(): Fetch<User> {
  return client.viewer;
}
```

### Query

Some models can be fetched from the Linear Client without any arguments:
```typescript
const me = await client.viewer;
const org = await client.organization;
```

Other models are exposed as connections, and return a list of nodes:
```typescript
const issues = await client.issues();
const firstIssue = issues?.nodes?.[0];
```

All required variables are passed as the first arguments:
```typescript
const user = await client.user('user-id');
const team = await client.team('team-id');
```

Any optional variables are passed into the last argument as an object:
```typescript
const fiftyProjects = await client.projects({ first: 50 });
const allComments = await client.comments({ includeArchived: true });
```

Most models expose operations to fetch other models:
```typescript
const me = await client.viewer;
const myIssues = await me?.assignedIssues();
const myFirstIssue = myIssues?.nodes?.[0];
const myFirstIssueComments = await myFirstIssue.comments();
const myFirstIssueFirstComment = myFirstIssueComments?.nodes?.[0];
const myFirstIssueFirstCommentUser = await myFirstIssueFirstComment?.user;
```

Note: Parenthesis is required only if the operation takes an optional variables object.

### Mutate

To create a model, call the Linear Client mutation and pass in the input object:
```typescript
const teams = await client.teams();
const team = teams.nodes?.[0];
if (team) {
  await client.issueCreate({ teamId: team.id, title: "My Created Issue" });
}
```

To update a model, call the Linear Client mutation and pass in the required variables and input object:
```typescript
const me = await client.viewer;
if (me) {
  await client.userUpdate(me.id, { ...me, displayName: "My Updated Name" });
}
```

All mutations are exposed in the same way:
```typescript
const projects = await client.projects();
const project = projects.nodes?.[0];
if (project) {
  await client.projectArchive(project.id);
}
```

### Paginate

Connection models have helpers to fetch the next and previous pages of results:
```typescript
const issues = await client.issues({ after: "some-issue-cursor" });
const nextIssues = await issues.fetchNext;
const prevIssues = await issues.fetchPrevious;
```

Pagination info is exposed and can be used as variables to the query operations. This uses the [Relay Connection spec](https://relay.dev/graphql/connections.htm):
```typescript
const issues = await client.issues();
const hasMoreIssues = issues?.pageInfo.hasNextPage;
const issuesEndCursor = issues?.pageInfo.endCursor;
```

### Search

### Filter

### File Upload

## 🌊 Getting deeper

The Linear Client wraps the Linear SDK, provides a [graphql-request](https://github.com/prisma-labs/graphql-request) client, and parses errors.

### Handling Errors

### Authenticating with OAuth

### Configuring the Request

The graphql-request client can be configured by passing the `RequestInit` object to the Linear Client constructor:
```typescript
const client = new LinearClient({ apiKey, headers: { "my-header": "value" } });
```

### Accessing the GraphQL Client

The graphql-request client is accessible through the Linear Client:
```typescript
const linearClient = new LinearClient({ apiKey });
const graphqlRequestClient = linearClient.client;
graphqlRequestClient.setHeader("my-header", "value");
```

### Customising the GraphQL Client

In order to provide your own request function, the Linear SDK must be used directly. Beware, this circumvents any features added by the Linear Client wrapper, such as error parsing:
```typescript
import { Fetch, LinearSdk, UserConnection } from "@linear/client";
import { DocumentNode, print } from "graphql";
import { GraphQLClient } from "./graphql-client";

class CustomLinearClient extends LinearSdk {
  public constructor(client: GraphQLClient) {
    super(<Response, Variables>(document: DocumentNode, variables?: Variables) =>
      /**
       * The request must take a GraphQL document and variables
       * Then return a promise for the result
       */
      client.request<Response, Variables>(print(document), variables)
    );
  }
}

async function getUsers(): Fetch<UserConnection> {
  const graphQlClient = new GraphQLClient("https://api.linear.app/graphql", {
    headers: { Authorization: apiKey },
  });
  const customClient = new CustomLinearClient(graphQlClient);
  const users = await customClient.users();
  return users;
}
```

### Limitations

## 🌈 Help
- faq
- link to customer slack

## 🔥 How to Contribute

### Getting Started

### Project Structure

## License

Licensed under the [MIT License](./LICENSE).