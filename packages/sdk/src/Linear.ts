/* tslint:disable:no-any */
import { GraphQLClient } from "graphql-request";
import { issue } from "./models/issue";
import { team } from "./models/team";
import { label } from "./models/label";

interface LinearArgs {
  apiKey: string;
  url?: string;
}

export class Linear {
  public issue: ReturnType<typeof issue>;
  public team: ReturnType<typeof team>;
  public label: ReturnType<typeof label>;

  public constructor({ apiKey, url = "https://api.linear.app/graphql" }: LinearArgs) {
    this.client = new GraphQLClient(url, {
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    });
    this.issue = issue(this);
    this.team = team(this);
    this.label = label(this);
  }

  public request<Return>(query: string): Promise<Return>;
  public request<Return, Variables>(query: string, variables: Variables): Promise<Return>;

  public request(query: string, variables?: any) {
    return this.client.request(query, variables);
  }

  private client: GraphQLClient;
}
