# Upload a file to Linear with Next.js

This example shows how to upload a file to Linear using the Linear TypeScript SDK and Node.js. It uses [Next.js](https://nextjs.org/) to render a simple form with a file input. When the form is submitted, the file is uploaded to Linear via a Next.js API Route and the Linear-hosted URL is returned.

> **Note**
> While this example uses Next.js, this approach can be used with any Node.js backend.

To run this example, you'll need a Linear account and a Linear API key. You can create an API key from your personal [Linear settings](https://linear.app/settings/account/security). Learn more about authentication in the [Linear Developer documentation](https://developers.linear.app/docs/sdk/getting-started#2.-create-a-linear-client).

> **Note**
> This example is part of a guide: ["How to upload a file to Linear"](https://developers.linear.app/guides/how-to-upload-a-file-to-linear).

## Run the example

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) to bootstrap the example:

```shell
yarn create next-app --example https://github.com/linear/linear/tree/master/examples/nextjs-file-upload nextjs-file-upload
```

Then rename `.env.local.example` to `.env.local` and add your API key:

```
# Rename .env.local.example → .env.local
LINEAR_API_KEY="YOUR_API_KEY"
```

Finally, `cd` into the directory and run the Next.js development server:

```shell
cd nextjs-file-upload
yarn dev
```

Visit [`http://localhost:3000`](http://localhost:3000) to see the running example.
