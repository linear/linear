/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import { createLinearSdk, LinearStatus } from "../index";

dotenv.config();

it("allow no E2E_API_KEY env var", () => undefined);

function getSdk() {
  return createLinearSdk({ apiKey: process.env.E2E_API_KEY });
}

async function getTeamSdk() {
  const sdk = getSdk();
  const teams = await sdk.teams();
  expect(teams.status).toBe(LinearStatus.success);

  const first = teams.data?.nodes[0];
  expect(first).toBeDefined();

  const team = await sdk.team(first?.id ?? "");

  return team;
}

async function getIssueSdk() {
  const sdk = getSdk();
  const issues = await sdk.issues();
  expect(issues.status).toBe(LinearStatus.success);

  const first = issues.data?.nodes[0];
  expect(first).toBeDefined();

  const issue = await sdk.issue(first?.id ?? "");

  return issue;
}

if (process.env.E2E_API_KEY) {
  describe("end-to-end", () => {
    it("query for a team", async () => {
      const team = await getTeamSdk();
      expect(team.status).toBe(LinearStatus.success);
      expect(team.data?.id).toBeDefined();
      expect(team.error).toBeUndefined();
    });

    it("query for fake team", async () => {
      const sdk = getSdk();
      const team = await sdk.team("not a real id");

      expect(team.status).toBe(LinearStatus.error);
      expect(team.data).toBeUndefined();
      expect((team.error as any)?.response?.status).toBe(200);
      expect((team.error as any)?.response?.errors[0].message).toBe("Entity not found");
    });

    it("query for an issue", async () => {
      const issue = await getIssueSdk();
      expect(issue.status).toBe(LinearStatus.success);
      expect(issue.data?.id).toBeDefined();
      expect(issue.error).toBeUndefined();
    });
  });
}
