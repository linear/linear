# Linear GraphQL API

Linear's public API is build using GraphQL. It's the same API we use internally for developing our applications.

If you're new to GraphQL, Apollo has [resources for beginners](https://blog.apollographql.com/the-basics-of-graphql-in-5-links-9e1dc4cac055). [The official documentation](https://graphql.org/) is another good starting point.

## Endpoint

Linear's GraphQL endpoint is:

```
https://api.linear.app/graphql
```

It supports introspection so you can query the whole schema.

## Authentication

Right now we support personal API keys, which can be created in the [API settings](https://linear.app/settings/api). To authenticate your requests, you need to pass the newly created key as an `Authorization` header:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: SB2Tb3GaNezZlIAXRoid3f7enyYO5G643y4009vC" \
  --data '{ "query": "{ issues { id title } }" }' \
  https://api.linear.app/graphql
```

## Getting started

To make your first requests, it's recommended to use an API client which supports GraphQL. [Insomnia](https://insomnia.rest/) is a free HTTP client which supports GraphQL. [GraphQL Playground](https://github.com/prisma/graphql-playground) from Prisma is a dedicated GraphQL client which also has a desktop app.

Once you have your client installed, you can start making queries (read) and mutations (write) to the API.

As issues (and most other objects) are team based, you first need to get the ID of the team you want to interact with:

```graphql
query {
  teams {
    id
    name
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
```

To create a new issue, we'll need to a mutation:

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

## Support

If you ran into problems or have questions or suggestions, you can join our customer Slack or send us a not (hello@linear.app). Both options are available through the user menu in the Linear application.
