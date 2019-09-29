/* tslint:disable:no-any */
import { GraphQLClient } from "graphql-request";
import { registerIssue } from "./models/issue";
import { registerLabel } from "./models/label";
import { registerTeam } from "./models/team";

interface LinearArgs {
  apiKey: string;
  url?: string;
  /**  Only intended to be used for testing */
  mockClient?: GraphQLClient;
}

export class Linear {
  public issue: ReturnType<typeof registerIssue>;
  public team: ReturnType<typeof registerTeam>;
  public label: ReturnType<typeof registerLabel>;

  public constructor({ apiKey, url = "https://api.linear.app/graphql", mockClient }: LinearArgs) {
    this.client =
      mockClient ||
      new GraphQLClient(url, {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      });
    this.issue = registerIssue(this);
    this.team = registerTeam(this);
    this.label = registerLabel(this);
  }

  public request<Return>(query: string): Promise<Return>;
  public request<Return, Variables>(query: string, variables: Variables): Promise<Return>;

  public request(query: string, variables?: any) {
    return this.client.request(query, variables);
  }

  private client: GraphQLClient;
}
