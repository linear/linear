import { expect } from "vitest";
import type { ImportResult, Issue } from "../../types.ts";

export const findIssue = (result: ImportResult, title: string): Issue => {
  const issue = result.issues.find(i => i.title === title);
  if (!issue) {
    const available = result.issues.map(i => i.title).join(", ");
    throw new Error(`Issue "${title}" not found. Available: ${available}`);
  }
  return issue;
};

export const expectUser = (result: ImportResult, name: string) => {
  expect(result.users[name]).toBeDefined();
  expect(result.users[name].name).toBe(name);
};

export const expectLabel = (result: ImportResult, name: string) => {
  expect(result.labels[name]).toBeDefined();
  expect(result.labels[name].name).toBe(name);
};

export const expectStatusMapping = (
  result: ImportResult,
  name: string,
  type: string,
) => {
  expect(result.statuses![name]).toBeDefined();
  expect(result.statuses![name].name).toBe(name);
  expect(result.statuses![name].type).toBe(type);
};

export const issueTitles = (result: ImportResult): string[] =>
  result.issues.map(i => i.title);

export const countIssues = (
  result: ImportResult,
  predicate: (issue: Issue) => boolean,
): number => result.issues.filter(predicate).length;
