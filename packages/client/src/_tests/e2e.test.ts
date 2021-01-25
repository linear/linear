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
  const moreTeams = await teams?.fetchNext;

  const first = teams.nodes[0];
  expect(first).toBeDefined();

  const team = await client.team(first?.id ?? "");
  expect(typeof team?.id).toBe("string");

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
  expect(typeof issue?.id).toBe("string");

  return issue;
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

      expectError(() => client.viewer, "authentication failed");
    });

    describe("queries", () => {
      it("query for the viewer", async () => {
        const viewer = await getClient().viewer;
        expect(typeof viewer?.id).toBe("string");
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
<<<<<<< HEAD
        const createdIssue = await client.issueCreate({ teamId: team.id ?? "", ...createdInput });
        expectSuccess(createdIssue, { success: true, issue: expect.objectContaining(createdInput) });

        /** Query for issue */
        const createdId = createdIssue.issue?.id ?? "";
=======
        const created = await client.issueCreate({ teamId: team?.id ?? "", ...createdInput });
        expect(created?.success).toBe(true);
        const createdIssue = await created?.issue;
        expect(createdIssue).toEqual(expect.objectContaining(createdInput));

        /** Query for issue */
        const createdId = createdIssue?.id ?? "";
>>>>>>> Fix end to end test
        const issue = await client.issue(createdId);
        expect(issue?.id).toBe(createdId);
        expect(issue?.archivedAt).toBeUndefined();

        /** Update issue */
        const updatedInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
<<<<<<< HEAD
        const updatedIssue = await client.issueUpdate(updatedInput, createdId);
        expectSuccess(updatedIssue, { success: true, issue: expect.objectContaining(updatedInput) });
=======
        const updated = await client.issueUpdate(updatedInput, createdId);
        expect(updated?.success).toBe(true);
        const updatedIssue = await updated?.issue;
        expect(updatedIssue).toEqual(expect.objectContaining(updatedInput));
>>>>>>> Fix end to end test

        /** Archive issue */
        const archivedIssue = await client.issueArchive(createdId);
        expect(archivedIssue?.success).toBe(true);

        /** Confirm issue is archived */
        const noIssue = await client.issue(createdId);
        expect(noIssue?.id).toBe(createdId);
        expect(typeof noIssue?.archivedAt).toBe("string");
      });
    });
  });
}
