import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { completedAtForState, importIssues } from "../importIssues.ts";
import { JiraCsvImporter } from "../importers/jiraCsv/JiraCsvImporter.ts";

interface CreateIssueInput {
  title: string;
  stateId?: string;
  createdAt?: Date;
  completedAt?: Date;
}

/** In-memory stand-in for the parts of the API importIssues uses. */
const api = vi.hoisted(() => {
  const state = {
    workflowStates: [] as { id: string; name: string; type: string }[],
    createdIssues: [] as CreateIssueInput[],
    nextId: 1,
  };

  const team = {
    id: "team-1",
    key: "ENG",
    displayName: "Engineering",
    labels: () => [],
    paginate: async (fetch: () => unknown) => fetch(),
    states: async () => ({ nodes: state.workflowStates }),
  };

  const client = {
    viewer: Promise.resolve({ id: "viewer-1" }),
    organization: Promise.resolve({ labels: () => [] }),
    teams: () => [team],
    users: () => [],
    paginate: async (fetch: () => unknown) => fetch(),
    team: async () => team,
    createIssueLabel: async () => ({ success: true, issueLabel: Promise.resolve({ id: `label-${state.nextId++}` }) }),
    createWorkflowState: async (input: { name: string; type: string }) => {
      const created = { id: `state-${state.nextId++}`, name: input.name, type: input.type };
      state.workflowStates.push(created);
      return { success: true, workflowState: Promise.resolve(created) };
    },
    // Rejects a completion date under the same conditions as the API's issue creation
    createIssue: async (input: CreateIssueInput) => {
      if (input.completedAt) {
        const stateType = state.workflowStates.find(workflowState => workflowState.id === input.stateId)?.type;
        if (stateType !== "completed") {
          throw new Error("completedAt can only be set for issues in a completed state");
        }
        if (!input.createdAt) {
          throw new Error("completedAt can only be set together with createdAt");
        }
        if (input.completedAt < input.createdAt) {
          throw new Error("completedAt can't be before createdAt");
        }
      }
      state.createdIssues.push(input);
      return { success: true, issue: Promise.resolve({ archive: async () => undefined }) };
    },
  };

  return { state, client };
});

vi.mock("@linear/sdk", () => ({
  LinearClient: function LinearClient() {
    return api.client;
  },
}));
vi.mock("ora", () => ({ default: () => ({ start: () => ({ stop: () => undefined }) }) }));
vi.mock("cli-progress", () => ({
  Presets: { shades_classic: {} },
  SingleBar: function SingleBar() {
    return { start: () => undefined, update: () => undefined, stop: () => undefined };
  },
}));

const csvField = (value: string) => `"${value.replaceAll('"', '""')}"`;

const jiraRow = (overrides: Record<string, string>): Record<string, string> => ({
  Summary: "Issue",
  "Issue key": "JRA-1",
  "Issue Type": "Task",
  Status: "Closed",
  "Status Category": "Done",
  Priority: "Medium",
  "Project key": "JRA",
  Assignee: "",
  Description: "",
  Created: "05/Mar/24 3:12 PM",
  Updated: "07/Mar/24 9:00 AM",
  Resolved: "06/Mar/24 4:30 PM",
  "Status Category Changed": "",
  Release: "",
  ...overrides,
});

const importJiraRows = async (rows: Record<string, string>[]) => {
  const columns = Object.keys(rows[0]);
  const filePath = join(directory, "jira.csv");
  writeFileSync(
    filePath,
    [columns.join(","), ...rows.map(row => columns.map(column => csvField(row[column] ?? "")).join(","))].join("\n") +
      "\n"
  );

  await importIssues("api-key", new JiraCsvImporter(filePath, "example", ""), undefined, "ENG", {
    selfAssign: false,
  });
  return api.state.createdIssues;
};

let directory: string;

describe("importIssues", () => {
  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), "import-issues-"));
    api.state.workflowStates = [
      { id: "backlog", name: "Backlog", type: "backlog" },
      { id: "done", name: "Done", type: "completed" },
      { id: "canceled", name: "Canceled", type: "canceled" },
    ];
    api.state.createdIssues = [];
    vi.spyOn(console, "info").mockImplementation(() => undefined);
  });

  afterEach(() => {
    rmSync(directory, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("doesn't send a completion date for Done-category issues in a status that isn't completed", async () => {
    const issues = await importJiraRows([jiraRow({ Status: "Canceled" })]);

    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({ stateId: "canceled", createdAt: new Date(2024, 2, 5, 15, 12) });
    expect(issues[0].completedAt).toBeUndefined();
  });

  it("sends the completion date for issues in a completed status", async () => {
    const issues = await importJiraRows([jiraRow({ Status: "Done" }), jiraRow({ "Issue key": "JRA-2" })]);

    const closedStateId = api.state.workflowStates.find(state => state.name === "Closed")?.id;
    expect(api.state.workflowStates.find(state => state.name === "Closed")?.type).toBe("completed");
    expect(issues).toMatchObject([
      { stateId: "done", completedAt: new Date(2024, 2, 6, 16, 30) },
      { stateId: closedStateId, completedAt: new Date(2024, 2, 6, 16, 30) },
    ]);
  });

  it("moves a completion date before the creation date to the creation date", async () => {
    const issues = await importJiraRows([jiraRow({ Created: "05/Mar/24 3:12 PM", Resolved: "05/Mar/24" })]);

    expect(issues[0]).toMatchObject({
      createdAt: new Date(2024, 2, 5, 15, 12),
      completedAt: new Date(2024, 2, 5, 15, 12),
    });
  });

  it("doesn't send a completion date without a creation date", async () => {
    const issues = await importJiraRows([jiraRow({ Created: "" }), jiraRow({ "Issue key": "JRA-2", Created: "soon" })]);

    expect(issues).toHaveLength(2);
    for (const issue of issues) {
      expect(issue.createdAt).toBeUndefined();
      expect(issue.completedAt).toBeUndefined();
    }
    expect(api.state.workflowStates.find(state => state.name === "Closed")?.type).toBe("completed");
  });
});

describe("completedAtForState", () => {
  const createdAt = new Date(2024, 2, 5, 15, 12);
  const completedAt = new Date(2024, 2, 6, 16, 30);

  it("only returns a completion date for completed statuses with a creation date", () => {
    expect(completedAtForState({ createdAt, completedAt }, "completed")).toEqual(completedAt);
    for (const stateType of ["canceled", "started", "backlog", "unstarted", undefined]) {
      expect(completedAtForState({ createdAt, completedAt }, stateType)).toBeUndefined();
    }
    expect(completedAtForState({ completedAt }, "completed")).toBeUndefined();
    expect(completedAtForState({ createdAt }, "completed")).toBeUndefined();
  });

  it("never returns a completion date before the creation date", () => {
    expect(completedAtForState({ createdAt: completedAt, completedAt: createdAt }, "completed")).toEqual(completedAt);
  });
});
