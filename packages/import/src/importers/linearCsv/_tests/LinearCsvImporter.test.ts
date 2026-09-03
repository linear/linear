import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { LinearCsvImporter } from "../LinearCsvImporter.ts";

const tempDirs: string[] = [];

// Header must include every column the importer reads, matching a real Linear CSV export.
const HEADER =
  "Id,Team,Title,Description,Status,Estimate,Priority,Project,Creator,Assignee,Labels,Cycle Number,Cycle Name,Cycle Start,Cycle End,Created,Updated,Started,Completed,Canceled,Archived,Blocks,Blocked By";

const importCsv = async (header: string, ...rows: string[]) => {
  const dir = mkdtempSync(join(tmpdir(), "linear-csv-test-"));
  tempDirs.push(dir);
  const filePath = join(dir, "issues.csv");
  writeFileSync(filePath, [header, ...rows].join("\n"));
  return new LinearCsvImporter(filePath).import();
};

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

describe("LinearCsvImporter", () => {
  it("parses Blocks and Blocked By columns into dependency references", async () => {
    const result = await importCsv(
      HEADER,
      'CSV-1,ENG,Auth,"","","","",Project,,,,"","","","","","","","","","","CSV-2, CSV-3",""',
      'CSV-2,ENG,Login page,"","","","",Project,,,,"","","","","","","","","","","","CSV-4"',
      'CSV-3,ENG,Onboarding,"","","","",Project,,,,"","","","","","","","","","","Login page","CSV-1"',
      'CSV-4,ENG,Signup,"","","","",Project,,,,"","","","","","","","","","","",""'
    );

    const [auth, login, onboarding] = result.issues;
    expect(auth.externalId).toBe("CSV-1");
    expect(auth.blocks).toEqual(["CSV-2", "CSV-3"]);
    expect(auth.blockedBy).toBeUndefined();
    expect(login.blocks).toBeUndefined();
    expect(login.blockedBy).toEqual(["CSV-4"]);
    expect(onboarding.blocks).toEqual(["Login page"]);
    expect(onboarding.blockedBy).toEqual(["CSV-1"]);
  });

  it("maps the row Id onto externalId even without dependency values", async () => {
    const result = await importCsv(
      HEADER,
      'CSV-9,ENG,Only issue,"","","","",Project,,,,"","","","","","","","","","","",""'
    );

    expect(result.issues[0].externalId).toBe("CSV-9");
    expect(result.issues[0].blocks).toBeUndefined();
  });

  it("handles a CSV exported before the dependency columns existed", async () => {
    const result = await importCsv(
      "Id,Team,Title,Description,Status,Estimate,Priority,Project,Creator,Assignee,Labels,Cycle Number,Cycle Name,Cycle Start,Cycle End,Created,Updated,Started,Completed,Canceled,Archived",
      'CSV-1,ENG,Auth,"","","","",Project,,,,"","","","","","","","","",""'
    );

    const [issue] = result.issues;
    expect(issue.blocks).toBeUndefined();
    expect(issue.blockedBy).toBeUndefined();
    expect(issue.externalId).toBe("CSV-1");
  });
});
