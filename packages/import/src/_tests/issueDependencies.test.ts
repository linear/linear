import { describe, expect, it } from "vitest";
import { resolveDependencies } from "../importIssues.ts";
import type { Issue } from "../types.ts";

const issue = (overrides: Partial<Issue> & Pick<Issue, "title">): Issue => ({
  externalId: undefined,
  blocks: undefined,
  blockedBy: undefined,
  ...overrides,
});

// Resolved dependencies hold the exact issue objects from the input array, so compare by title pair
// rather than by object identity (which callers cannot observe).
const pairs = (deps: { blocker: Issue; blocked: Issue }[]): [string, string][] =>
  deps.map(dep => [dep.blocker.title, dep.blocked.title]);

describe("resolveDependencies", () => {
  it("resolves a reference by source-row external id", () => {
    const issues = [issue({ title: "Auth", blocks: ["CSV-7"] }), issue({ title: "Login page", externalId: "CSV-7" })];

    expect(pairs(resolveDependencies(issues))).toEqual([["Auth", "Login page"]]);
  });

  it("resolves a reference by case-insensitive trimmed title", () => {
    const issues = [issue({ title: "Auth", blocks: ["  login PAGE "] }), issue({ title: "Login page" })];

    expect(pairs(resolveDependencies(issues))).toEqual([["Auth", "Login page"]]);
  });

  it("swaps ids for a Blocked By reference so the blocker is first", () => {
    const issues = [issue({ title: "Auth", blockedBy: ["Login page"] }), issue({ title: "Login page" })];

    expect(pairs(resolveDependencies(issues))).toEqual([["Login page", "Auth"]]);
  });

  it("deduplicates one dependency expressed in both columns", () => {
    const issues = [
      issue({ title: "Auth", blocks: ["Login page"], blockedBy: ["Login page"] }),
      issue({ title: "Login page" }),
    ];

    expect(pairs(resolveDependencies(issues))).toEqual([["Auth", "Login page"]]);
  });

  it("deduplicates the same dependency referenced from two rows", () => {
    const issues = [
      issue({ title: "Auth", blocks: ["Login page"] }),
      issue({ title: "Login page", blockedBy: ["Auth"] }),
    ];

    expect(pairs(resolveDependencies(issues))).toEqual([["Auth", "Login page"]]);
  });

  it("resolves a chain of dependencies order-independently", () => {
    const issues = [
      issue({ title: "Auth", blockedBy: ["Login page"] }),
      issue({ title: "Login page" }),
      issue({ title: "Onboarding", blocks: ["Login page"] }),
    ];

    expect(pairs(resolveDependencies(issues))).toEqual([
      ["Login page", "Auth"],
      ["Onboarding", "Login page"],
    ]);
  });

  it("throws when a reference matches no issue", () => {
    const issues = [issue({ title: "Auth", blocks: ["Nonexistent"] })];

    expect(() => resolveDependencies(issues)).toThrow("matched 0 issues");
  });

  it("throws when a title reference is ambiguous", () => {
    const issues = [issue({ title: "Auth", blocks: ["Setup"] }), issue({ title: "Setup" }), issue({ title: "Setup" })];

    expect(() => resolveDependencies(issues)).toThrow(/matched 2 issues/);
  });

  it("returns an empty list when no issue declares dependencies", () => {
    const issues = [issue({ title: "Auth" }), issue({ title: "Login page" })];

    expect(resolveDependencies(issues)).toEqual([]);
  });
});
