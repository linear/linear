/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";

const HEIGHT_API = "https://api.height.app";

export const heightClient = (apiKey: string) => {
  return async (query: string, variables?: { [key: string]: any }) => {
    if (variables) {
      query += `?${new URLSearchParams(variables).toString()}`;
    }

    const res = await fetch(`${HEIGHT_API}${query}`, {
      method: "GET",
      headers: {
        authorization: `api-key ${apiKey}`,
      },
    });

    const data = await res.json();
    return data;
  };
};
