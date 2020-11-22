import dotenv from "dotenv";
import { createLinearSdk } from "../index";
import { LinearStatus } from "../_generated/sdk-api";

dotenv.config();

it("allow no E2E_API_KEY env var", () => undefined);

async function getTeamSdk() {
  const sdk = createLinearSdk({ apiKey: process.env.E2E_API_KEY });
  const teams = await sdk.teams();
  expect(teams.status).toBe(LinearStatus.success);

  const first = teams.data?.nodes[0];
  expect(first).toBeDefined();

  const team = await sdk.team(first?.id ?? "");

  return team;
}

async function getIssueSdk() {
  const sdk = createLinearSdk({ apiKey: process.env.E2E_API_KEY });
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
    });

    it("query for an issue", async () => {
      const issue = await getIssueSdk();
      expect(issue.status).toBe(LinearStatus.success);
      expect(issue.data?.id).toBeDefined();
    });
  });
}
