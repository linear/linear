/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import { createLinearClient } from "../index";

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

  const first = teams.nodes[0];
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

  const first = issues.nodes[0];
  expect(first).toBeDefined();

  const issue = await client.issue(first?.id ?? "");
  expectSuccess(issue, { id: expect.stringContaining("") });

  return issue;
}

/**
 * Assert success of the operation
 */
function expectSuccess<T>(response: T, data?: Partial<T>) {
  expect(response).toEqual(expect.objectContaining(data ?? {}));
}

/**
 * Assert failure of the operation
 */
async function expectError(shouldError: () => any, errorMessage: string) {
  try {
    await shouldError();
  } catch (error) {
    expect(error.message).toEqual(expect.stringContaining(errorMessage));
  }
}

if (process.env.E2E_API_KEY) {
  describe("end-to-end", () => {
    it("throw auth error", async () => {
      const client = createLinearClient({ apiKey: "fake api key" });

      expectError(() => client.viewer(), "authentication failed");
    });

    describe("queries", () => {
      it("query for the viewer", async () => {
        const viewer = await getClient().viewer();

        expectSuccess(viewer, { id: expect.stringContaining("") });
      });

      it("query for a team", async () => {
        await getSomeTeam();
      });

      it("query for fake team", async () => {
        expectError(() => getClient().team("not a real team id"), "Entity not found");
      });

      it("query for an issue", async () => {
        await getSomeIssue();
      });

      it("query for fake issue", async () => {
        expectError(() => getClient().issue("not a real issue id"), "Entity not found");
      });
    });

    describe("mutations", () => {
      it("create an issue, update and archive it", async () => {
        const client = getClient();
        const team = await getSomeTeam();

        /** Create issue */
        const createdInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
        const createdIssue = await client.issueCreate({ teamId: team.id ?? "", ...createdInput });
        expectSuccess(createdIssue, { success: true, issue: expect.objectContaining(createdInput) });

        /** Query for issue */
        const createdId = createdIssue.issue?.id ?? "";
        const issue = await client.issue(createdId);
        expectSuccess(issue, { id: createdId, ...createdInput, archivedAt: null });

        /** Update issue */
        const updatedInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
        const updatedIssue = await client.issueUpdate(updatedInput, createdId);
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
