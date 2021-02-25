# Linear GraphQL API

Linear's public API is built using GraphQL. It's the same API we use internally for developing our applications.

If you're new to GraphQL, Apollo has [resources for beginners](https://blog.apollographql.com/the-basics-of-graphql-in-5-links-9e1dc4cac055). [The official documentation](https://graphql.org/) is another good starting point.

## Endpoint

Linear's GraphQL endpoint is:

```
https://api.linear.app/graphql
```

It supports introspection so you can query the whole schema.

## Authentication

Right now we support personal API keys and OAuth2 authentication.

### OAuth2

If you're building an application for others to use, we recommend you use [OAuth2 authentication](OAuth2.md).

### Personal API keys

For personal scripts API keys are the easiest way to access the API. They can be created in the [API settings](https://linear.app/settings/api). To authenticate your requests, you need to pass the newly created key as an `Authorization` header:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: <Replace this with your API Key>" \
  --data '{ "query": "{ issues { nodes { id title } } }" }' \
  https://api.linear.app/graphql
```

## Getting started

To make your first requests, it's recommended to use an API client that supports GraphQL. [Insomnia](https://insomnia.rest/) is a free HTTP client that supports GraphQL. [GraphQL Playground](https://github.com/prisma/graphql-playground) from Prisma is a dedicated GraphQL client that also has a desktop app.

Once you have your client installed, you can start making queries (read) and mutations (write) to the API.

To get information about the authenticated user, you can use the `viewer` query:

```graphql
query {
  viewer {
    id
    name
    email
  }
}
```

As issues (and most other objects) are team based, you first need to get the ID of the team you want to interact with:

```graphql
query {
  teams {
    nodes {
      id
      name
    }
  }
}
```

Once you have found the correct team, you can get the issues for that team. Lets make a request with also some other issue metadata:

```graphql
query {
  team(id: "9cfb482a-81e3-4154-b5b9-2c805e70a02d") {
    id
    name

    issues {
      nodes {
        id
        title
        description
        assignee {
          id
          name
        }
        createdAt
        archivedAt
      }
    }
  }
}
```

We can also get an issue by id:

```graphql
query {
  issue(id: "BLA-123") {
    id
    title
    description
  }
}
```

To create a new issue, we'll need to create a mutation:

```graphql
mutation {
  issueCreate(
    input: {
      title: "New exception"
      description: "More detailed error report in markdown"
      teamId: "9cfb482a-81e3-4154-b5b9-2c805e70a02d"
    }
  ) {
    success
    issue {
      id
      title
    }
  }
}
```

This mutation will create a new issue and return its `id` and `title` if the call was successful (`success: true`).

To get the full list of available queries and mutations, introspect the API schema using your favorite GraphQL client.

## Pagination

All list responses from queries return paginated results. We implement Relay style cursor-based pagination model with `first`/`after` and `last`/`before` pagination arguments. To simply query get first 10 issues for your organization:

```graphql
query {
  issues(first: 10) {
    edges {
      node {
        id
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

To query the next 10, simply pass the value of `pageInfo.endCursor` as `after` parameter for the next request. You can do this as long as `pageInfo.hasNextPage` return true and you'll paginate through all the values in the collection.

The first 50 results are returned by default without query arguments. Pagination also supports simpler syntax where instead of edges you can directly get all the nodes similar to GitHub's GraphQL API:

```graphql
query {
  teams {
    nodes {
      id
      name
    }
  }
}
```

By default results are ordered by `createdAt` field. To get most recently updated resources, you can alternatively order by `updatedAt` field:

```graphql
query {
  issues(orderBy: updatedAt) {
    nodes {
      id
      identifier
      title
      createdAt
      updatedAt
    }
  }
}
```

## Other Examples

### Queries

There are many ways to fetch issues. One commmon use case is to get all the issues assigned to a user.

First let's find our user's id:

```graphql
query {
  users {
    nodes {
      name
      id
    }
  }
}
```

Now we can use the `assignedIssues` field on User:

```graphql
query {
  user(id: "USERID") {
    id
    name
    assignedIssues {
      nodes {
        id
        title
      }
    }
  }
}
```

We can do the same thing with `workflowStates` which represent status fields for teams:

```graphql
query {
  workflowStates {
    nodes{
      id
      name
    }
  }
}
```

```graphql
query {
  workflowState(id: "WORKFLOW_ID") {
    issues {
      nodes {
        title
      }
    }
  }
}
```

### Mutations

A common use case is to update an issue. To do this we can use the `issueUpdate` mutation, using the input field to include whatever it is we want to change.

```graphql
mutation {
  issueUpdate(
    id: "BLA-123",
    input: {
      title: "New Issue Title"
      stateId: "NEW-STATE-ID",
    }
  ) {
    success
    issue {
      id
      title
      state {
        id
        name
      }
    }
  }
}
```

### Archived resources

Archived resources are hidden by default from the paginated responses. They can be included by passing optional `includeArchived: true` as a query parameter for pagination.

## Support

If you run into problems or have questions or suggestions, you can join our customer Slack or send us a note (hello@linear.app). Both options are available through the user menu in the Linear application.
