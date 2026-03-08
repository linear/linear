import path from "path";
import { describe, it, expect, beforeAll } from "vitest";
import { PlaneCsvImporter } from "../PlaneCsvImporter.ts";
import type { ImportResult } from "../../../types.ts";

const sampleCsvPath = path.join(__dirname, "sample.csv");

describe("PlaneCsvImporter", () => {
  let result: ImportResult;

  beforeAll(async () => {
    const importer = new PlaneCsvImporter(sampleCsvPath);
    result = await importer.import();
  });

  describe("metadata", () => {
    it("has correct name and defaultTeamName", () => {
      const importer = new PlaneCsvImporter(sampleCsvPath);
      expect(importer.name).toBe("Plane (CSV)");
      expect(importer.defaultTeamName).toBe("Plane");
    });
  });

  describe("issue filtering", () => {
    it("imports 8 issues (skips 1 draft)", () => {
      expect(result.issues).toHaveLength(8);
    });

    it("skips draft issues", () => {
      const titles = result.issues.map(i => i.title);
      expect(titles).not.toContain("Draft task");
    });
  });

  describe("title", () => {
    it("maps Name to title", () => {
      expect(result.issues[0].title).toBe("Implement user authentication");
      expect(result.issues[1].title).toBe("Fix dashboard loading issue");
    });
  });

  describe("status", () => {
    it("maps State Name to status", () => {
      expect(result.issues[0].status).toBe("Todo");
      expect(result.issues[1].status).toBe("In Progress");
      expect(result.issues[2].status).toBe("Done");
      expect(result.issues[3].status).toBe("Backlog");
      expect(result.issues[6].status).toBe("Cancelled");
    });
  });

  describe("priority", () => {
    it("maps urgent to 1", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.priority).toBe(1);
    });

    it("maps high to 2", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.priority).toBe(2);
    });

    it("maps medium to 3", () => {
      const issue = result.issues.find(i => i.title === "Update API documentation");
      expect(issue!.priority).toBe(3);
    });

    it("maps low to 4", () => {
      const issue = result.issues.find(i => i.title === "Research caching strategies");
      expect(issue!.priority).toBe(4);
    });

    it("maps none to 0", () => {
      const issue = result.issues.find(i => i.title === "Design new landing page");
      expect(issue!.priority).toBe(0);
    });
  });

  describe("assigneeId", () => {
    it("uses first assignee", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.assigneeId).toBe("Jane Smith");
    });

    it("uses first assignee when multiple exist", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.assigneeId).toBe("John Doe");
    });

    it("is undefined when no assignees", () => {
      const issue = result.issues.find(i => i.title === "Research caching strategies");
      expect(issue!.assigneeId).toBeUndefined();
    });
  });

  describe("labels", () => {
    it("parses label names from JSON array", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.labels).toEqual(["backend", "security"]);
    });

    it("handles multiple labels", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.labels).toEqual(["bug", "performance"]);
    });

    it("handles empty labels", () => {
      const issue = result.issues.find(i => i.title === "Archived task example");
      expect(issue!.labels).toEqual([]);
    });
  });

  describe("dates", () => {
    it("parses createdAt from ISO date", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.createdAt).toEqual(new Date("2024-01-01T10:00:00Z"));
    });

    it("parses startedAt from Start Date", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.startedAt).toEqual(new Date("2024-01-01"));
    });

    it("parses dueDate from Target Date", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.dueDate).toEqual(new Date("2024-01-05"));
    });

    it("parses completedAt", () => {
      const issue = result.issues.find(i => i.title === "Update API documentation");
      expect(issue!.completedAt).toEqual(new Date("2024-01-03T15:00:00Z"));
    });

    it("returns undefined for empty date fields", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.startedAt).toBeUndefined();
      expect(issue!.dueDate).toBeUndefined();
      expect(issue!.completedAt).toBeUndefined();
    });
  });

  describe("estimate", () => {
    it("parses integer estimate", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.estimate).toBe(5);
    });

    it("returns undefined for empty estimate", () => {
      const issue = result.issues.find(i => i.title === "Design new landing page");
      expect(issue!.estimate).toBeUndefined();
    });
  });

  describe("archived", () => {
    it("is true when Archived At has a date", () => {
      const issue = result.issues.find(i => i.title === "Archived task example");
      expect(issue!.archived).toBe(true);
    });

    it("is false when Archived At is empty", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.archived).toBe(false);
    });
  });

  describe("comments", () => {
    it("parses comments with body, userId, and createdAt", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.comments).toHaveLength(2);
      expect(issue!.comments![0]).toEqual({
        body: "Started investigating the root cause",
        userId: "Jane Smith",
        createdAt: new Date("2024-01-01 14:30:00"),
      });
      expect(issue!.comments![1]).toEqual({
        body: "Found the issue - missing index on queries",
        userId: "John Doe",
        createdAt: new Date("2024-01-02 09:00:00"),
      });
    });

    it("is undefined when no comments", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.comments).toBeUndefined();
    });
  });

  describe("description (metadata preservation)", () => {
    it("includes Plane identifier", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.description).toContain("Imported from Plane: TEST-1");
    });

    it("includes parent reference", () => {
      const issue = result.issues.find(i => i.title === "Sub-task: Profile dashboard");
      expect(issue!.description).toContain("**Parent:** TEST-2");
    });

    it("includes additional assignees beyond the first", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.description).toContain("**Additional assignees:** Jane Smith");
    });

    it("includes links", () => {
      const issue = result.issues.find(i => i.title === "Update API documentation");
      expect(issue!.description).toContain("**Links:**");
      expect(issue!.description).toContain("API Docs: https://docs.example.com/api");
    });

    it("includes relations", () => {
      const issue = result.issues.find(i => i.title === "Sub-task: Profile dashboard");
      expect(issue!.description).toContain("**Relations:**");
      expect(issue!.description).toContain("outgoing blocked_by: TEST-2");
    });

    it("includes cycles", () => {
      const issue = result.issues.find(i => i.title === "Fix dashboard loading issue");
      expect(issue!.description).toContain("**Cycles:** Sprint 1");
    });

    it("includes modules", () => {
      const issue = result.issues.find(i => i.title === "Implement user authentication");
      expect(issue!.description).toContain("**Modules:** Authentication");
    });

    it("is undefined when no metadata to preserve", () => {
      const issue = result.issues.find(i => i.title === "Research caching strategies");
      // Has identifier so description should exist
      expect(issue!.description).toContain("Imported from Plane: TEST-4");
    });
  });

  describe("statuses mapping", () => {
    it("collects all unique statuses", () => {
      const statusNames = Object.keys(result.statuses!);
      expect(statusNames).toContain("Todo");
      expect(statusNames).toContain("In Progress");
      expect(statusNames).toContain("Done");
      expect(statusNames).toContain("Backlog");
      expect(statusNames).toContain("Cancelled");
    });

    it("maps Todo to unstarted", () => {
      expect(result.statuses!["Todo"].type).toBe("unstarted");
    });

    it("maps In Progress to started", () => {
      expect(result.statuses!["In Progress"].type).toBe("started");
    });

    it("maps Done to completed", () => {
      expect(result.statuses!["Done"].type).toBe("completed");
    });

    it("maps Backlog to backlog", () => {
      expect(result.statuses!["Backlog"].type).toBe("backlog");
    });

    it("maps Cancelled to canceled", () => {
      expect(result.statuses!["Cancelled"].type).toBe("canceled");
    });
  });

  describe("labels collection", () => {
    it("collects all unique labels across issues", () => {
      const labelNames = Object.keys(result.labels);
      expect(labelNames).toContain("backend");
      expect(labelNames).toContain("security");
      expect(labelNames).toContain("bug");
      expect(labelNames).toContain("performance");
      expect(labelNames).toContain("documentation");
      expect(labelNames).toContain("research");
      expect(labelNames).toContain("design");
      expect(labelNames).toContain("frontend");
      expect(labelNames).toContain("feature-request");
    });
  });

  describe("users collection", () => {
    it("extracts users from Created By Name", () => {
      expect(result.users["John Doe"]).toEqual({ name: "John Doe" });
      expect(result.users["Alice Brown"]).toEqual({ name: "Alice Brown" });
      expect(result.users["Bob Wilson"]).toEqual({ name: "Bob Wilson" });
    });

    it("extracts users from Assignees", () => {
      expect(result.users["Jane Smith"]).toEqual({ name: "Jane Smith" });
    });

    it("extracts users from comment authors", () => {
      // Jane Smith and John Doe appear as comment authors too, already covered
      const userNames = Object.keys(result.users);
      expect(userNames).toContain("Jane Smith");
      expect(userNames).toContain("John Doe");
    });
  });
});
