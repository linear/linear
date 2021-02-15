/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fetch from "node-fetch";

const GITHUB_API = "https://api.github.com/graphql";

export const githubClient = (apiKey: string) => {
  return async (query: string, variables?: { [key: string]: any }) => {
    const res = await fetch(GITHUB_API, {
      method: "POST",
      headers: {
        authorization: `token ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await res.json();
    return data.data;
  };
};
