import * as es from "@linear/sdk";
import { LinearErrorType } from "../types";
import { startClient, stopClient } from "./test-client";

const bundles = {
  // umd: require("../../dist/index-umd.min.js"),
  cjs: require("../../dist/index-cjs.min.js"),
  es: es,
};

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
async function expectError(shouldError: () => unknown, type: LinearErrorType, message: string) {
  try {
    await shouldError();
  } catch (error) {
    expect(error.type).toEqual(type);
    expect(error.message).toEqual(expect.stringContaining(message));
  }
}

Object.entries(bundles).map(([bundleFormat, bundle]) =>
  describe(bundleFormat, () => {
    const ClientConstructor = bundle?.LinearClient;

    /** Initialize Linear client variable */
    let linearClient: es.LinearClient;

    beforeAll(async () => {
      if (ClientConstructor) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        linearClient = (await startClient(ClientConstructor as any)) as unknown as es.LinearClient;
      } else {
        throw new Error(`Bundle for ${bundleFormat} has no LinearClient`);
      }
    });

    afterAll(() => {
      stopClient();
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
      const client = new ClientConstructor({ apiKey: "fake api key" });

      expectError(
        () => client.viewer,
        LinearErrorType.AuthenticationError,
        "Authentication required, not authenticated - You need to authenticate to access this operation."
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
        const created = await client.createIssue({ teamId: team?.id ?? "", ...createdInput });
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
        const updated = await issue?.update(updatedInput);
        const updatedIssue = await updated?.issue;

        if (process.env.E2E) {
          expect(updated?.success).toBe(true);
          expect(updatedIssue).toEqual(expect.objectContaining(updatedInput));
        }

        /** Archive issue */
        const archivedIssue = await updatedIssue?.archive();
        if (process.env.E2E) {
          expect(archivedIssue?.success).toBe(true);
        }

        /** Confirm issue is archived */
        const noIssue = await client.issue(createdId);
        if (process.env.E2E) {
          expect(noIssue?.id).toBe(createdId);
          expect(noIssue?.archivedAt instanceof Date).toBeTruthy();
        }
      });
    });
  })
);
