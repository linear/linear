import { Binding, BindingInstance } from "./generated-binding";
import { HttpLink } from "apollo-link-http";
import * as fetch from "isomorphic-fetch";
import { makeRemoteExecutableSchema } from "graphql-tools";
import linearSchema from "./linearSchema";

export interface LinearLinkOptions {
  token: string;
}

export class LinearLink extends HttpLink {
  constructor(options: LinearLinkOptions) {
    if (!options.token) {
      throw new Error(
        "No Linear developer key provided. Create one here: https://linear.app/settings"
      );
    }
    super({
      uri: "https://api.linear.app/graphql",
      headers: { Authorization: `Bearer ${options.token}` },
      fetch
    });
  }
}

class LinearBinding extends Binding {
  constructor(options: LinearLinkOptions) {
    const schema = makeRemoteExecutableSchema({
      schema: linearSchema,
      link: new LinearLink(options)
    });
    super({ schema });
  }
}

export interface BindingConstructor<T> {
  new (options: LinearLinkOptions): T;
}

export const Linear = LinearBinding as BindingConstructor<BindingInstance>;
