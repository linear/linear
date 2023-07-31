# Upload a file to Linear with Next.js

This example shows how to upload a file to Linear using the Linear TypeScript SDK and Next.js API Routes. To run this example, you'll need a Linear account and a Linear API key. You can create an API key from your personal [Linear settings](https://linear.app/settings/api). Learn more about authentication in the [Linear Developer documentation](https://developers.linear.app/docs/sdk/getting-started#2.-create-a-linear-client).

> **Note**
> This example is part of a guide: ["How to upload a file to Linear"](https://developers.linear.app/guides/how-to-upload-a-file-to-linear).

## Run the example

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) to bootstrap the example:

```shell
yarn create next-app --example https://github.com/linear/linear/examples/nextjs-file-upload nextjs-file-upload
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
