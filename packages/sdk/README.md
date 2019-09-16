# @linear/sdk

Node library for querying Linear's API and creating new issues and tasks. It's a light wrapper around Linear's GraphQL API and ships with Typescript types out of the box.

## Usage

```
yarn install @linear/sdk
```

```js
import { Linear } from "@linear/sdk";

const linear = new Linear({
  apiKey: "<your developer key>",
});

const issue = await linear.issue.get({ key: "LNR-123" });
```

## Documentation

- **[API reference](https://github.com/linearapp/linear-node-sdk/blob/master/schema.md)**

## License

[MIT](https://github.com/linearapp/linear-node-sdk/blob/master/LICENSE.md)
