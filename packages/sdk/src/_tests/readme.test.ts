/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
import { DocumentNode, print } from "graphql";
import { gql, GraphQLClient } from "graphql-request";
import { parseLinearError } from "../error";
import {
  ArchivePayload,
  InvalidInputLinearError,
  Issue,
  LinearClient,
  LinearDocument,
  LinearError,
  LinearFetch,
  LinearRequest,
  LinearSdk,
  User,
  UserConnection,
} from "../index";
import { startClient, stopClient } from "./test-client";

describe("readme.md", () => {
  /** Initialize Linear client variable */
  let linearClient: LinearClient;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  beforeAll(async () => {
    linearClient = await startClient();
  });

  afterAll(() => {
    stopClient();
  });

  async function createTeam(input: LinearDocument.TeamCreateInput) {
    linearClient.createTeam(input);
  }

  async function run() {}

  class UserError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(a: any, b: any) {}
  }

  const CustomGraphqlClient = GraphQLClient;

  const apiKey = "YOUR_PERSONAL_API_KEY";

  describe("First Query", () => {
    describe("Query for your issues", () => {
      it("Using async await syntax", async () => {
        /** CODE_SECTION:1_1:START */
        async function getMyIssues() {
          const me = await linearClient.viewer;
          const myIssues = await me.assignedIssues();

          if (myIssues.nodes.length) {
            myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}`));
          } else {
            console.log(`${me.displayName} has no issues`);
          }
        }

        getMyIssues();
        /** CODE_SECTION:1_1:END */
      });

      it("Or promises", async () => {
        /** CODE_SECTION:1_2:START */
        linearClient.viewer.then(me => {
          return me.assignedIssues().then(myIssues => {
            if (myIssues.nodes.length) {
              myIssues.nodes.map(issue => console.log(`${me.displayName} has issue: ${issue.title}`));
            } else {
              console.log(`${me.displayName} has no issues`);
            }
          });
        });
        /** CODE_SECTION:1_2:END */
      });
    });
  });

  describe("Typescript", () => {
    it("All types are accessible through the Linear Client package. It is written in Typescript", async () => {
      /** CODE_SECTION:2_1:START */
      // CODE_SECTION:INCLUDE import { LinearClient, LinearFetch, User } from "@linear/sdk";

      const linearClient = new LinearClient({ apiKey });

      async function getCurrentUser(): LinearFetch<User> {
        return linearClient.viewer;
      }
      /** CODE_SECTION:2_1:END */
    });
  });

  describe("Query", () => {
    it("Some models can be fetched from the Linear Client without any arguments", async () => {
      /** CODE_SECTION:3_1:START */
      const me = await linearClient.viewer;
      const org = await linearClient.organization;
      /** CODE_SECTION:3_1:END */
    });

    it("Other models are exposed as connections, and return a list of nodes", async () => {
      /** CODE_SECTION:3_2:START */
      const issues = await linearClient.issues();
      const firstIssue = issues.nodes[0];
      /** CODE_SECTION:3_2:END */
    });

    it("All required variables are passed as the first arguments", async () => {
      /** CODE_SECTION:3_3:START */
      const user = await linearClient.user("user-id");
      const team = await linearClient.team("team-id");
      /** CODE_SECTION:3_3:END */
    });

    it("Any optional variables are passed into the last argument as an object", async () => {
      /** CODE_SECTION:3_4:START */
      const fiftyProjects = await linearClient.projects({ first: 50 });
      const allComments = await linearClient.comments({ includeArchived: true });
      /** CODE_SECTION:3_4:END */
    });

    it("Most models expose operations to fetch other models", async () => {
      /** CODE_SECTION:3_5:START */
      const me = await linearClient.viewer;
      const myIssues = await me.assignedIssues();
      const myFirstIssue = myIssues.nodes[0];
      const myFirstIssueComments = await myFirstIssue.comments();
      const myFirstIssueFirstComment = myFirstIssueComments.nodes[0];
      const myFirstIssueFirstCommentUser = await myFirstIssueFirstComment.user;
      /** CODE_SECTION:3_5:END */
    });
  });

  describe("Mutate", () => {
    it("To create a model, call the Linear Client mutation and pass in the input object", async () => {
      /** CODE_SECTION:4_1:START */
      const teams = await linearClient.teams();
      const team = teams.nodes[0];
      if (team.id) {
        await linearClient.createIssue({ teamId: team.id, title: "My Created Issue" });
      }
      /** CODE_SECTION:4_1:END */
    });

    it("To update a model, call the Linear Client mutation and pass in the required variables and input object", async () => {
      /** CODE_SECTION:4_2:START */
      const me = await linearClient.viewer;
      if (me.id) {
        await linearClient.updateUser(me.id, { displayName: "Alice" });
      }
      /** CODE_SECTION:4_2:END */
    });

    it("Or call the mutation from the model", async () => {
      /** CODE_SECTION:4_3:START */
      const me = await linearClient.viewer;
      await me.update({ displayName: "Alice" });
      /** CODE_SECTION:4_3:END */
    });

    it("All mutations are exposed in the same way", async () => {
      /** CODE_SECTION:4_4:START */
      const projects = await linearClient.projects();
      const project = projects.nodes[0];
      if (project.id) {
        await linearClient.archiveProject(project.id);
        await project.archive();
      }
      /** CODE_SECTION:4_4:END */
    });

    it("Mutations will often return a success boolean and the mutated entity", async () => {
      /** CODE_SECTION:4_5:START */
      const commentPayload = await linearClient.createComment({ issueId: "some-issue-id" });
      if (commentPayload.success) {
        return commentPayload.comment;
      } else {
        return new Error("Failed to create comment");
      }
      /** CODE_SECTION:4_5:END */
    });
  });

  describe("Paginate", () => {
    it("Connection models have helpers to fetch the next and previous pages of results", async () => {
      /** CODE_SECTION:5_1:START */
      const issues = await linearClient.issues({ after: "some-issue-cursor", first: 10 });
      const nextIssues = await issues.fetchNext();
      const prevIssues = await issues.fetchPrevious();
      /** CODE_SECTION:5_1:END */
    });

    it("Pagination info is exposed and can be passed to the query operations. This uses the [Relay Connection spec](https://relay.dev/graphql/connections.htm)", async () => {
      /** CODE_SECTION:5_2:START */
      const issues = await linearClient.issues();
      const hasMoreIssues = issues.pageInfo.hasNextPage;
      const issuesEndCursor = issues.pageInfo.endCursor;
      const moreIssues = await linearClient.issues({ after: issuesEndCursor, first: 10 });
      /** CODE_SECTION:5_2:END */
    });

    it("Results can be ordered using the `orderBy` optional variable", async () => {
      /** CODE_SECTION:5_3:START */
      // CODE_SECTION:INCLUDE import { LinearDocument } from "@linear/sdk";

      const issues = await linearClient.issues({ orderBy: LinearDocument.PaginationOrderBy.UpdatedAt });
      /** CODE_SECTION:5_3:END */
    });
  });

  describe("File Upload", () => {
    it("Create a file upload URL, upload the file to external storage, and attach the file by asset URL", async () => {
      /** CODE_SECTION:6_1:START */
      // CODE_SECTION:INCLUDE import { Issue, LinearFetch } from "@linear/sdk";

      async function createIssueWithFile(
        title: string,
        file: File,
        uploadData: RequestInit
      ): LinearFetch<Issue | undefined> {
        /** Fetch a storage URL to upload the file to */
        const uploadPayload = await linearClient.fileUpload(file.type, file.name, file.size);

        /** Upload the file to the storage URL using the authentication header */
        const authHeader = uploadPayload.uploadFile?.headers[0];
        const uploadUrl = uploadPayload.uploadFile?.uploadUrl;
        if (uploadUrl && authHeader?.key && authHeader?.value) {
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              [authHeader?.key]: authHeader?.value,
              "cache-control": "max-age=31536000",
            },
            ...uploadData,
          });

          /** Use the asset URL to attach the stored file */
          const assetUrl = uploadPayload.uploadFile?.assetUrl;
          if (assetUrl) {
            const issuePayload = await linearClient.createIssue({
              title,
              /** Use the asset URL in a markdown link */
              description: `Attached file: ![${assetUrl}](${encodeURI(assetUrl)})`,
              teamId: "team-id",
            });

            return issuePayload.issue;
          }
        }
        return undefined;
      }
      /** CODE_SECTION:6_1:END */
    });
  });

  describe("Error", () => {
    it("Errors can be caught and interrogated by wrapping the operation in a try catch block", async () => {
      /** CODE_SECTION:7_1:START */
      async function createComment(
        input: LinearDocument.CommentCreateInput
      ): LinearFetch<Comment | undefined | UserError> {
        try {
          /** Try to create a comment */
          const commentPayload = await linearClient.createComment(input);
          /** Return it if available */
          return commentPayload.comment;
        } catch (error) {
          /** The error has been parsed by Linear Client */
          throw error;
        }
      }
      /** CODE_SECTION:7_1:END */
    });

    it("Or by catching the error thrown from a calling function", async () => {
      /** CODE_SECTION:7_2:START */
      async function archiveFirstIssue(): LinearFetch<ArchivePayload | undefined> {
        const me = await linearClient.viewer;
        const issues = await me.assignedIssues();
        const firstIssue = issues.nodes[0];

        if (firstIssue.id) {
          const payload = await linearClient.archiveIssue(firstIssue.id);
          return payload;
        } else {
          return undefined;
        }
      }

      await archiveFirstIssue().catch(error => {
        throw error;
      });
      /** CODE_SECTION:7_2:END */
    });

    it("The parsed error type can be compared to determine the course of action", async () => {
      /** CODE_SECTION:7_3:START */
      // CODE_SECTION:INCLUDE import { InvalidInputLinearError, LinearError, LinearErrorType } from '@linear/sdk'
      // CODE_SECTION:INCLUDE import { UserError } from './custom-errors'

      const input = { name: "Happy Team" };
      createTeam(input).catch(error => {
        if (error instanceof InvalidInputLinearError) {
          /** If the mutation has failed due to an invalid user input return a custom user error */
          return new UserError(input, error);
        } else {
          /** Otherwise throw the error and handle in the calling function */
          throw error;
        }
      });
      /** CODE_SECTION:7_3:END */
    });

    it("Information about the `request` resulting in the error is attached if available", async () => {
      /** CODE_SECTION:7_4:START */
      run().catch(error => {
        if (error instanceof LinearError) {
          console.error("Failed query:", error.query);
          console.error("With variables:", error.variables);
        }
        throw error;
      });
      /** CODE_SECTION:7_4:END */
    });

    it("Information about the `response` is attached if available", async () => {
      /** CODE_SECTION:7_5:START */
      run().catch(error => {
        if (error instanceof LinearError) {
          console.error("Failed HTTP status:", error.status);
          console.error("Failed response data:", error.data);
        }
        throw error;
      });
      /** CODE_SECTION:7_5:END */
    });

    it("Any GraphQL `errors` are parsed and added to an array", async () => {
      /** CODE_SECTION:7_6:START */
      run().catch(error => {
        if (error instanceof LinearError) {
          error.errors?.map(graphqlError => {
            console.log("Error message", graphqlError.message);
            console.log("LinearErrorType of this GraphQL error", graphqlError.type);
            console.log("Error due to user input", graphqlError.userError);
            console.log("Path through the GraphQL schema", graphqlError.path);
          });
        }
        throw error;
      });
      /** CODE_SECTION:7_6:END */
    });

    it("The `raw` error returned by the LinearGraphQLClient is still available", async () => {
      /** CODE_SECTION:7_7:START */
      run().catch(error => {
        if (error instanceof LinearError) {
          console.log("The original error", error.raw);
        }
        throw error;
      });
      /** CODE_SECTION:7_7:END */
    });
  });

  describe("🌊 Advanced", () => {
    it("Request Configuration", () => {
      /** CODE_SECTION:8_1:START */
      const linearClient = new LinearClient({ apiKey, headers: { "my-header": "value" } });
      /** CODE_SECTION:8_1:END */
    });

    it("Raw GraphQL Client", () => {
      /** CODE_SECTION:8_2:START */
      const graphQLClient = linearClient.client;
      graphQLClient.setHeader("my-header", "value");
      /** CODE_SECTION:8_2:END */
    });

    it("Raw GraphQL Queries", async () => {
      /** CODE_SECTION:8_3:START */
      const graphQLClient = linearClient.client;
      const cycle = await graphQLClient.rawRequest(
        gql`
          query cycle($id: String!) {
            cycle(id: $id) {
              id
              name
              completedAt
            }
          }
        `,
        { id: "cycle-id" }
      );
      /** CODE_SECTION:8_3:END */
    });

    it("Custom GraphQL Client", () => {
      /** CODE_SECTION:8_4:START */
      // CODE_SECTION:INCLUDE import { LinearError, LinearFetch, LinearRequest, LinearSdk, parseLinearError, UserConnection } from "@linear/sdk";
      // CODE_SECTION:INCLUDE import { DocumentNode, GraphQLClient, print } from "graphql";
      // CODE_SECTION:INCLUDE import { CustomGraphqlClient } from "./graphql-client";

      /** Create a custom client configured with the Linear API base url and API key */
      const customGraphqlClient = new CustomGraphqlClient("https://api.linear.app/graphql", {
        headers: { Authorization: apiKey },
      });

      /** Create the custom request function */
      const customLinearRequest: LinearRequest = <Data, Variables>(document: DocumentNode, variables?: Variables) => {
        /** The request must take a GraphQL document and variables, then return a promise for the result */
        return customGraphqlClient.request<Data, Variables>(print(document), variables).catch(error => {
          /** Optionally catch and parse errors from the Linear API */
          throw parseLinearError(error);
        });
      };

      /** Extend the Linear SDK to provide a request function using the custom client */
      class CustomLinearClient extends LinearSdk {
        public constructor() {
          super(customLinearRequest);
        }
      }

      /** Create an instance of the custom client */
      const customLinearClient = new CustomLinearClient();

      /** Use the custom client as if it were the Linear Client */
      async function getUsers(): LinearFetch<UserConnection> {
        const users = await customLinearClient.users();
        return users;
      }
      /** CODE_SECTION:8_4:END */
    });
  });
});
