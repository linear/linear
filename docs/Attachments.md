# [Alpha] Issue Attachments

Issue attachments allow you to link external resources to issues and display them inside Linear similarly to GitHub Pull Requests. They are designed API developers in mind and we also use them for upcoming integrations inside Linear.

Example use cases:

- Customer support software where an agent can create a Linear issue
- Release bot that attached release version to an issue

Unique URLs are a core concept with attachments. They enable building stateless applications and integrations which interact with Linear's API. _Attachment URL is used as idempotent value_ so if you will try to re-create an attachments with the same URL, the original attachment is updated instead. This enables simple scripts which update the attachment content without storing the attachment ID. _You can also query an attachment, and the associated issue, by its URL_. This makes creating links to Linear issues from external application easy and again you don't need to track the attachment ID.

It's recommended to create attachments through Linear's OAuth authentication. Then the application icon is used for the attachment. For API key auth, a placeholder icon is used instead for now.

Attachments also support key-value metadata. Values can be any string or number and you can store information there related to your integration. Right now metadata is only exposed through the API but we're also considering on exposing it in the UI.

**Create an attachment:**

```graphql
mutation{
  attachmentCreate(input:{
    issueId: "590a1127-f98b-49fc-ba74-2df8751c089e"
    title: "Exception"
    subtitle: "Open"
    url: "http://exception.com/123"
    metadata: {exceptionId: "exc-123"}
  }){
    success
    attachment{
      id
    }
  }
}
```

**Update an attachment with URL:**

```graphql
mutation{
  attachmentUpdate(id: "http://exception.com/123", input: {
    title: "Exception"
    subtitle: "Resolved"
    metadata: {exceptionId: "exc-123"}
  }){
    success
    attachment{
      id
    }
  }
}
```

**Query an attachment with an URL:**

```graphql
query {
  attachment(id: "http://exception.com/123") {
    id
    issue {
      id
      identifier
      title
    }
  }
}
```


## TODO

- [ ] Webhooks for attachment updates