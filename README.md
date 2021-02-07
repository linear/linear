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
  Linear helps streamline software projects, sprints, tasks, and
  bug tracking. It's built for high-performance teams.
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
    async function getEmail() {
      const me = await client.viewer;
      console.log('My email address is:', me?.email);
    }

    getEmail();
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

Mutations will often return a success boolean and the mutated entity:
```typescript
const commentPayload = await client.commentCreate({ issueId: "some-issue-id" });
if (commentPayload.success) {
  return commentPayload.comment;
} else {
  throw new Error('Failed to create comment', input);
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

Errors can be caught and interrogated by wrapping the operation in a try catch block:
```typescript
async function createComment(input: CommentCreateInput): Fetch<Comment | UserError> {
  try {
    /** Try to create a comment */
    const commentPayload = await client.commentCreate(input);
    /** Return it if available */
    return commentPayload.comment;
  } catch (error: unknown) {
    /** The error has been parsed by Linear Client */
    throw error as LinearError;
  }
}
```

Or by catching the error thrown from a calling function:
```typescript
async function archiveFirstIssue(): Promise<ArchivePayload | undefined> {
  const me = await client.viewer;
  const issues = await me?.assignedIssues();
  const firstIssue = issues?.nodes?.[0];

  if (firstIssue?.id) {
    const payload = await client.issueArchive(firstIssue.id);
    return payload;
  } else {
    return undefined;
  }
}

archiveFirstIssue().catch(error => {
  throw error as LinearError;
});
```

The parsed error type can be compared against the LinearErrorType enum:
```typescript
createTeam(input).catch(error => {
  /** The error has been parsed and provided with a type */
  if ((error as LinearError)?.type === LinearErrorType.InvalidInput) {
    /** If the mutation has failed due to an invalid user input return a custom user error */
    return new UserError(input, error);
  } else {
    /** Otherwise throw the error and handle in the calling function */
    throw error;
  }
});
```

Information about the request resulting in the error is attached if available:
```typescript
run().catch((_error) => {
  const error = _error as LinearError;
  console.error('Failed query:', error.query)
  console.error('With variables:', error.variables)
  throw error
});
```

Information about the response is attached if available:
```typescript
run().catch((_error) => {
  const error = _error as LinearError;
  console.error('Failed HTTP status:', error.status)
  console.error('Failed response data:', error.data)
  throw error
});
```

Any GraphQL errors are parsed and added to an array:
```typescript
run().catch((_error) => {
  const error = _error as LinearError;
  error.errors.map(graphqlError => {
    console.log("Error message", graphqlError.message);
    console.log("LinearErrorType of this GraphQL error", graphqlError.type);
    console.log("Error due to user input", graphqlError.userError);
    console.log("Path through the GraphQL schema", graphqlError.path);
  });
  throw error;
});
```

The raw error returned by the graphql-request client is still available:
```typescript
run().catch((_error) => {
  const error = _error as LinearError;
  console.log("The original error", error.raw);
  throw error;
});
```

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

In order to use a custom the GraphQL Client, the Linear SDK must be used directly and provided with a request function:
```typescript
import { Fetch, LinearError, LinearSdk, Request, UserConnection } from "@linear/client";
import { DocumentNode, GraphQLClient, print } from "graphql";
import { CustomGraphqlClient } from "./graphql-client";

/** Create a custom client configured with the Linear API base url and API key */
const customGraphqlClient = new CustomGraphqlClient("https://api.linear.app/graphql", {
  headers: { Authorization: apiKey },
});

/** Create the custom request function */
const customLinearRequest: Request = <Response, Variables>(document: DocumentNode, variables?: Variables) => {
  /** The request must take a GraphQL document and variables, then return a promise for the result */
  return customGraphqlClient.request<Response, Variables>(print(document), variables).catch(error => {
    /** Optionally catch and parse errors from the Linear API */
    throw new LinearError(error);
  })
}

/** Extend the Linear SDK to provide a request function using the custom client */
class CustomLinearClient extends LinearSdk {
  public constructor() {
    super(customLinearRequest);
  }
}

/** Create an instance of the custom client */
const customLinearClient = new CustomLinearClient();

/** Use the custom client as if it were the Linear Client */
async function getUsers(): Fetch<UserConnection> {
  const users = await customLinearClient.users();
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