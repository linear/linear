import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { importIssues } from "../importIssues.ts";
import type { Importer } from "../types.ts";

vi.mock("ora", () => ({
  default: () => ({ start: () => ({ stop: () => undefined }), stop: () => undefined }),
}));

const connection = (nodes: unknown[], endCursor: string | null = null) => ({
  nodes,
  pageInfo: { hasNextPage: endCursor !== null, endCursor },
});

const project = (id: string, name: string) => ({ id, name });

const firstPageProjects = Array.from({ length: 50 }, (_, index) => project(`project-${index}`, `Project ${index}`));
const lastPageProjects = [project("late-project", "Late project")];

const importer: Importer = {
  name: "Test",
  import: async () => ({
    issues: [{ title: "Imported issue" }],
    labels: {},
    users: {},
  }),
};

describe("importIssues", () => {
  let createIssueVariables: Record<string, unknown> | undefined;
  let projectRequests: Record<string, unknown>[];

  beforeEach(() => {
    createIssueVariables = undefined;
    projectRequests = [];

    vi.spyOn(console, "info").mockImplementation(() => undefined);
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
      throw new Error(`process.exit(${code})`);
    }) as never);

    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: { body: string }) => {
        const { query, variables } = JSON.parse(init.body) as { query: string; variables: Record<string, unknown> };
        const operation = /(?:query|mutation)\s+(\w+)/.exec(query)?.[1];
        const data = ((): unknown => {
          switch (operation) {
            case "viewer":
              return { viewer: { id: "viewer-id" } };
            case "teams":
              return { teams: connection([{ id: "team-id", key: "TST", name: "Test", displayName: "Test" }]) };
            case "users":
              return { users: connection([]) };
            case "team":
              return { team: { id: "team-id", key: "TST", name: "Test" } };
            case "organization":
              return { organization: { id: "organization-id", projectStatuses: [] } };
            case "team_projects":
              projectRequests.push(variables);
              return {
                team: {
                  projects: variables.after
                    ? connection(lastPageProjects)
                    : connection(firstPageProjects, "cursor-after-first-page"),
                },
              };
            case "team_labels":
            case "organization_labels":
              return { [operation === "team_labels" ? "team" : "organization"]: { labels: connection([]) } };
            case "team_states":
              return { team: { states: connection([]) } };
            case "createIssue":
              createIssueVariables = variables;
              return { issueCreate: { success: true, issue: { id: "issue-id" } } };
            default:
              throw new Error(`Unexpected operation ${operation}`);
          }
        })();
        return new Response(JSON.stringify({ data }), { headers: { "Content-Type": "application/json" } });
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("finds a --project that is not on the first page of team projects", async () => {
    await importIssues("api-key", importer, undefined, "TST", { project: "Late project" });

    expect(projectRequests).toHaveLength(2);
    expect(createIssueVariables).toMatchObject({ input: { teamId: "team-id", projectId: "late-project" } });
  });
});
