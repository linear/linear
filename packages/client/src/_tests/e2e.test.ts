/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearClient } from "../index";
import { LinearErrorType } from "./../types";
import { startTestClient, stopTestClient } from "./test-client";

// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/2117523#2117523
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Assert failure of the operation
 */
async function expectError(shouldError: () => any, type: LinearErrorType, message: string) {
  try {
    await shouldError();
  } catch (error) {
    expect(error.type).toEqual(type);
    expect(error.message).toEqual(expect.stringContaining(message));
  }
}

describe("e2e", () => {
  /** Initialize Linear client variable */
  let linearClient: LinearClient;

  beforeAll(async () => {
    linearClient = await startTestClient();
  });

  afterAll(() => {
    stopTestClient();
  });

  /**
   * Return a client scoped to the first team found
   */
  async function getSomeTeam() {
    const teams = await linearClient.teams();
    const moreTeams = await teams?.fetchNext();

    const first = moreTeams?.nodes?.[0];
    expect(first).toBeDefined();

    const team = await linearClient.team(first?.id ?? "");
    expect(typeof team?.id).toBe("string");

    return team;
  }

  /**
   * Return a client scoped to the first issue found
   */
  async function getSomeIssue() {
    const issues = await linearClient.issues();

    const first = issues?.nodes?.[0];
    expect(first).toBeDefined();

    const issue = await linearClient.issue(first?.id ?? "");
    expect(typeof issue?.id).toBe("string");

    return issue;
  }

  it("throw auth error", async () => {
    const client = new LinearClient({ apiKey: "fake api key" });

    expectError(
      () => client.viewer,
      LinearErrorType.AuthenticationError,
      "Authentication failed - Authentication is required in order to run this query or mutation"
    );
  });

  describe("queries", () => {
    it("query for the viewer", async () => {
      const viewer = await linearClient.viewer;
      expect(typeof viewer?.id).toBe("string");
    });

    it("query for a team", async () => {
      await getSomeTeam();
    });

    it("query for fake team", async () => {
      expectError(
        () => linearClient.team("not a real team id"),
        LinearErrorType.InvalidInput,
        "Entity not found - Could not find referenced Team"
      );
    });

    it("query for an issue", async () => {
      await getSomeIssue();
    });

    it("query for fake issue", async () => {
      expectError(
        () => linearClient.issue("not a real issue id"),
        LinearErrorType.InvalidInput,
        "Entity not found - Could not find referenced Issue"
      );
    });
  });

  describe("mutations", () => {
    it("create an issue, update and archive it", async () => {
      const client = linearClient;
      const team = await getSomeTeam();

      /** Create issue */
      const createdInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
      const created = await client.issueCreate({ teamId: team?.id ?? "", ...createdInput });
      const createdIssue = await created?.issue;

      if (process.env.E2E) {
        expect(created?.success).toBe(true);
        expect(createdIssue).toEqual(expect.objectContaining(createdInput));
      }

      /** Query for issue */
      const createdId = createdIssue?.id ?? "";
      const issue = await client.issue(createdId);

      if (process.env.E2E) {
        expect(issue?.id).toBe(createdId);
        expect(issue?.archivedAt).toBeUndefined();
      }

      /** Update issue */
      const updatedInput = { title: `title ${uuid()}`, description: `description ${uuid()}` };
      const updated = await client.issueUpdate(createdId, updatedInput);
      const updatedIssue = await updated?.issue;

      if (process.env.E2E) {
        expect(updated?.success).toBe(true);
        expect(updatedIssue).toEqual(expect.objectContaining(updatedInput));
      }

      /** Archive issue */
      const archivedIssue = await client.issueArchive(createdId);
      if (process.env.E2E) {
        expect(archivedIssue?.success).toBe(true);
      }

      /** Confirm issue is archived */
      const noIssue = await client.issue(createdId);
      if (process.env.E2E) {
        expect(noIssue?.id).toBe(createdId);
        expect(typeof noIssue?.archivedAt).toBe("string");
      }
    });
  });
});
