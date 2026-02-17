import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type * as es from "../index.js";
import { LinearErrorType } from "../types.js";
import { startClient, stopClient } from "./test-client.js";

const bundles = {
  // umd: require("../../dist/index-umd.min.js"),
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  cjs: require("../../dist/index.cjs") as typeof es,
  // Jest is not capable of testing the ES module bundle from a CJS environment. We need to add e2e tests that
  // execute `node` directory to test this functionality. As-is this would just re-test the CJS module.
  // es: require("../../") as typeof es,
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
    expect.unreachable("Expected an error");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    expect(error.type).toEqual(type);
    expect(error.message).toContain(message);
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

      await expectError(
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

      it.skipIf(!process.env.E2E)("query for fake team", async () => {
        await expectError(
          () => linearClient.team("not a real team id"),
          LinearErrorType.InvalidInput,
          "Entity not found - Could not find referenced Team"
        );
      });

      it("query for an issue", async () => {
        await getSomeIssue();
      });

      it.skipIf(!process.env.E2E)("query for fake issue", async () => {
        await expectError(
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
