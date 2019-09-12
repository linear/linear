import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { GraphQLError } from "graphql";
import { makeRemoteExecutableSchema } from "graphql-tools";
import fetch from "node-fetch";
import { Binding } from "./generated-binding";
import linearSchema from "./linearSchema";

export interface LinearLinkOptions {
  token: string;
}

export class LinearLink extends HttpLink {
  public constructor(options: LinearLinkOptions) {
    if (!options.token) {
      throw new Error("No Linear developer key provided. Create one here: https://linear.app/settings");
    }
    super({
      uri: "https://api.linear.app/graphql",
      headers: { Authorization: options.token },
      // tslint:disable-next-line: no-any
      fetch: fetch as any,
    });
  }
}

// https://github.com/graphql-binding/graphql-binding/issues/173#issuecomment-446366548
const errorLink = onError(args => {
  if (args.graphQLErrors && args.graphQLErrors.length === 1) {
    args.response!.errors = args.graphQLErrors.concat(new GraphQLError(""));
  }
});

export class Linear extends Binding {
  public constructor(options: LinearLinkOptions) {
    const schema = makeRemoteExecutableSchema({
      schema: linearSchema,
      link: errorLink.concat(new LinearLink(options)),
    });
    super({ schema });
  }
}

export interface BindingConstructor<T> {
  new (options: LinearLinkOptions): T;
}

export * from "./linearSchema";
export * from "./generated-binding";
