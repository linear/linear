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
  Linear helps streamline software projects, sprints, tasks, and<br />
  bug tracking. It's built for high-performance teams.
</p>
<p align="center">
  <a href="https://github.com/linear/linear/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Linear is released under the MIT license." />
  </a>
  <a href="https://github.com/linear/linear/workflows/build">
    <img src="https://github.com/linear/linear/workflows/build/badge.svg" alt="Current Github Action build status." />
  </a>
</p>

<br/>

- [🦋 Your First Query](#-your-first-query)
- [🦄 Features](#-features)
  - [Typescript](#typescript)
  - [Query](#query)
  - [Mutate](#mutate)
  - [Paginate](#paginate)
  - [File Upload](#file-upload)
  - [Error](#error)
  - [Limitations](#limitations)
- [☀️ API Reference](#️-api-reference)
- [🌵 OAuth Authentication](#-oauth-authentication)
- [🌈 Find Help](#-find-help)
- [🌊 Advanced](#-advanced)
  - [Request Configuration](#request-configuration)
  - [Raw GraphQL Client](#raw-graphql-client)
  - [Raw GraphQL Queries](#raw-graphql-queries)
  - [Custom GraphQL Client](#custom-graphql-client)
- [🔥 Contribute](#-contribute)
  - [Get Started](#get-started)
  - [Project Structure](#project-structure)
- [License](#license)

<br/>

## 🦋 Your First Query

<br/>

Connect to the Linear API and interact with your data in a few steps:

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

    Go to [Settings > Api](https://linear.app/settings/api)

    Create a `Personal API Key`

3. **Create a Linear Client**

    Using the API key created in step 2:
    ```javascript
    import { LinearClient } from '@linear/client'

    const client = new LinearClient({
      apiKey: YOUR_PERSONAL_API_KEY
    })
    ```

4. **Query for your issues**

    Using async await syntax:
    ```typescript
    async function getMyIssues() {
      const me = await linearClient.viewer;
      const myIssues = await me?.assignedIssues();

      myIssues?.nodes?.map(issue => {
        console.log(`${me?.displayName} has issue: ${issue?.title}`);
      });

      return myIssues;
    }

    getMyIssues();
    ```

    Or promises:
    ```typescript
    linearClient.viewer.then(me => {
      return me?.assignedIssues()?.then(myIssues => {
        myIssues?.nodes?.map(issue => {
          console.log(`${me?.displayName} has issue: ${issue?.title}`);
        });

        return myIssues;
      });
    });
    ```

<br/>

## 🦄 Features

<br/>

The Linear Client exposes the [Linear GraphQL schema](./packages/sdk/src/schema.graphql) through strongly typed [models and operations](packages/sdk/src/_generated_sdk.ts).

All operations return models, which can be used to perform operations for other models.

### Typescript

All types are accessible through the Linear Client package. It is written in Typescript:
```typescript
import { Fetch, LinearClient, User } from "@linear/client";

const linearClient = new LinearClient({ apiKey });

async function getCurrentUser(): LinearFetch<User> {
  return linearClient.viewer;
}
```

### Query

Some models can be fetched from the Linear Client without any arguments:
```typescript
const me = await linearClient.viewer;
const org = await linearClient.organization;
```

Other models are exposed as connections, and return a list of nodes:
```typescript
const issues = await linearClient.issues();
const firstIssue = issues?.nodes?.[0];
```

All required variables are passed as the first arguments:
```typescript
const user = await linearClient.user("user-id");
const team = await linearClient.team("team-id");
```

Any optional variables are passed into the last argument as an object:
```typescript
const fiftyProjects = await linearClient.projects({ first: 50 });
const allComments = await linearClient.comments({ includeArchived: true });
```

Most models expose operations to fetch other models:
```typescript
const me = await linearClient.viewer;
const myIssues = await me?.assignedIssues();
const myFirstIssue = myIssues?.nodes?.[0];
const myFirstIssueComments = await myFirstIssue?.comments();
const myFirstIssueFirstComment = myFirstIssueComments?.nodes?.[0];
const myFirstIssueFirstCommentUser = await myFirstIssueFirstComment?.user;
```

**NOTE:** Parenthesis is required only if the operation takes an optional variables object.

### Mutate

To create a model, call the Linear Client mutation and pass in the input object:
```typescript
const teams = await linearClient.teams();
const team = teams?.nodes?.[0];
if (team?.id) {
  await linearClient.issueCreate({ teamId: team.id, title: "My Created Issue" });
}
```

To update a model, call the Linear Client mutation and pass in the required variables and input object:
```typescript
const me = await linearClient.viewer;
if (me?.id) {
  await linearClient.userUpdate(me.id, { displayName: "My Updated Name" });
}
```

All mutations are exposed in the same way:
```typescript
const projects = await linearClient.projects();
const project = projects?.nodes?.[0];
if (project?.id) {
  await linearClient.projectArchive(project.id);
}
```

Mutations will often return a success boolean and the mutated entity:
```typescript
const commentPayload = await linearClient.commentCreate({ issueId: "some-issue-id" });
if (commentPayload?.success) {
  return commentPayload.comment;
} else {
  return new Error("Failed to create comment");
}
```

### Paginate

Connection models have helpers to fetch the next and previous pages of results:
```typescript
const issues = await linearClient.issues({ after: "some-issue-cursor", first: 10 });
const nextIssues = await issues?.fetchNext();
const prevIssues = await issues?.fetchPrevious();
```

Pagination info is exposed and can be passed to the query operations. This uses the [Relay Connection spec](https://relay.dev/graphql/connections.htm):
```typescript
const issues = await linearClient.issues();
const hasMoreIssues = issues?.pageInfo?.hasNextPage;
const issuesEndCursor = issues?.pageInfo?.endCursor;
const moreIssues = await linearClient.issues({ after: issuesEndCursor, first: 10 });
```

Results can be ordered using the `orderBy` optional variable:
```typescript
import { LinearDocument } from "@linear/client";

const issues = await linearClient.issues({ orderBy: LinearDocument.PaginationOrderBy.UpdatedAt });
```

### File Upload

Create a file upload URL, upload the file to external storage, and attach the file by asset URL:
```typescript
import { Fetch, Issue } from "@linear/client";
async function createIssueWithFile(title: string, file: File, uploadData: RequestInit): LinearFetch<Issue> {
  /** Fetch a storage URL to upload the file to */
  const uploadPayload = await linearClient.fileUpload(file.type, file.name, file.size);

  /** Upload the file to the storage URL using the authentication header */
  const authHeader = uploadPayload?.uploadFile?.headers?.[0];
  const uploadUrl = uploadPayload?.uploadFile?.uploadUrl;
  if (uploadUrl && authHeader?.key && authHeader?.value) {
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        [authHeader.key]: authHeader.value,
        "cache-control": "max-age=31536000",
      },
      ...uploadData,
    });

    /** Use the asset URL to attach the stored file */
    const assetUrl = uploadPayload?.uploadFile?.assetUrl;
    if (assetUrl) {
      const issuePayload = await linearClient.issueCreate({
        title,
        /** Use the asset URL in a markdown link */
        description: `Attached file: ![${assetUrl}](${encodeURI(assetUrl)})`,
        teamId: "team-id",
      });

      return issuePayload?.issue;
    }
  }
  return undefined;
}
```

### Error

Errors can be caught and interrogated by wrapping the operation in a try catch block:
```typescript
async function createComment(input: LinearDocument.CommentCreateInput): LinearFetch<Comment | UserError> {
  try {
    /** Try to create a comment */
    const commentPayload = await linearClient.commentCreate(input);
    /** Return it if available */
    return commentPayload?.comment;
  } catch (error) {
    /** The error has been parsed by Linear Client */
    throw error;
  }
}
```

Or by catching the error thrown from a calling function:
```typescript
async function archiveFirstIssue(): LinearFetch<ArchivePayload> {
  const me = await linearClient.viewer;
  const issues = await me?.assignedIssues();
  const firstIssue = issues?.nodes?.[0];

  if (firstIssue?.id) {
    const payload = await linearClient.issueArchive(firstIssue.id);
    return payload;
  } else {
    return undefined;
  }
}

archiveFirstIssue().catch(error => {
  throw error;
});
```

The parsed error type can be compared to determine the course of action:
```typescript
import { LinearError, LinearErrorType, InvalidInputLinearError } from '@linear/client'
import { UserError } from './custom-errors'

const input = { name: "Happy Team" };
createTeam(input).catch(error => {
  if (error instanceof InvalidInputLinearError) {
    /** If the mutation has failed due to an invalid user input return a custom user error */
    return new UserError(input, error);
  } else {
    /** Otherwise throw the error and handle in the calling function */
    throw error;
  }
});
```

Information about the `request` resulting in the error is attached if available:
```typescript
run().catch(error => {
  if (error instanceof LinearError) {
    console.error("Failed query:", error.query);
    console.error("With variables:", error.variables);
  }
  throw error;
});
```

Information about the `response` is attached if available:
```typescript
run().catch(error => {
  if (error instanceof LinearError) {
    console.error("Failed HTTP status:", error.status);
    console.error("Failed response data:", error.data);
  }
  throw error;
});
```

Any GraphQL `errors` are parsed and added to an array:
```typescript
run().catch(error => {
  if (error instanceof LinearError) {
    error.errors?.map(graphqlError => {
      console.log("Error message", graphqlError.message);
      console.log("LinearErrorType of this GraphQL error", graphqlError.type);
      console.log("Error due to user input", graphqlError.userError);
      console.log("Path through the GraphQL schema", graphqlError.path);
    });
  }
  throw error;
});
```

The `raw` error returned by the graphql-request client is still available:
```typescript
run().catch(error => {
  if (error instanceof LinearError) {
    console.log("The original error", error.raw);
  }
  throw error;
});
```

### Limitations

This functionality is currently under development and must be performed by the consumer:
- Search and filtering of collections

<br/>

## ☀️ API Reference

<br/>

The Linear Client is generated from the [Linear GraphQL schema]('./../packages/sdk/src/schema.graphql).

You can use any GraphQL client to introspect and explore the schema. Such as [Insomnia](https://insomnia.rest/) or [GraphQL Playground](https://github.com/prisma/graphql-playground).

Point the GraphQL client to the Linear production API endpoint:
```
https://api.linear.app/graphql
```

<br/>

## 🌵 OAuth Authentication

<br/>

Linear supports OAuth2 authentication, which is recommended if you're building applications to integrate with Linear.

**NOTE:** It is **highly recommended** you create a workspace for the purpose of managing the OAuth2 Application. As each admin user will have access.

1. **Create an OAuth2 application in Linear**

    Create a new [OAuth2 Application](https://linear.app/settings/api/applications/new)

    Configure the redirect callback URLs to your application

2. **Redirect user access requests to Linear**

    When authorizing a user to the Linear API, redirect to an authorization URL with correct parameters and scopes:
    
    ```
    GET https://linear.app/oauth/authorize
    ```

    **Parameters**

    - `client_id` (required) - Client ID provided when you create the OAuth2 Application
    - `redirect_uri` (required) - Redirect URI
    - `response_type=code` (required) - Expected response type
    - `scope` (required) - Comma separated list of scopes (listed below)
    - `state` (optional) - Prevents CSRF attacks and should always be supplied. Read more about it [here](https://auth0.com/docs/protocols/state-parameters)

    **Scopes**

    - `read` - (Default) Read access for the user's account. This scope will always be present.
    - `write` - Write access for the user's account.
    - `issues:create` - Special scope to only gain access in order to create new issues. If this is the main reason for your application, you should ask for this scope instead of `write`
    - `admin` - Full access to admin level endpoints. You should never ask for this permission unless it's absolutely needed

    **Example**
    ```
    GET https://linear.app/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URL&state=SECURE_RANDOM&scope=read

    GET https://linear.app/oauth/authorize?client_id=client1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fcallback&response_type=code&scope=read,write
    ```

3. **Handle the redirect URLs you specified in the OAuth2 Application**

    Once the user approves your application they will be redirected back to your application, with the OAuth authorization `code` in the URL params.

    Any `state` parameter you specified in step 2 will also be returned in the URL params and must match the value specified in step 2. If the values do not match, the request should not be trusted.

    **Example**
    ```
    GET https://example.com/oauth/callback?code=9a5190f637d8b1ad0ca92ab3ec4c0d033ad6c862&state=b1ad0ca92
    ```

4. **Exchange `code` for an access token**

    After receiving the `code`, you can exchange it for a Linear API access token:
    
    ```
    POST https://api.linear.app/oauth/token
    ```

    **Parameters**

    - `code` - (required) Authorization code from the previous step
    - `redirect_uri` - (required) Same redirect URI which you used in the previous step
    - `client_id` - (required) Application's client ID
    - `client_secret` - (required) Application's client secret
    - `grant_type=authorization_code` (required)

    **Response**

    After a successful request, a valid access token will be returned in the response:
    ```json
    {
      "access_token": "00a21d8b0c4e2375114e49c067dfb81eb0d2076f48354714cd5df984d87b67cc",
      "token_type": "Bearer",
      "expires_in": 315705599,
      "scope": [
        "read",
        "write"
      ]
    }
    ```

5. **Make an API request**

    Initialize the Linear Client with the access token:
    ```
    const client = new LinearClient({ accessToken: response.access_token })
    const me = await client.viewer
    ```

6. **Revoke an access token**

    To revoke a user's access to your application pass the access token as Bearer token in the authorization header (`Authorization: Bearer <ACCESS_TOKEN>`) or as the `access_token` form field:
    
    ```
    POST https://api.linear.app/oauth/revoke
    ```

    **Response**

    Expected HTTP status:

    - `200` - token was revoked
    - `400` - unable to revoke token (e.g. token was already revoked)
    - `401` - unable to authenticate with the token

<br/>

## 🌈 Find Help

<br/>

If you run into problems, have questions or suggestions:
- Join our customer Slack
- Send an email to hello@linear.app 

Both options are available through the user menu in [Linear](https://linear.app).

<br/>

## 🌊 Advanced

<br/>

The Linear Client wraps the [Linear SDK](./packages/sdk/src/_generated_sdk.ts), provides a [graphql-request](https://github.com/prisma-labs/graphql-request) client, and [parses errors](./packages/client/src/error.ts).

### Request Configuration

The graphql-request client can be configured by passing the `RequestInit` object to the Linear Client constructor:
```typescript
const linearClient = new LinearClient({ apiKey, headers: { "my-header": "value" } });
```

### Raw GraphQL Client

The graphql-request client is accessible through the Linear Client:
```typescript
const graphQLClient = linearClient.client;
graphQLClient.setHeader("my-header", "value");
```

### Raw GraphQL Queries

The Linear GraphQL API can be queried directly by passing a raw GraphQL query to the graphql-request client:
```typescript
const graphQLClient = linearClient.client;
const cycle = await graphQLClient.rawRequest(
  gql`
    query cycle($id: String!) {
      cycle(id: $id) {
        id
        name
        completedAt
      }
    }
  `,
  { id: "cycle-id" }
);
```

### Custom GraphQL Client

In order to use a custom GraphQL Client, the Linear SDK must be extended and provided with a request function:
```typescript
import { Fetch, LinearError, LinearSdk, Request, UserConnection } from "@linear/client";
import { DocumentNode, GraphQLClient, print } from "graphql";
import { CustomGraphqlClient } from "./graphql-client";

/** Create a custom client configured with the Linear API base url and API key */
const customGraphqlClient = new CustomGraphqlClient("https://api.linear.app/graphql", {
  headers: { Authorization: apiKey },
});

/** Create the custom request function */
const customLinearRequest: LinearRequest = <Response, Variables>(
  document: DocumentNode,
  variables?: Variables
) => {
  /** The request must take a GraphQL document and variables, then return a promise for the result */
  return customGraphqlClient.request<Response>(print(document), variables).catch(error => {
    /** Optionally catch and parse errors from the Linear API */
    throw new LinearError(error);
  });
};

/** Extend the Linear SDK to provide a request function using the custom client */
class CustomLinearClient extends LinearSdk {
  public constructor() {
    super(customLinearRequest);
  }
}

/** Create an instance of the custom client */
const customLinearClient = new CustomLinearClient();

/** Use the custom client as if it were the Linear Client */
async function getUsers(): LinearFetch<UserConnection> {
  const users = await customLinearClient.users();
  return users;
}
```

<br/>

## 🔥 Contribute

<br/>

The Linear Client uses custom [GraphQL Code Generator](https://graphql-code-generator.com/) plugins to produce a typed SDK for all operations and models exposed by the Linear production API.

### Get Started

```shell
# install dependencies
yarn

# build all packages
yarn build

# test all packages
yarn test

# update the schema from the production API
yarn schema
```

### Project Structure

This monorepo uses `yarn workspaces` and `lerna` to publish packages independently.

Generated code uses file prefix `_generated` and should never be manually updated.

```
packages
  client        - Linear Client wrapper, graphql-request and error parsing 
  common        - Common functions and logging
  import        - Import tooling for uploading from other systems
  sdk           - The Linear SDK generated from the Linear GraphQL schema
  codegen-doc   - GraphQL codegen plugin to generate GraphQL fragments and documents
  codegen-sdk   - GraphQL codegen plugin to generate Typescript SDK from fragments and documents
  codegen-test  - GraphQL codegen plugin to generate a jest test for the Typescript SDK
```

<br/>

## License

<br/>

Licensed under the [MIT License](./LICENSE).