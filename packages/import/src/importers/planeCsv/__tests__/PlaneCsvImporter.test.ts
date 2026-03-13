import path from "path";
import { describe, it, expect, beforeAll } from "vitest";
import { PlaneCsvImporter } from "../PlaneCsvImporter.ts";
import type { ImportResult } from "../../../types.ts";
import {
  findIssue,
  expectUser,
  expectLabel,
  expectStatusMapping,
  issueTitles,
} from "../../__tests__/importerTestUtils.ts";

const sampleCsvPath = path.join(__dirname, "sample.csv");

describe("PlaneCsvImporter", () => {
  it("given a new importer, then name and defaultTeamName are set", () => {
    // Given
    const importer = new PlaneCsvImporter(sampleCsvPath);

    // Then
    expect(importer.name).toBe("Plane (CSV)");
    expect(importer.defaultTeamName).toBe("Plane");
  });

  describe("given a valid Plane CSV export", () => {
    let result: ImportResult;

    beforeAll(async () => {
      // When the CSV is imported
      const importer = new PlaneCsvImporter(sampleCsvPath);
      result = await importer.import();
    });

    // -- Filtering --

    describe("when the CSV contains a draft issue", () => {
      it("then draft issues are excluded from the result", () => {
        expect(issueTitles(result)).not.toContain("Draft task");
      });

      it("then only non-draft issues are imported", () => {
        expect(result.issues).toHaveLength(8);
      });
    });

    // -- Basic field mapping --

    describe("given an issue with basic fields (TEST-1)", () => {
      it("then title is mapped from Name", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.title).toBe("Implement user authentication");
      });

      it("then status is mapped from State Name", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.status).toBe("Todo");
      });

      it("then priority 'high' maps to 2", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.priority).toBe(2);
      });

      it("then createdAt is parsed from ISO datetime", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.createdAt).toEqual(new Date("2024-01-01T10:00:00Z"));
      });

      it("then description includes Plane identifier", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.description).toContain("Imported from Plane: TEST-1");
      });
    });

    // -- Assignees --

    describe("given an issue with multiple assignees (TEST-2)", () => {
      it("then only the first assignee is used as assigneeId", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.assigneeId).toBe("John Doe");
      });

      it("then additional assignees are preserved in description", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.description).toContain("**Additional assignees:** Jane Smith");
      });
    });

    describe("given an issue with a single assignee (TEST-1)", () => {
      it("then that assignee is used as assigneeId", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.assigneeId).toBe("Jane Smith");
      });
    });

    describe("given an issue with no assignees (TEST-4)", () => {
      it("then assigneeId is undefined", () => {
        const issue = findIssue(result, "Research caching strategies");
        expect(issue.assigneeId).toBeUndefined();
      });
    });

    // -- Comments --

    describe("given an issue with comments (TEST-2)", () => {
      it("then comments are parsed with body, userId, and createdAt", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.comments).toHaveLength(2);
        expect(issue.comments![0]).toEqual({
          body: "Started investigating the root cause",
          userId: "Jane Smith",
          createdAt: new Date("2024-01-01 14:30:00"),
        });
        expect(issue.comments![1]).toEqual({
          body: "Found the issue - missing index on queries",
          userId: "John Doe",
          createdAt: new Date("2024-01-02 09:00:00"),
        });
      });
    });

    describe("given an issue without comments (TEST-1)", () => {
      it("then comments is undefined", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.comments).toBeUndefined();
      });
    });

    // -- Description metadata --

    describe("given a sub-task with a parent (TEST-7)", () => {
      it("then parent identifier is in description", () => {
        const issue = findIssue(result, "Sub-task: Profile dashboard");
        expect(issue.description).toContain("**Parent:** TEST-2");
      });
    });

    describe("given an issue with links (TEST-3)", () => {
      it("then links are included in description", () => {
        const issue = findIssue(result, "Update API documentation");
        expect(issue.description).toContain("**Links:**");
        expect(issue.description).toContain("API Docs: https://docs.example.com/api");
      });
    });

    describe("given an issue with relations (TEST-7)", () => {
      it("then relations are included in description", () => {
        const issue = findIssue(result, "Sub-task: Profile dashboard");
        expect(issue.description).toContain("**Relations:**");
        expect(issue.description).toContain("outgoing blocked_by: TEST-2");
      });
    });

    describe("given an issue with cycles (TEST-2)", () => {
      it("then cycles are included in description", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.description).toContain("**Cycles:** Sprint 1");
      });
    });

    describe("given an issue with modules (TEST-1)", () => {
      it("then modules are included in description", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.description).toContain("**Modules:** Authentication");
      });
    });

    // -- Archived --

    describe("given an archived issue (TEST-5)", () => {
      it("then archived is true", () => {
        const issue = findIssue(result, "Archived task example");
        expect(issue.archived).toBe(true);
      });
    });

    describe("given a non-archived issue (TEST-1)", () => {
      it("then archived is false", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.archived).toBe(false);
      });
    });

    // -- Priority mapping --

    describe("given all priority values across issues", () => {
      it("then urgent maps to 1", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.priority).toBe(1);
      });

      it("then high maps to 2", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.priority).toBe(2);
      });

      it("then medium maps to 3", () => {
        const issue = findIssue(result, "Update API documentation");
        expect(issue.priority).toBe(3);
      });

      it("then low maps to 4", () => {
        const issue = findIssue(result, "Research caching strategies");
        expect(issue.priority).toBe(4);
      });

      it("then none maps to 0", () => {
        const issue = findIssue(result, "Design new landing page");
        expect(issue.priority).toBe(0);
      });
    });

    // -- Status mapping --

    describe("given all status values across issues", () => {
      it("then all unique statuses are collected", () => {
        const statusNames = Object.keys(result.statuses!);
        expect(statusNames).toContain("Todo");
        expect(statusNames).toContain("In Progress");
        expect(statusNames).toContain("Done");
        expect(statusNames).toContain("Backlog");
        expect(statusNames).toContain("Cancelled");
      });

      it("then Todo maps to unstarted", () => {
        expectStatusMapping(result, "Todo", "unstarted");
      });

      it("then In Progress maps to started", () => {
        expectStatusMapping(result, "In Progress", "started");
      });

      it("then Done maps to completed", () => {
        expectStatusMapping(result, "Done", "completed");
      });

      it("then Backlog maps to backlog", () => {
        expectStatusMapping(result, "Backlog", "backlog");
      });

      it("then Cancelled maps to canceled", () => {
        expectStatusMapping(result, "Cancelled", "canceled");
      });
    });

    // -- Labels --

    describe("given labels across multiple issues", () => {
      it("then all unique labels are in the labels map", () => {
        expectLabel(result, "backend");
        expectLabel(result, "security");
        expectLabel(result, "bug");
        expectLabel(result, "performance");
        expectLabel(result, "documentation");
        expectLabel(result, "research");
        expectLabel(result, "design");
        expectLabel(result, "frontend");
        expectLabel(result, "feature-request");
      });

      it("then issue labels are parsed from JSON arrays", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.labels).toEqual(["backend", "security"]);
      });

      it("then empty label arrays produce empty arrays", () => {
        const issue = findIssue(result, "Archived task example");
        expect(issue.labels).toEqual([]);
      });
    });

    // -- Users --

    describe("given users from multiple sources", () => {
      it("then creators are extracted from Created By Name", () => {
        expectUser(result, "John Doe");
        expectUser(result, "Alice Brown");
        expectUser(result, "Bob Wilson");
      });

      it("then assignees are extracted from Assignees JSON array", () => {
        expectUser(result, "Jane Smith");
      });

      it("then comment authors are extracted", () => {
        // Jane Smith and John Doe also appear as comment authors
        const userNames = Object.keys(result.users);
        expect(userNames).toContain("Jane Smith");
        expect(userNames).toContain("John Doe");
      });
    });

    // -- Estimates --

    describe("given an issue with a numeric estimate (TEST-1)", () => {
      it("then estimate is parsed as integer", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.estimate).toBe(5);
      });
    });

    describe("given an issue with no estimate (ANT-1)", () => {
      it("then estimate is undefined", () => {
        const issue = findIssue(result, "Design new landing page");
        expect(issue.estimate).toBeUndefined();
      });
    });

    // -- Dates --

    describe("given date fields in various formats", () => {
      it("then ISO datetimes are parsed for createdAt", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.createdAt).toEqual(new Date("2024-01-01T10:00:00Z"));
      });

      it("then date-only strings are parsed for startedAt", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.startedAt).toEqual(new Date("2024-01-01"));
      });

      it("then date-only strings are parsed for dueDate", () => {
        const issue = findIssue(result, "Fix dashboard loading issue");
        expect(issue.dueDate).toEqual(new Date("2024-01-05"));
      });

      it("then completedAt is parsed", () => {
        const issue = findIssue(result, "Update API documentation");
        expect(issue.completedAt).toEqual(new Date("2024-01-03T15:00:00Z"));
      });

      it("then empty date fields return undefined", () => {
        const issue = findIssue(result, "Implement user authentication");
        expect(issue.startedAt).toBeUndefined();
        expect(issue.dueDate).toBeUndefined();
        expect(issue.completedAt).toBeUndefined();
      });
    });
  });
});
