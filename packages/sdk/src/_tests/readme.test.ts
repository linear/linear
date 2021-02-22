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

  beforeAll(async () => {
    linearClient = await startClient();
  });

  afterAll(() => {
    stopClient();
  });

  async function createTeam(input: LinearDocument.TeamCreateInput) {
    linearClient.teamCreate(input);
  }

  async function run() {}

  class UserError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(a: any, b: any) {}
  }

  const CustomGraphqlClient = GraphQLClient;

  const apiKey = "YOUR_PERSONAL_API_KEY";

  describe("🦋 Your First Query", () => {
    describe("Query for your issues", () => {
      it("Using async await syntax", async () => {
        async function getMyIssues() {
          const me = await linearClient.viewer;
          const myIssues = await me?.assignedIssues();

          myIssues?.nodes?.map(issue => {
            console.log(`${me?.displayName} has issue: ${issue?.title}`);
          });

          return myIssues;
        }

        getMyIssues();
      });

      it("Or promises", async () => {
        linearClient.viewer.then(me => {
          return me?.assignedIssues()?.then(myIssues => {
            myIssues?.nodes?.map(issue => {
              console.log(`${me?.displayName} has issue: ${issue?.title}`);
            });

            return myIssues;
          });
        });
      });
    });
  });

  describe("Typescript", () => {
    it("All types are accessible through the Linear Client package. It is written in Typescript", async () => {
      const linearClient = new LinearClient({ apiKey });

      async function getCurrentUser(): LinearFetch<User> {
        return linearClient.viewer;
      }
    });
  });

  describe("Query", () => {
    it("Some models can be fetched from the Linear Client without any arguments", async () => {
      const me = await linearClient.viewer;
      const org = await linearClient.organization;
    });

    it("Other models are exposed as connections, and return a list of nodes", async () => {
      const issues = await linearClient.issues();
      const firstIssue = issues?.nodes?.[0];
    });

    it("All required variables are passed as the first arguments", async () => {
      const user = await linearClient.user("user-id");
      const team = await linearClient.team("team-id");
    });

    it("Any optional variables are passed into the last argument as an object", async () => {
      const fiftyProjects = await linearClient.projects({ first: 50 });
      const allComments = await linearClient.comments({ includeArchived: true });
    });

    it("Most models expose operations to fetch other models", async () => {
      const me = await linearClient.viewer;
      const myIssues = await me?.assignedIssues();
      const myFirstIssue = myIssues?.nodes?.[0];
      const myFirstIssueComments = await myFirstIssue?.comments();
      const myFirstIssueFirstComment = myFirstIssueComments?.nodes?.[0];
      const myFirstIssueFirstCommentUser = await myFirstIssueFirstComment?.user;
    });
  });

  describe("Mutate", () => {
    it("To create a model, call the Linear Client mutation and pass in the input object", async () => {
      const teams = await linearClient.teams();
      const team = teams?.nodes?.[0];
      if (team?.id) {
        await linearClient.issueCreate({ teamId: team.id, title: "My Created Issue" });
      }
    });

    it("To update a model, call the Linear Client mutation and pass in the required variables and input object", async () => {
      const me = await linearClient.viewer;
      if (me?.id) {
        await linearClient.userUpdate(me.id, { displayName: "My Updated Name" });
      }
    });

    it("All mutations are exposed in the same way", async () => {
      const projects = await linearClient.projects();
      const project = projects?.nodes?.[0];
      if (project?.id) {
        await linearClient.projectArchive(project.id);
      }
    });

    it("Mutations will often return a success boolean and the mutated entity", async () => {
      const commentPayload = await linearClient.commentCreate({ issueId: "some-issue-id" });
      if (commentPayload?.success) {
        return commentPayload.comment;
      } else {
        return new Error("Failed to create comment");
      }
    });
  });

  describe("Paginate", () => {
    it("Connection models have helpers to fetch the next and previous pages of results", async () => {
      const issues = await linearClient.issues({ after: "some-issue-cursor", first: 10 });
      const nextIssues = await issues?.fetchNext();
      const prevIssues = await issues?.fetchPrevious();
    });

    it("Pagination info is exposed and can be passed to the query operations. This uses the [Relay Connection spec](https://relay.dev/graphql/connections.htm)", async () => {
      const issues = await linearClient.issues();
      const hasMoreIssues = issues?.pageInfo?.hasNextPage;
      const issuesEndCursor = issues?.pageInfo?.endCursor;
      const moreIssues = await linearClient.issues({ after: issuesEndCursor, first: 10 });
    });

    it("Results can be ordered using the `orderBy` optional variable", async () => {
      const issues = await linearClient.issues({ orderBy: LinearDocument.PaginationOrderBy.UpdatedAt });
    });
  });

  describe("File Upload", () => {
    it("Create a file upload URL, upload the file to external storage, and attach the file by asset URL", async () => {
      async function createIssueWithFile(title: string, file: File, uploadData: RequestInit): LinearFetch<Issue> {
        /** Fetch a storage URL to upload the file to */
        const uploadPayload = await linearClient.fileUpload(file.type, file.name, file.size);

        /** Upload the file to the storage URL using the authentication header */
        const authHeader = uploadPayload?.uploadFile?.headers?.[0];
        const uploadUrl = uploadPayload?.uploadFile?.uploadUrl;
        if (uploadUrl && authHeader?.key && authHeader?.value) {
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              [authHeader.key]: authHeader.value,
              "cache-control": "max-age=31536000",
            },
            ...uploadData,
          });

          /** Use the asset URL to attach the stored file */
          const assetUrl = uploadPayload?.uploadFile?.assetUrl;
          if (assetUrl) {
            const issuePayload = await linearClient.issueCreate({
              title,
              /** Use the asset URL in a markdown link */
              description: `Attached file: ![${assetUrl}](${encodeURI(assetUrl)})`,
              teamId: "team-id",
            });

            return issuePayload?.issue;
          }
        }
        return undefined;
      }
    });
  });

  describe("Error", () => {
    it("Errors can be caught and interrogated by wrapping the operation in a try catch block", async () => {
      async function createComment(input: LinearDocument.CommentCreateInput): LinearFetch<Comment | UserError> {
        try {
          /** Try to create a comment */
          const commentPayload = await linearClient.commentCreate(input);
          /** Return it if available */
          return commentPayload?.comment;
        } catch (error) {
          /** The error has been parsed by Linear Client */
          throw error;
        }
      }
    });

    it("Or by catching the error thrown from a calling function", async () => {
      async function archiveFirstIssue(): LinearFetch<ArchivePayload> {
        const me = await linearClient.viewer;
        const issues = await me?.assignedIssues();
        const firstIssue = issues?.nodes?.[0];

        if (firstIssue?.id) {
          const payload = await linearClient.issueArchive(firstIssue.id);
          return payload;
        } else {
          return undefined;
        }
      }

      archiveFirstIssue().catch(error => {
        throw error;
      });
    });

    it("The parsed error type can be compared to determine the course of action", async () => {
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
    });

    it("Information about the `request` resulting in the error is attached if available", async () => {
      run().catch(error => {
        if (error instanceof LinearError) {
          console.error("Failed query:", error.query);
          console.error("With variables:", error.variables);
        }
        throw error;
      });
    });

    it("Information about the `response` is attached if available", async () => {
      run().catch(error => {
        if (error instanceof LinearError) {
          console.error("Failed HTTP status:", error.status);
          console.error("Failed response data:", error.data);
        }
        throw error;
      });
    });

    it("Any GraphQL `errors` are parsed and added to an array", async () => {
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
    });

    it("The `raw` error returned by the graphql-request client is still available", async () => {
      run().catch(error => {
        if (error instanceof LinearError) {
          console.log("The original error", error.raw);
        }
        throw error;
      });
    });
  });

  describe("🌊 Advanced", () => {
    it("Request Configuration", () => {
      const linearClient = new LinearClient({ apiKey, headers: { "my-header": "value" } });
    });

    it("Raw GraphQL Client", () => {
      const graphQLClient = linearClient.client;
      graphQLClient.setHeader("my-header", "value");
    });

    it("Raw GraphQL Queries", async () => {
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
    });

    it("Custom GraphQL Client", () => {
      /** Create a custom client configured with the Linear API base url and API key */
      const customGraphqlClient = new CustomGraphqlClient("https://api.linear.app/graphql", {
        headers: { Authorization: apiKey },
      });

      /** Create the custom request function */
      const customLinearRequest: LinearRequest = <Response, Variables>(
        document: DocumentNode,
        variables?: Variables
      ) => {
        /** The request must take a GraphQL document and variables, then return a promise for the result */
        return customGraphqlClient.request<Response>(print(document), variables).catch(error => {
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
    });
  });
});
