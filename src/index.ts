import { Binding, BindingInstance } from "./generated-binding";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import * as fetch from "isomorphic-fetch";
import { makeRemoteExecutableSchema } from "graphql-tools";
import linearSchema from "./linearSchema";
import { GraphQLError } from "graphql";

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
      headers: { Authorization: options.token },
      fetch
    });
  }
}

// https://github.com/graphql-binding/graphql-binding/issues/173#issuecomment-446366548
const errorLink = onError(args => {
  if (args.graphQLErrors && args.graphQLErrors.length === 1) {
    args.response.errors = args.graphQLErrors.concat(new GraphQLError(""));
  }
});

class LinearBinding extends Binding {
  constructor(options: LinearLinkOptions) {
    const schema = makeRemoteExecutableSchema({
      schema: linearSchema,
      link: errorLink.concat(new LinearLink(options))
    });
    super({ schema });
  }
}

export interface BindingConstructor<T> {
  new (options: LinearLinkOptions): T;
}

export const Linear = LinearBinding as BindingConstructor<BindingInstance>;
