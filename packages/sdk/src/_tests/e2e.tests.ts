/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import { createLinearSdk, LinearStatus } from "../index";
import { LinearResponse } from "../_generated/sdk-api";

dotenv.config();

it("allow no E2E_API_KEY env var", () => undefined);

/**
 * Return an sdk using the E2E_API_KEY environment variable
 */
function getSdk() {
  return createLinearSdk({ apiKey: process.env.E2E_API_KEY });
}

/**
 * Return an sdk scoped to the first team found
 */
async function getTeamSdk() {
  const sdk = getSdk();
  const teams = await sdk.teams();
  expect(teams.status).toEqual(LinearStatus.success);

  const first = teams.data?.nodes[0];
  expect(first).toBeDefined();

  const team = await sdk.team(first?.id ?? "");

  return team;
}

/**
 * Return an sdk scoped to the first issue found
 */
async function getIssueSdk() {
  const sdk = getSdk();
  const issues = await sdk.issues();
  expect(issues.status).toEqual(LinearStatus.success);

  const first = issues.data?.nodes[0];
  expect(first).toBeDefined();

  const issue = await sdk.issue(first?.id ?? "");

  return issue;
}

/**
 * Assert success of the sdk operation
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
 * Assert failure of the sdk operation
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
      const sdk = createLinearSdk({ apiKey: "fake api key" });
      const viewer = await sdk.viewer();

      expectError(viewer, {
        errorMessage: "authentication failed",
        queryName: "viewer",
      });
    });

    it("query for the viewer", async () => {
      const sdk = getSdk();
      const viewer = await sdk.viewer();
      expectSuccess(viewer, { id: expect.stringContaining("") });
    });

    it("query for a team", async () => {
      const team = await getTeamSdk();
      expectSuccess(team, { id: expect.stringContaining("") });
    });

    it("query for fake team", async () => {
      const sdk = getSdk();
      const team = await sdk.team("not a real team id");
      expectError(team, {
        errorMessage: "Entity not found",
        queryName: "team",
        variables: { id: "not a real team id" },
      });
    });

    it("query for an issue", async () => {
      const issue = await getIssueSdk();
      expectSuccess(issue, { id: expect.stringContaining("") });
    });

    it("query for fake issue", async () => {
      const sdk = getSdk();
      const issue = await sdk.issue("not a real issue id");

      expectError(issue, {
        errorMessage: "Entity not found",
        queryName: "issue",
        variables: { id: "not a real issue id" },
      });
    });

    it("query for an issue assignee", async () => {
      const issue = await getIssueSdk();
      const assignee = await issue.assignee();
      expectSuccess(assignee);
    });
  });
}
