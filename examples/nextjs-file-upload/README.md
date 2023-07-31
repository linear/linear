# Upload a file to Linear with Next.js

This example shows how to upload a file to Linear using the Linear TypeScript SDK and Next.js API Routes. To run this example, you'll need a Linear account and a Linear API key. You can create an API key from your personal [Linear settings](https://linear.app/settings/api). Learn more about authentication in the [Linear Developer documentation](https://developers.linear.app/docs/sdk/getting-started#2.-create-a-linear-client).

> **Note**
> This example is part of a guide: ["How to upload a file to Linear"](https://linear.app/developers/nextjs-file-upload).

## Run the example

Run the following commands to clone this example locally, install the dependencies, and run the development server:

```shell
# Clone the example
git clone https://github.com/linear/linear/examples/nextjs-file-upload
cd nextjs-file-upload

# Install dependencies
yarn

# Start the development server
yarn dev
```

Then rename `.env.local.example` to `.env.local` and add your API key:

```
# Rename .env.local.example → .env.local
LINEAR_API_KEY="YOUR_API_KEY"
```

Visit `http://localhost:3000` to see the running example.
