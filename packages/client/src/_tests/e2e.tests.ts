/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { createLinearClient, LinearResponse, LinearStatus } from "../index";

dotenv.config();

it("allow no E2E_API_KEY env var", () => undefined);

/**
 * Return a client using the E2E_API_KEY environment variable
 */
function getClient() {
  return createLinearClient({ apiKey: process.env.E2E_API_KEY });
}

/**
 * Return a client scoped to the first team found
 */
async function getSomeTeam() {
  const client = getClient();
  const teams = await client.teams();
  expect(teams.status).toEqual(LinearStatus.success);

  const first = teams.data?.nodes[0];
  expect(first).toBeDefined();

  const team = await client.team(first?.id ?? "");
  expectSuccess(team, { id: expect.stringContaining("") });

  return team;
}

/**
 * Return a client scoped to the first issue found
 */
async function getSomeIssue() {
  const client = getClient();
  const issues = await client.issues();
  expect(issues.status).toEqual(LinearStatus.success);

  const first = issues.data?.nodes[0];
  expect(first).toBeDefined();

  const issue = await client.issue(first?.id ?? "");
  expectSuccess(issue, { id: expect.stringContaining("") });

  return issue;
}

/**
 * Assert success of the operation
 */
function expectSuccess<T, V>(response: LinearResponse<T, V>, data?: Partial<T>) {
  expect(response.status).toEqual(LinearStatus.success);
  expect(response.statusCode).toEqual(200);
  expect(response.data).toEqual(expect.objectContaining(data ?? {}));
  expect(response.error).toBeUndefined();
  expect(response.errors).toBeUndefined();
  expect(response.extensions).toBeUndefined();
  expect(response.query).toBeUndefined();
  expect(response.variables).toBeUndefined();
}

/**
 * Assert failure of the operation
 */
function expectError<T, V>(
  response: LinearResponse<T, V>,
  {
    errorMessage,
    queryName,
    variables,
    extensions,
  }: { errorMessage: string; queryName: string; variables?: V; extensions?: any }
) {
  expect(response.status).toEqual(LinearStatus.error);
  expect(response.statusCode).toEqual(200);
  expect(response.data).toBeUndefined();
  expect(response.error?.message).toEqual(expect.stringContaining(errorMessage));
  expect(response.errors?.[0].message).toEqual(expect.stringContaining(errorMessage));
  expect(response.query).toEqual(expect.stringContaining(`query ${queryName}`));
  expect(response.extensions).toEqual(expect.objectContaining(extensions ?? {}));
  expect(response.variables).toEqual(expect.objectContaining(variables ?? {}));
}

if (process.env.E2E_API_KEY) {
  describe("end-to-end", () => {
    it("throw auth error", async () => {
      const client = createLinearClient({ apiKey: "fake api key" });
      const viewer = await client.viewer();

      expectError(viewer, {
        errorMessage: "authentication failed",
        queryName: "viewer",
      });
    });

    describe("queries", () => {
      it("query for the viewer", async () => {
        const cleint = getClient();
        const viewer = await cleint.viewer();
        expectSuccess(viewer, { id: expect.stringContaining("") });
      });

      it("query for a team", async () => {
        await getSomeTeam();
      });

      it("query for fake team", async () => {
        const client = getClient();
        const team = await client.team("not a real team id");
        expectError(team, {
          errorMessage: "Entity not found",
          queryName: "team",
          variables: { id: "not a real team id" },
        });
      });

      it("query for an issue", async () => {
        await getSomeIssue();
      });

      it("query for fake issue", async () => {
        const client = getClient();
        const issue = await client.issue("not a real issue id");

        expectError(issue, {
          errorMessage: "Entity not found",
          queryName: "issue",
          variables: { id: "not a real issue id" },
        });
      });

      it("query for an issue assignee", async () => {
        const issue = await getSomeIssue();
        const assignee = await issue.assignee();
        expectSuccess(assignee);
      });
    });

    describe("mutations", () => {
      it("create an issue, update and archive it", async () => {
        const client = getClient();
        const team = await getSomeTeam();

        /** Create issue */
        const createdInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
        const createdIssue = await client.issueCreate({ teamId: team.data?.id ?? "", ...createdInput });
        expectSuccess(createdIssue, { success: true, issue: expect.objectContaining(createdInput) });

        /** Query for issue */
        const createdId = createdIssue.data?.issue?.id ?? "";
        const issue = await client.issue(createdId);
        expectSuccess(issue, { id: createdId, ...createdInput, archivedAt: null });

        /** Update issue */
        const updatedInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
        const updatedIssue = await client.issueUpdate(createdId, { input: updatedInput });
        expectSuccess(updatedIssue, { success: true, issue: expect.objectContaining(updatedInput) });

        /** Archive issue */
        const archivedIssue = await client.issueArchive(createdId);
        expectSuccess(archivedIssue, { success: true });

        /** Confirm issue is archived */
        const noIssue = await client.issue(createdId);
        expectSuccess(noIssue, { id: createdId, ...updatedInput, archivedAt: expect.stringContaining("") });
      });
    });
  });
}
